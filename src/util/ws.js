import Protocol from './protocol'

const Package = Protocol.Package
const Message = Protocol.Message

// 一些常量
const JS_WS_CLIENT_TYPE = 'js-websocket'
const JS_WS_CLIENT_VERSION = '0.0.1'

// 返回消息状态码
const RES_OK = 200 // 成功
// const RES_FAIL = 500 // 失败
const RES_OLD_CLIENT = 501 // 客户端版本不符

// 心跳相关
let heartbeatInterval = 3000 // 间隔
let heartbeatId = null // 心跳定时器

// 主实例
let socket = null

export default class WS {
  constructor(url) {
    const instance = new WebSocket(url)
    const bindEvents = {
      open: this.onOpen,
      message: this.onMessage,
      error: this.onError,
      close: this.onClose
    }

    Object.keys(bindEvents).map((enevtName) => {
      instance.addEventListener(enevtName, (event) => {
        bindEvents[enevtName].call(this, event)
      })
    })

    instance.binaryType = 'arraybuffer'
    socket = instance
  }
  isReady = false
  reqId = 0
  callbacks = {}

  // 消息处理分发
  messageHandlers = {
    [`${Package.TYPE_HANDSHAKE}`]: this.onHandshake,
    [`${Package.TYPE_HEARTBEAT}`]: this.onHeartbeat,
    [`${Package.TYPE_DATA}`]: this.onData,
    [`${Package.TYPE_KICK}`]: this.onKick
  }

  /**
  * WebSocket 建立连接的回调
  * @param {object} event
  */
  onOpen() {
    // 发送握手包
    this.handShake()
  }

  /**
  * WebSocket 收到消息时的回调
  * @param {object} event
  */
  onMessage(event) {
    const messages = Package.decode(event.data)
    // 根据事件类型分发到对应的处理程序
    this.messageHandlers[messages.type].call(this, messages.body)
  }

  /**
  * WebSocket 报错时的回调
  * @param {object} event
  */
  onError(event) {
    console.log('onError', event)
  }

  /**
  * WebSocket 断开时的回调
  * @param {object} event
  */
  onClose(event) {
    console.log('onClose', event)
  }

  /**
  * 发送消息到服务器(自动处理编码信息)
  * @param {object} data
  * @param {string} type
  */
  sendMessage(data = {}, route, cb) {
    // 分析参数
    if (arguments.length === 2 && typeof route === 'function') {
      cb = route
      route = null
    }

    // 封包消息
    let bytes = Protocol.strencode(JSON.stringify(data))
    let pkg_type = Package.TYPE_HANDSHAKE
    let routeId = null

    // 分析路由情况
    if (typeof route === 'string') {
      // 是否压缩路由 (存在 Dict 的就压缩)
      let compressRoute = 0
      if (this.dict && this.dict[route]) {
        routeId = this.dict[route]
        compressRoute = 1
      }

      // 然后生成 Message
      const reqId = this.reqId++ % 255
      const type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY

      // 设置回调
      this.callbacks[reqId] = cb

      // 将消息打包
      bytes = Message.encode(reqId, type, compressRoute, compressRoute ? routeId : route, bytes)
      pkg_type = Package.TYPE_DATA
    }

    // 封装到最终格式
    const packet = Package.encode(pkg_type, bytes)

    // 发出封包 这里应该有发送失败的处理
    socket.send(packet)
  }

  /**
   * 封装发包
   * @param {string} route 路由
   * @param {object} data 参数
   */
  send(route, data) {
    return new Promise((resolve) => {
      this.sendMessage(data, route, (result) => {
        // 全局业务回包处理
        resolve(result)
      })
    })
  }

  /**
  * 发送握手包
  * WebSocket 链接成功后自动发送
  */
  handShake() {
    this.sendMessage({
      'sys': {
        type: JS_WS_CLIENT_TYPE,
        version: JS_WS_CLIENT_VERSION
      }
    })
  }

  /**
  * 处理握手返回包
  * @param {*} data
  */
  onHandshake(data) {
    // 握手回包数据判断
    if (data) {
      // 解码数据
      data = JSON.parse(Protocol.strdecode(data))

      // 报错的话
      if (data.code === RES_OLD_CLIENT) {
        throw new Error('client version not fullfill')
      }

      // 其他错误
      if (data.code !== RES_OK) {
        throw new Error('handshake fail')
      }

      // 保存心跳时间
      if (data.sys && data.sys.heartbeat) {
        // 超时信息
        heartbeatInterval = data.sys.heartbeat * 1000
      }
    }

    // 要发送握手回复
    const packet = Package.encode(Package.TYPE_HANDSHAKE_ACK)
    socket.send(packet)

    // 标记已经准备好，可以开始接口调用
    this.isReady = true
  }

  /**
  * 保持心跳
  */
  onHeartbeat() {
    // already in a heartbeat interval
    if (heartbeatId) {
      return
    }

    heartbeatId = setTimeout(() => {
      heartbeatId = null
      const packet = Package.encode(Package.TYPE_HEARTBEAT)
      socket.send(packet)
    }, heartbeatInterval)
  }

  /**
  * 收到数据回复
  * @param {*} data
  */
  onData(data) {
    // 解码
    const msg = Message.decode(data)
    msg.body = JSON.parse(Protocol.strdecode(msg.body))
    if (this.callbacks[msg.id]) {
      this.callbacks[msg.id](msg.body)
    } else {
      console.log('onData: ', msg)
    }
  }

  /**
  * 被踢
  *
  * @param {*} data
  */
  onKick(data) {
    console.log('onKick', data)
  }
}
