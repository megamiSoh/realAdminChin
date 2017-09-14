/**
 * Created by jiachenpan on 16/11/18.
 */

 export function parseTime(time, cFormat) {
   if (arguments.length === 0) {
     return null
   }
   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
   let date
   if (typeof time === 'object') {
     date = time
   } else {
     if (('' + time).length === 10) time = parseInt(time) * 1000
     date = new Date(time)
   }
   const formatObj = {
     y: date.getFullYear(),
     m: date.getMonth() + 1,
     d: date.getDate(),
     h: date.getHours(),
     i: date.getMinutes(),
     s: date.getSeconds(),
     a: date.getDay()
   }
   const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
     let value = formatObj[key]
     if (key === 'a') return ['월', '화', '수', '목', '금', '토', '일'][value - 1]
     if (result.length > 0 && value < 10) {
       value = '0' + value
     }
     return value || 0
   })
   return time_str
 }

 export function formatTime(time, option) {
   time = +time * 1000
   const d = new Date(time)
   const now = Date.now()

   const diff = (now - d) / 1000

   if (diff < 30) {
     return '바로 지금'
   } else if (diff < 3600) { // less 1 hour
     return Math.ceil(diff / 60) + '몇 분 전'
   } else if (diff < 3600 * 24) {
     return Math.ceil(diff / 3600) + '몇 시간 전'
   } else if (diff < 3600 * 24 * 2) {
     return '1일 전'
   }
   if (option) {
     return parseTime(time, option)
   } else {
     return d.getMonth() + 1 + '월' + d.getDate() + '일' + d.getHours() + '시' + d.getMinutes() + '분'
   }
 }

// 格式化时间
 export function getQueryObject(url) {
   url = url == null ? window.location.href : url
   const search = url.substring(url.lastIndexOf('?') + 1)
   const obj = {}
   const reg = /([^?&=]+)=([^?&=]*)/g
   search.replace(reg, (rs, $1, $2) => {
     const name = decodeURIComponent($1)
     let val = decodeURIComponent($2)
     val = String(val)
     obj[name] = val
     return rs
   })
   return obj
 }

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
 export function getByteLen(val) {
   let len = 0
   for (let i = 0; i < val.length; i++) {
     if (val[i].match(/[^\x00-\xff]/ig) != null) {
       len += 1
     } else { len += 0.5 }
   }
   return Math.floor(len)
 }

 export function cleanArray(actual) {
   const newArray = []
   for (let i = 0; i < actual.length; i++) {
     if (actual[i]) {
       newArray.push(actual[i])
     }
   }
   return newArray
 }

 export function param(json) {
   if (!json) return ''
   return cleanArray(Object.keys(json).map(key => {
     if (json[key] === undefined) return ''
     return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
   })).join('&')
 }

 export function param2Obj(url) {
   const search = url.split('?')[1]
   if (!search) {
     return {}
   }
   return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
 }

 export function html2Text(val) {
   const div = document.createElement('div')
   div.innerHTML = val
   return div.textContent || div.innerText
 }

 export function objectMerge(target, source) {
    /* Merges two  objects,
     giving the last one precedence */

   if (typeof target !== 'object') {
     target = {}
   }
   if (Array.isArray(source)) {
     return source.slice()
   }
   for (const property in source) {
     if (source.hasOwnProperty(property)) {
       const sourceProperty = source[property]
       if (typeof sourceProperty === 'object') {
         target[property] = objectMerge(target[property], sourceProperty)
         continue
       }
       target[property] = sourceProperty
     }
   }
   return target
 }

 export function scrollTo(element, to, duration) {
   if (duration <= 0) return
   const difference = to - element.scrollTop
   const perTick = difference / duration * 10
   setTimeout(() => {
     console.log(new Date())
     element.scrollTop = element.scrollTop + perTick
     if (element.scrollTop === to) return
     scrollTo(element, to, duration - 10)
   }, 10)
 }

 export function toggleClass(element, className) {
   if (!element || !className) {
     return
   }
   let classString = element.className
   const nameIndex = classString.indexOf(className)
   if (nameIndex === -1) {
     classString += '' + className
   } else {
     classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
   }
   element.className = classString
 }

 export const pickerOptions = [
   {
     text: '오늘',
     onClick(picker) {
       const end = new Date()
       const start = new Date(new Date().toDateString())
       end.setTime(start.getTime())
       picker.$emit('pick', [start, end])
     }
   }, {
     text: '지난 주',
     onClick(picker) {
       const end = new Date(new Date().toDateString())
       const start = new Date()
       start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
       picker.$emit('pick', [start, end])
     }
   }, {
     text: '지난 달',
     onClick(picker) {
       const end = new Date(new Date().toDateString())
       const start = new Date()
       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
       picker.$emit('pick', [start, end])
     }
   }, {
     text: '지난 3 개월',
     onClick(picker) {
       const end = new Date(new Date().toDateString())
       const start = new Date()
       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
       picker.$emit('pick', [start, end])
     }
   }]

 export function getTime(type) {
   if (type === 'start') {
     return new Date().getTime() - 3600 * 1000 * 24 * 90
   } else {
     return new Date(new Date().toDateString())
   }
 }

 export function debounce(func, wait, immediate) {
   let timeout, args, context, timestamp, result

   const later = function() {
    // 마지막 트리거 간격에 따라
     const last = +new Date() - timestamp

    // 마지막으로 랩된 함수가 마지막으로 호출 된 마지막 시간은 설정된 시간 간격보다 짧습니다.
     if (last < wait && last > 0) {
       timeout = setTimeout(later, wait - last)
     } else {
       timeout = null
      // immediate===true로 설정된 경우，시작 경계가 호출하지 않고 여기서 호출 되었기 때문에
       if (!immediate) {
         result = func.apply(context, args)
         if (!timeout) context = args = null
       }
     }
   }

   return function(...args) {
     context = this
     timestamp = +new Date()
     const callNow = immediate && !timeout
    // 지연 시간이 없으면 지연 시간을 재설정하십시오.
     if (!timeout) timeout = setTimeout(later, wait)
     if (callNow) {
       result = func.apply(context, args)
       context = args = null
     }

     return result
   }
 }

 export function deepClone(source) {
   if (!source && typeof source !== 'object') {
     throw new Error('error arguments', 'shallowClone')
   }
   const targetObj = source.constructor === Array ? [] : {}
   for (const keys in source) {
     if (source.hasOwnProperty(keys)) {
       if (source[keys] && typeof source[keys] === 'object') {
         targetObj[keys] = source[keys].constructor === Array ? [] : {}
         targetObj[keys] = deepClone(source[keys])
       } else {
         targetObj[keys] = source[keys]
       }
     }
   }
   return targetObj
 }
