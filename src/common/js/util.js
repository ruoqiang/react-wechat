export function shuffle(arr) {
 let _arr = arr.slice()
 for (let i = 0; i < _arr.length; i++) {
   let j = getRandomIn(0, i)
   let t = _arr[i]
   _arr[i] = _arr[j]
   _arr[j] = t
 }
 return _arr
}

function getRandomIn(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function debounce(fn, delay) {
  let timer
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}
export function getNowDate(addDayCount) {
  var AddDayCount = addDayCount || 0
  var nowDate = new Date()
  // var newDate = new Date()
  nowDate.setDate(nowDate.getDate() + AddDayCount)
  var year = nowDate.getFullYear()
  var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1)
   : nowDate.getMonth() + 1
  var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
   .getDate()
  var dateStr = year + "-" + month + "-" + day
  console.log(dateStr)
  return dateStr
}