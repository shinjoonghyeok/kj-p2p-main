
//var async = require('async');
//async.series([
//		// 첫번째 실행
//		// async의 프로세스 흐름을 도와줄 수 있는 callback이 전달됩니다.
//		// 이를 이용하여 흐름을 제어할 수 있는것입니다.
//		// 즉, 다음 task으로 이동하기 위해서는 callback을 실행해야 합니다.
//		// 사용방법은 callback(에러, 결과값) 형태로 사용됩니다.
//		// -----------------------------------------------------
//		function(callback) {
//			console.log('--- async.series::ste#1 ---');
//			// 다음 task으로 이동하기 위해 실행
//			// 첫번째 인수로 에러
//			// 두번째부터는 마지막 callback에 전달할 값들을 설정할 수 있습니다.
//			// 예) callback(null, 'one' [, value ...]);
//			// ---------------------------------------------------------
//			callback(null, 'one');
//			// 예) 첫번째 인수로 에러를 발생시킬 경우
//			// 만약 이곳에서 첫번째 인수를 new Error('error message')를 전달하면
//			// 선언된 tasks의 동작은 여기서 멈추고,
//			// 마지막 callback으로 프로세스 진행이 넘어갑니다.
//			// ----------------------------------------------------------
//			// callback(new Error('error message'), null);
//		},
//		// 두번째 실행
//		// -----------
//		function(callback) {
//			console.log('--- async.series::ste#2 ---');
//			// 다음 task으로 이동하기 위해 실행
//			// 에러는 null, 전달할 결과값은 'two'
//			callback(null, 'two');
//		}
//	],
//// 모든 task를 끝내고, 아래 callback으로 에러와 배열인자가 전달됩니다.
//// ------------------------------------------------------
//	function(err, results) {
//		console.log('--- async.series result ---');
//		console.log(arguments);
//	});


//var dt = new Date();
//var dtnext = new Date( dt.getTime() + 24*60*60*1000);
//console.log(dt.toString() + '   ' + dtnext.toString());
//var dtnext2 = dt.adDays(1);
// console.log(dtnext2.toString());






//var today = new Date(2015,11,30, 8);
//var exetime = new Date( today.getFullYear(), today.getMonth(), today.getDate(), 7);
//if( exetime > today ){}else{ // ok
//    exetime.setTime( exetime.getTime() + 24*60*60*1000);
//}

//var dt = new Date( today.getTime() - 24*60*60*1000 );

//console.log(today.toString() );
//console.log(exetime.toString() );
//
//console.log( (exetime - today).toString());



//var fromDay = undefined;
//var today = new Date(fromDay);
//console.log(today.toString() );


// var t = 'server:game:52.68.203.178:10603';
// console.log(parseInt( Number( t.substring(t.length -5)) / 10));
//
// var tarray = t.split(':');
// console.log( tarray );
//
// var port = tarray[tarray.length-1];
// console.log(parseInt(port/ 10));
//

// require('date-utils');
// var today = new Date();
// var expired = new Date('2026-08-17 15:43:00' );
// var seconds = today.getSecondsBetween(expired);
// var miliseconds = today.getMillisecondsBetween(expired);
// console.log( seconds);
// console.log( seconds * 1000 );
// console.log( miliseconds );
// console.log( 'expired.getTime() - today.getTime() = ' + ( expired.getTime() - today.getTime()));
// console.log( 'expired.getTime() - today.getTime() = ' + (( expired.valueOf() - today.valueOf())));
// console.log( 'expired.getTime() - today.getTime() = ' + (2200000000 | 0));
// console.log( 'expired.getTime() - today.getTime() = ' + 2200000000);

//(date.clone().valueOf() - this.valueOf())) | 0




