
var ecode = require('./config/ecode.js')
var util = require('./helper/util.js')

var a = {}
var what = {}
if (util.is_array(a, 'a', what) === false) {
    console.log(util.fail_json(ecode.REQ_PARAMETER_WRONG, what))
}

console.log('---------------------------------------------------')

var refCurrencyRate = []
refCurrencyRate['CNY'] = 10.0

if (refCurrencyRate['CNY'] > 0) {
    console.log(refCurrencyRate['CNY'].toString())
}
if (refCurrencyRate['JPY'] > 0) {
    console.log(refCurrencyRate['JPY'].toString())
} else {
    console.log(refCurrencyRate['JPY'])
}

var str = 'a010101'

var regEx = /^[A-Za-z]{1}[A-Za-z0-9_]{4,63}$/
console.log('regEx: ' + regEx.test(str))
