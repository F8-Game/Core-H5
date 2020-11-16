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
const gapThreshold = 100 // heartbeat gap threashold

export default class WS {
  constructor(url = 'ws://119.3.236.163:8081') {
    const socket = new WebSocket(url)
    const bindEvents = {
      open: this.onOpen,
      message: this.onMessage,
      error: this.onError,
      close: this.onClose
    }

    Object.keys(bindEvents).map((enevtName) => {
      socket.addEventListener(enevtName, (event) => {
        bindEvents[enevtName].call(this, event)
      })
    })

    socket.binaryType = 'arraybuffer'
    this.socket = socket
  }

  // 消息处理分发
  messageHandlers = {
    [`${Package.TYPE_HANDSHAKE}`]: () => this.onHandshake(),
    [`${Package.TYPE_HEARTBEAT}`]: () => this.onHeartbeat(),
    [`${Package.TYPE_DATA}`]: () => this.onData(),
    [`${Package.TYPE_KICK}`]: () => this.onKick()
  }
  // 心跳相关
  heartbeatInterval = 3000 // 间隔
  heartbeatId = null // 心跳定时器
  heartbeatTimeoutId = null // 超时定时器
  heartbeatTimeout = 30000 // 超时时间

  // ws主对象
  socket = null

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
    if (messages.type !== 3) {
      console.log('onMessage', messages)
    }
    // 根据事件类型分发到对应的处理程序
    this.messageHandlers[messages.type](messages.body)

    // 重新计算心跳包时间
    if (this.heartbeatTimeout) {
      this.nextHeartbeatTimeout = Date.now() + this.heartbeatTimeout
    }
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
  async sendMessage(data, route, cb) {
    // 分析参数
    if (arguments.length === 2 && typeof route === 'function') {
      cb = route
      route = null
    }

    // 封包消息
    const bytes = Protocol.strencode(JSON.stringify(data))
    const pkg_type = Package.TYPE_HANDSHAKE

    // 封装到最终格式
    const packet = Package.encode(pkg_type, bytes)

    // 发出封包 这里应该有发送失败的处理
    this.socket.send(packet)
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
      console.log('onHandshake', data)

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
        this.heartbeatInterval = data.sys.heartbeat * 1000
        this.heartbeatTimeout = this.heartbeatInterval * 2
      }
    }

    // 要发送握手回复
    const packet = Package.encode(Package.TYPE_HANDSHAKE_ACK)
    this.socket.send(packet)
  }

  /**
  * 保持心跳
  */
  onHeartbeat() {
    console.log('heartbeat', Date.now())

    if (this.heartbeatTimeoutId) {
      clearTimeout(this.heartbeatTimeoutId)
      this.heartbeatTimeoutId = null
    }

    // already in a heartbeat interval
    if (this.heartbeatId) {
      return
    }

    this.heartbeatId = setTimeout(() => {
      this.heartbeatId = null
      const packet = Package.encode(Package.TYPE_HEARTBEAT)
      this.socket.send(packet)

      this.nextHeartbeatTimeout = Date.now() + this.heartbeatTimeout
      this.heartbeatTimeoutId = setTimeout(this.heartbeatTimeoutCb, this.heartbeatTimeout)
    }, this.heartbeatInterval)
  }

  /**
  * 心跳超时的回调
  */
  heartbeatTimeoutCb() {
    const gap = this.nextHeartbeatTimeout - Date.now()
    if (gap > gapThreshold) {
      this.heartbeatTimeoutId = setTimeout(this.heartbeatTimeoutCb, gap)
    } else {
      console.error('server heartbeat timeout')
    }
  }

  /**
  * 收到数据回复
  * @param {*} data
  */
  onData(data) {
    const msg = Message.decode(data)

    // 从发包请求中取回 Route
    if (!msg.route && msg.id && this.callRoutes[msg.id]) {
      msg.route = this.callRoutes[msg.id]
    }

    // 解码 Body
    msg.body = JSON.parse(Protocol.strdecode(msg.body))
    console.log(msg)
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