// util = require('./helper/util.js');
// var t = 1001;
// var str;    console.log( util.is_string(str) );
// str = '';   console.log( util.is_string(str) );
// console.log( '--------------------');
// str = '0001';   console.log( util.is_string(str) );
// str = 1;        console.log( util.is_string(str) );
// console.log( '--------------------');
// str = true; console.log( util.is_string(str) );
// str = null; console.log( util.is_string(str) );
// str = undefined ; console.log( util.is_string(str) );
// console.log( '--------------------');
//
// console.log( '-----------is_number---------');
//
// var str;    console.log( util.is_number(str) );
// str = '';   console.log( util.is_number(str) );
// console.log( '--------------------');
// str = '0001';   console.log( util.is_number(str) );
// str = 1;        console.log( util.is_number(str) );
// console.log( '--------------------');
// str = true; console.log( util.is_number(str) );
// str = null; console.log( util.is_number(str) );
// str = undefined ; console.log( util.is_number(str) );
// console.log( '--------------------');
//
//
//
//
//
// var old_time = (new Date()).getTime();
// for( var i = 0 ; i < 100000 ; i ++){
//     //util.isNormalInteger(t);
//     util.is_number(t);
// }
// var now_time = (new Date()).getTime();
// console.log( now_time - old_time );
// console.log( '--------------------');
//
//
//
// var t;
// console.log('1st : ' + t);
// if( t == null  ){
//     console.log('2nd : ' + 'null');
// }else{
//     console.log('3rd : ' + 'undefined');
// }
//
//

// var o = {
//     tvseries : {
//         originalTitle : "hello world"
//     }
// }, type = Object.keys(o)[0];
//
// console.log(type);


// var result  = {};
// result.success = null;
// console.log( result.success == false );

// var now = new Date();
//
// var d = now; // now
// var s = now; // start
// var gap = Number( '30');
// now.setSeconds(now.getSeconds() + gap);
// var e = now; // end
//
//
// console.log(s);
// console.log(d);
// console.log(e);
//


//var config =  require('./config/config');
//console.log( config.BetBoardPosArray[0]);




var odds = [1.30,	2.00,	6.00,	4.60,	2.40,	23.60,	10.00,	50.10];  //승률 ...
var odds = [0,	0,	0,	0,	0,	0,	100.00,	0];  //승률 ...
var odds = [12.5,12.5,12.5,12.5,12.5,12.5,12.5,12.5];  //승률 ...
var odds = [1.30,	2.00,	6.00,	4.60,	2.40,	23.60,	10.00,	50.10];  //승률 ...



var analy = odds;

var scnd = [];

var w = [];
var p = [];
var q = [];
var e = [];
var holeCount = 8;

var str ='';

str = '';
for( var c = 0; c < holeCount ; c ++  ){
    scnd[c] = ( odds[c] + 100.0/8.0 ) / 2.0;
    str += scnd[c].toFixed(2) + '   ';
}
console.log('scnd[] = '  + str);

str = '';
for( var c = 0; c < holeCount ; c ++  ){
    w[c] = 100.0 / odds[c];
    str += w[c].toFixed(2) + '   ';
}
console.log('w[] = '  + str);

str = '';
for( var c = 0 ; c < holeCount ; c ++  ){
    p[c] = 200.0 / scnd[c] / 4;
    str += p[c].toFixed(2) + '   ';
}
console.log('p[] = '  + str);


console.log('q[]');
for( var j = 0, c = 0 ; j < holeCount ; j ++  ){
    str = '';
    for( var i = 0 ; i < holeCount ; i ++, c++  ){
        if (i < j) { // Quenella
            q[c] = (scnd[j] + scnd[i] ) / 7.0;
            q[c] = 100.0 / q[c];
            str += q[c].toFixed(2) + '   ';
        }
    }
    console.log( str);
}

console.log('');
console.log('e[]');
for( var j = 0, c = 0 ; j < holeCount ; j ++  ){
    str = '';
    for( var i = 0 ; i < holeCount ; i ++, c++  ){
            if (i < j) { // Quenella
                e[c] = (odds[j] + scnd[i] ) / 14.0;
                e[c] = 100.0 / e[c];
                str += e[c].toFixed(2) + '   ';
            }else if (i > j) { //  + Exacta
                e[c] = (scnd[i] + odds[j] ) / 14.0;
                e[c] = 100.0 / e[c];
                str += e[c].toFixed(2) + '   ';
            }else {
                str += '    ';
            }
    }
    console.log( str);
}
