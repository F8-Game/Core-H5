export const randomNum = function(minNum, maxNum = Infinity, exclude = []) {
  let result = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  if (exclude.length >= (maxNum - minNum)) {
    return null
  }
  if (exclude.includes(result)) {
    result = randomNum(minNum, maxNum, exclude)
  }
  return result
}

export const sleep = function(method, timeout = 10000) {
  const start = Number(Date.now())
  return new Promise((resolve, reject) => {
    (function selfRecursion() {
      setTimeout(() => {
        if (Date.now() - start > timeout) {
          return reject(`sleep timeout ${timeout}`)
        }
        let flag
        if (typeof method === 'function') {
          flag = !method()
        }
        if (typeof method === 'number') {
          if (method > timeout) {
            return reject(`堵塞时间超过arguments[1]::timeout=${timeout}`)
          }
          flag = Number(Date.now()) - start < method
        }
        if (flag) {
          selfRecursion()
        } else {
          resolve()
        }
      }, 10)
    })()
  })
}
