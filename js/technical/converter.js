//steals TMT code
//renamed slighty to prevent issuses in TMT
function isPlainObject2(obj) {	return (!!obj) && (obj.constructor === Object)}?



//check if object is Decimal, OmegaNum or ExpantaNum (not a string)
function isVaildLibrary(value, throwError = true) {
  if (typeof value !== "object") {
    if (throwError) throw Error("value should be an object")
    return false
  }
  return value instanceof Decimal || value instanceof OmegaNum || value instanceof ExpantaNum
}

function convert(value, newNumberLibrary/*Decimal, OmegaNum or ExpantaNum*/) {
  
  //if newNumberLibrary is not Decimal, OmegaNum or ExpantaNum throw error and return old value
  
  var newNum = newNumberLibrary
  var convertError = "[number library conversion error] "
  
  if (newNum != Decimal && newNum != OmegaNum && newNum != ExpantaNum) {
    throw Error(`${convertError} invaild newNumberLibrary (${newNum})`)
    return value
  }

  //if value is a function throw error and return old value
  if (typeof value === "function") {
    throw Error(convertError + "converting functions is not allowed")
    return value
  }
  
  //it will throw error and return old value if you try to convert string
  if (typeof value === "string") { 
    throw Error(convertError + "converting strings is not allowed")
    return value
  }
  //same as above but for numbers
  if (typeof value === "number") {
    throw Error(convertError + "converting numbers is not allowed")
    return value
  }
  
  //handle converting objects
  if (typeof value === "object" && isPlainObject2(value)) {
      for (item in value) {
        console.log(test)
        //if value[item] is not Decimal, OmegaNum or ExpantaNum ignore it
        if (typeof value[item] === "object" && isVaildLibrary(value[item], false)) {
          value[item] = value[item].toString()
          value[item] = new newNum(value[item])
        }
        //Convert objects inside objects (theoretically infinitie "layers" of objects are possible)
        if (typeof value[item] === "object" && isPlainObject2(value[item])) {
          convert(value[item], newNum)
        }
        //convert arrays inside objects
        if (typeof value[item] === "object" && Array.isArray(value[item])) {
          convert(value[item], newNum)
        }
      }
    }
  
  //convert arrays
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        console.log(test)
        //if value[i] is not Decimal, OmegaNum or ExpantaNum ignore it
        if (typeof value[i] === "object" && isVaildLibrary(value[i], false)) { 
        value[i] = value[i].toString()
        value[i] = new newNum(value[i])
        }
        //convert objects inside arrays 
        if (typeof value[i] === "object" && isPlainObject2(value[i])) {
          convert(value[i], newNum)
        }
        if (typeof value[i] === "object" && Array.isArray(value[i])) {
           convert(value[i], newNum) 
        }
     }
    }
  
  //if value is not a string, number, object, array or function convert it
  else if (typeof value === "object" && isVaildLibrary(value)) {
    value.toString()
    return new newNum(value)
  }
}
var test = {1:new Decimal(3),2:new Decimal(4)}