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
