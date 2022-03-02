/**
 * Created by Alberto on 2016-07-21
 *
 * 모히또에서 몰디브 한잔..
 *
 */

var express = require('express')
var bodyParser = require('body-parser')
import cookieParser from 'cookie-parser';
// var session = require('express-session') // express.session
var redis = require('redis')

var util = require('util')
var _ = require('lodash')
var async = require('async')
import cors from 'cors'

const ApiManager = require('./common/apiManager')


const { API_ACCESS_ROLE } = require('./protocol/Common')
const { ERR } = require('./protocol/ErrorCodes')


const fs = require('fs');
const glob = require('glob');
const YAML = require('yaml-js');
const extendify = require('extendify');

import TradeData from './data/tradeData';
import AccountData from './data/accountData';
import Account from './model/account';

import swaggerUi from 'swagger-ui-express';
import Logger from './control/logger';

//const swaggerDocument = YAML.load('./docs/swagger.yaml');
//var swaggerDocument = require('../docs/swagger.json');

import DB from './common/dbConn';

// -----------------
const firebase_admin = require('firebase-admin')

const ServiceAccount = {
    type: 'service_account',
    project_id: 'kj-platform',
    private_key_id: '79c4e941e3bd8bf5276386b01d1433c0ecdb3d41',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3wPBO0IP2Qh19\nD2AoMvlImhu2weRyk8bSqx53TKPWcH94IDftqgpDoKMBlWmsRoAD3qMMX8wHMFum\natRWX4542fZ96lv0oy8faboLixOHAB9yl7wND/wU9WuQ3dn2Pog2rWu+BU1b+DpW\nNc+LWxNMgfvtA2dJD5gNo6zWpDO1/RUX2EgUT+Q0HbpwO44VElYgAgUmiPYGLIN6\nJwRgybNZS9y+omHcDT/jHxOVUD0cfnFentJYFxb3xijhkxxdZ4x+W44mpyGqf04m\n4fXZO5hp2wT4uxju74aYlVB/gb9yRosVMdCoGSLVu/WdgIXdyRWe9taN/kCirK0z\nhVIoKojHAgMBAAECggEAAxR6Uq/fDmEkUmTQFUxpbkSbA1CzrhH5Cq3wmEpSErWX\nBWHw3gx0GJcYNF4XQ9p4qdfw/rOaXWJ7nsn6nioC3ta0cX7cpLiZgRrKEgh2PtSL\nMmYFsmhartVARNDbJuv8Z4I3pJs9JTX/cFN9k5XmuGkTWnEsqYZX456jNoPRFBNP\nIkcfHQjP9+apDpB/WFNEfVYvRmXVrnSatF6YBO5QgENQYIx6Abjd1+58zB/rc5/c\n9UZ15TF2BgOTJGN4fSGrdzKqo38nH7pcuJTxxWNfuIU8cihCpVtjDS5yoCr2QgFb\nA01j9vbNDjtDJ5J3IjwjhUmSKj/omRwMNA/MWaa9sQKBgQDa1KohbnGRIRZcT5EC\nLdgZt9LVfeD52ptztwvJb2h7uXlFCHtbtCRTYZXO+8CceAbHSZQsplv+RKyBanxq\nIypWLGqVh+JXYlspxewUE/HH1fd0cM/UcLFahhK2A9D9gPUJp9Uy7yspch9nnEud\nKjmU69oPlTis6wTtx0VQdfrsFwKBgQDW9wgSzYDfbysIjDQuQqvjedrqE12COFFJ\nVJLO67V6m1JEx4xivrgzv5DJ4B+D2eC/m0tk3zVHMqtjMQhGp0Rp+GvS8gOvKOqX\nhByaCCN0FVsCDHk85E8W2WoP6TODYLAASJAsYT4jGLrgio8MqQKRQ1iQeySx5HuD\nRZBtfbrG0QKBgAti2V9X8czNXe57rV3hqMbdy7iUDiqx9zi0I4bdpyAY7HhtEo4Y\n93LnNvZIHyOFE0U3TOBt34eBZ0BsnAChx8goE3uoUFyfn4Ky66+3wfLV7UQ/wnCZ\nVIETTNHvrOYj2ZwhAXTfAO3tJDkt5rlMwyY+h2AcMZC9wcnlfnPLT70NAoGBAM9u\nQRQjyZ/Rniz5XcDmBQfUpjIJzcnCnm2sdp3FRbGx/4jvJcCDWSxWRlkHNGH+9Kjw\nKaiE2tyBQHDO97V14sZ/OUyszHFRgk4C5bac89koYlFvx+3CQa9CzN3doh+8RRmA\n695nV5Z2Xp4eFjuZOykBW4zPx3EBkU3y6pM9J+aBAoGAE5KKX1NXwkJdATEmOSxy\nCATgW+d9yXe6NbADLgJYwJH0pt8jwW/FyEkfWftNw9Q/yctq9PxeUQSojCMeGxBw\nUaieDyT1WpvwXzXQ6LOWbDWpza/thnX2nMgoLq+IU67/Y42hTI4J1UyduT8BY+7q\n9uV6rFVxLbPHi3pAwrzm6B0=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-u8gln@kj-platform.iam.gserviceaccount.com',
    client_id: '115613432047478325879',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u8gln%40kj-platform.iam.gserviceaccount.com'
}
// -----------------

// var spec = fs.readFileSync(path.join(__dirname, 'swaggerDocs/swagger.yaml'), 'utf8')
// var swaggerDoc = jsyaml.safeLoad(spec)

// var swaggerOptions = {
//     // swaggerUi: path.join(__dirname, '/swagger.json'),
//     // controllers: path.join(__dirname, './controllers'),
//     useStubs: true // process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
// }


import Config from './config/config';
import CoinApi from './data/coin';

export default class AppManager {    

    public static config = Config;        
    public global = {}
    public prerequisites = {}
    public essential = {}

    public args = {
        db: {}, // maria db
        mdb: {}, // redis
        server: this
    }
    
    public app = express()


    public firebase_admin = firebase_admin.initializeApp({
        credential: firebase_admin.credential.cert(ServiceAccount),
        databaseURL: 'https://kj-platform.firebaseio.com'

    })

    
    prepare(config:any) {
        var self = this;
        var tasks:any = [];
        
        const mdb = config.mdb
        // tasks.push(function (taskdone:any) {
        //     var mdbTask:any = [];
            
        //     mdb.forEach(function (e:any) {
        //         mdbTask.push(
        //             function (callback:any) {
        //                 // self.createRedisClient(e.name, e.host, e.port, e.select, e.subscribe, function (client:any) {
        //                 //     var ret:any = {}
        //                 //     ret[e.name] = client
        //                 //     ret[e.name].prefix = e.prefix
        //                 //     callback(null, ret)
        //                 // })
        //             }
        //         )
        //     })

        //     async.parallel(mdbTask, function (err:any, results:any) {
        //         if (err) {
        //             console.log(err.message)
        //         } else {
        //             results.forEach(function (e:any) {
        //                 _.extend(self.args.mdb, e)
        //             })
        //         }
        //         taskdone(err, 'mdb')
        //     })
        // })




        tasks.push(function (taskdone:any) {
            DB.init(config.db).then(function (pool:any) {
                _.extend(self.args.db, pool)
                taskdone(null, 'db')
            })
        })

        return new Promise(function (resolve, reject) {            

                            


            if (tasks.length === 0) {
                console.log('tasks.length is 0')
                return resolve(undefined)
            }

            async.series(tasks, function (err:any, results:any) {                

                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    init() {
        var self = this        

        return new Promise(function (resolve, reject) {
            
            self.prepare(AppManager.config).then(function () {                            
                self.app.use(cookieParser()) // read cookies (needed for auth)
                self.app.use(cors())
                self.app.use(bodyParser.json({ type: 'application/json' }))
                self.app.use(bodyParser.urlencoded({ extended: false }))

                self.app.use('/images', express.static('upload'));

                if (AppManager.config.server.swagger.switch === 'on') {
                    glob("docs/*.yaml", function (er:any, files:any) {
                        const contents = files.map((f:any) => {      
                          return YAML.load(fs.readFileSync(f).toString());
                        });
                        const extend = extendify({
                          inPlace: false,
                          isDeep: true
                        });
                        const merged = contents.reduce(extend);
                        self.app.use('/docs', swaggerUi.serve, swaggerUi.setup(merged));                      
                      });
                }


                console.log('route ON')
                var r = require('./routes/routes')
                r.routes(self)
                console.log('route ON, success !!')

                resolve()
            }).catch(function (err) {

                console.log(err);
                reject(err)
            })
        })
    }

/**
 * 서버의 구동이 시작된 뒤, 처리할 것이 있으면 처리한다.
 * 예) 탈퇴자 처리 루틴 구동.
 *     로그에 대한 처리..
 */

    async checkTime(){
        try{
            await checkEscrow();
        }catch(e){
            console.log(e)
        }   

        setTimeout(() => {
            this.checkTime();
        }, 5000);
    }

    reservedAction() {
        var appManager = this

        return new Promise(async function (resolve, reject) {
            //var investdb = appManager.args.db.invest.model || {}

            //  아래와 같은 것들.. 서버가 시작되면 해야 할것들을 여기에 적어둔다.

            var tasks:any = []


            async.waterfall(tasks, function (err:any, results:any) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })

            
            // setInterval(async function(){                
            //     await checkEscrow("dot");                
            // }, 15 * 60 * 1000)

            // setInterval(async function(){ 
            //     await checkEscrow("eth");                
            // }, 15 * 60 * 1000)

            // setInterval(async function(){                
            //     await checkEscrow("eth");
            // }, 15 * 60 * 1000)


            setInterval(function(){
                TradeData.tradeListSettle().then((rows:any) => {
                    settle(rows, 0);
                }, (error) => {});                
            }, 3 * 60 * 1000)            


            setInterval(function(){                
                AccountData.withdrawSendingList().then((rows:any) =>{
                    withdraw(rows, 0);
                }, (error) => {});        
            }, 10*60*1000);

            appManager.checkTime();

            //await checkEscrowTemp(11182335);
            
        })
    }

    framework() {
        var appManager = this;

        return new Promise(function (resolve, reject) {
            var port = AppManager.config.server.port || {}
            appManager.app.listen(port)

            resolve()
        })
    }

    start() {
        var self = this;

        return new Promise(function (resolve, reject) {
            console.log('starting  ... ' + AppManager.config.TitleName)

            console.log('Init ..')

            self.init().then(function () { // db( mysql --> sequelize ) , redis.. express.
                console.log('init done')

                console.log('StartReservedAction ..')
                self.reservedAction().then(function () {
                    console.log('StartReservedAction done')

                    console.log('api server ..')
                    self.framework().then(function () {
                        console.log(`api server ..  Start! (port: ' + ${AppManager.config.server.port} + ' )`)

                        //self.walletManager.startGetBtcListTransaction()

                        resolve()
                    }).catch(function (err) {                        
                        reject(err)
                    })
                }).catch(function (err) {                    
                    reject(err)
                })
            }).catch(function (err) {                
                reject(err)
            })
        })
    }

    createRedisClient (name:any, host:any, port:any, select:any, subscribe:any, next:any) {
        console.log(util.format('[redis][%s] connect to %s:%d', name, host, port))
        var client = redis.createClient(port, host, {})
        client.on('connect', function (ret:any) {
            console.log(util.format('[redis][%s] connected!', name))
        })
    
        // use once
        // redis client will automatically restore database index and subscribe

        var self = this;
        client.once('ready', function (ret:any) {
            if (select >= 0 && subscribe === undefined) {
                client.select(select, function (err:any, res:any) {
                    if (err) {
                        console.log(util.format('[redis][%s] select %d error:', name, select))
                        console.log(err.stack)
                    } else {
                        console.log(util.format('[redis][%s] select %d succeed!', name, select))
                        next(client)
                    }
                })
            } else {
                if (subscribe && subscribe.length > 0) {
                    client.on('subscribe', function (channel:any, count:any) {
                        console.log(util.format('[redis][%s] subscribed channel = %s, count = %d', name, channel, count))
                    })
                    client.on('message', function (channel:any, message:any) {
                        console.log(util.format('[redis][%s] published channel = %s, message = %s', name, channel, message))
                        // fire message event
                        /*
                        self.message(channel, message, self.args)
                        if (self.essential.message) {
                            self.essential.message(channel, message, self.args)
                        }
                        */
                    })
    
                    client.subscribe(subscribe, function (err:any, msg:any) {
                        if (err) {
                            console.log(err)
                        }
                        next(client)
                    })
                } else {
                    next(client)
                }
            }
        })
        client.on('reconnecting', function (ret:any) {
            // console.log(util.format('[redis][%s] reconnecting! attempt:%d, delay:%d', name, ret.attempt, ret.delay))
        })
        client.on('error', function () {
            // console.log(util.format('[redis][%s] error!', name))
        })
        client.on('end', function () {
            console.log(util.format('[redis][%s] end!', name))
        })
        return client
    }
}


async function checkEscrowTemp(blockNumber:number){
    let coin = "dot";
    
    let result : any = await CoinApi.getTransactions(coin, blockNumber);
    let txs = result.result;
    for(var i = 0; i < txs.length; ++i){
        let tx = txs[i];
        if (tx.confirmations > 7) {
            Account.insert(coin.toUpperCase(), tx.key, tx.value, tx.hash);
        }

    }

    coin = "eth";
    result = await CoinApi.getTransactions(coin, blockNumber);
    txs = result.result;
    for(var i = 0; i < txs.length; ++i){
        let tx = txs[i];
        if (tx.confirmations > 7) {
            Account.insert(coin.toUpperCase(), tx.key, tx.value, tx.hash);
        }

    }

    coin = "peri";
    result = await CoinApi.getTransactions(coin, blockNumber);
    txs = result.result;
    for(var i = 0; i < txs.length; ++i){
        let tx = txs[i];
        if (tx.confirmations > 7) {
            Account.insert(coin.toUpperCase(), tx.key, tx.value, tx.hash);
        }

    }


    await CoinApi.updateBlockInfo(blockNumber);
}


async function checkEscrow(){
    //var list = await AccountData.getCheckAddressList(coin);
    let lastBlockR : any = await CoinApi.getLastBlock();

    let lastUpdateBlcokR : any = await CoinApi.lastUpdateBlock();

    let lastBlock = lastBlockR.result;
    let lastUpdattBlcok = lastUpdateBlcokR.lastBlock;

    if(lastUpdattBlcok < 11195280){
        lastUpdattBlcok = 11195280;
    }

    if(lastBlock < lastUpdattBlcok + 7){
        return;
    }

    //let blockNumber = 11195285;
    let blockNumber = lastUpdattBlcok + 1;

    let coin = "dot";
    
    let result : any = await CoinApi.getTransactions(coin, blockNumber);
    let txs = result.result;
    for(var i = 0; i < txs.length; ++i){
        let tx = txs[i];
        if (tx.confirmations > 7) {
            Account.insert(coin.toUpperCase(), tx.key, tx.value, tx.hash);
        }

    }

    coin = "eth";
    result = await CoinApi.getTransactions(coin, blockNumber);
    txs = result.result;
    for(var i = 0; i < txs.length; ++i){
        let tx = txs[i];
        if (tx.confirmations > 7) {
            Account.insert(coin.toUpperCase(), tx.key, tx.value, tx.hash);
        }

    }

    coin = "peri";
    result = await CoinApi.getTransactions(coin, blockNumber);
    txs = result.result;
    for(var i = 0; i < txs.length; ++i){
        let tx = txs[i];
        if (tx.confirmations > 7) {
            Account.insert(coin.toUpperCase(), tx.key, tx.value, tx.hash);
        }

    }


    await CoinApi.updateBlockInfo(blockNumber);
    
}


async function withdraw(rows: any, row: number) {

    if(row < rows.length){

        var withdrawInfo: any = rows[row];
        var uid = withdrawInfo.uid;
        var withdrawIdx = withdrawInfo.withdrawIdx;
        var amount = withdrawInfo.amount;
        var withdrawAddress = withdrawInfo.withdrawAddress;
        var coin = withdrawInfo.coin;
        var walletIdx = withdrawInfo.walletIdx;
        try{
            var txHash = await sendCoin(coin, walletIdx, withdrawAddress, amount);        
            if(txHash.length > 3){
                var r = await AccountData.accounthistoryInsert(coin, uid, -amount, 'W', txHash, withdrawIdx);
            }
        }catch(e){
            Logger.Info(e);
            
        }
        

        withdraw(rows, row + 1);
    }
}

async function settle(rows: any, pos: number) {
    
    if(pos < rows.length){
        var tradeIdx = rows[pos].tradeIdx;
        var uidMaker = rows[pos].uidMaker;
        var uidTaker = rows[pos].uidTaker;
        var makerAddress = rows[pos].makerAddress;
        var takerAddress = rows[pos].takerAddress;
        var price = rows[pos].price;
        var amount = rows[pos].amount;
        var makerIdx = rows[pos].makerIdx;
        var takerIdx = rows[pos].takerIdx;
        var makerHash = rows[pos].makerHash;
        var takerHash = rows[pos].takerHash;
        var tradeFee = rows[pos].tradeFee;

        var symbol = rows[pos].symbol + "";
        var orderSide = rows[pos].orderSide;


        var makerCoin = "";
        var takerCoin = "";
              
        var makerTo = takerAddress;

        
        var takerTo = makerAddress;

        var makerAmount = 0;
        var takerAmount = 0;
        
        if(orderSide == "B"){
            makerCoin = symbol.split('/')[1];
            takerCoin = symbol.split('/')[0];

            makerAmount = price * amount;
            takerAmount = amount;
        }else{
            makerCoin = symbol.split('/')[0];
            takerCoin = symbol.split('/')[1];

            makerAmount = amount;
            takerAmount = price * amount;
        }

        makerAmount = makerAmount * (100 - tradeFee) / 100;
        takerAmount = takerAmount * (100 - tradeFee) / 100;

        // makerFrom = await getFromAddress(makerCoin, makerIdx);
        // takerFrom = await getFromAddress(takerCoin, takerIdx);
        // makerBalacne = await getBalance(makerCoin, makerIdx );
        // takerBalacne = await getBalance(takerCoin, takerIdx );


        
        var txHash = "";       
  
        if(makerHash == null || makerHash.length < 3){
            txHash = await sendCoin(makerCoin, makerIdx, makerTo, makerAmount);
            if(txHash.length > 3){
                var r = await TradeData.tradeSettleMaker(tradeIdx, uidMaker, txHash);
            }
        }

        txHash = ""

        

        if(takerHash == null || takerHash.length < 3){
            txHash = await sendCoin(takerCoin, takerIdx, takerTo, takerAmount);
            if(txHash.length > 3){
                r = await TradeData.tradeSettleTaker(tradeIdx, uidTaker, txHash);
            }
            //* 5 / 100000;
        }

        r = await TradeData.tradeSettle(tradeIdx, uidMaker, uidTaker)


        //console.log(rows[pos]);
        // TradeData.tradeSettle(tradeIdx, uidMaker, uidTaker, txHashMaker, txHashTaker).then(
        //     (result) => {
        //         settle(rows, pos + 1);
        //     }, (error) => {}
        // );

        settle(rows, pos + 1);
    }

}

async function sendCoin(coin: string, idx: any, to: any, sendAmount: number) {

    var txHash = "";

    if (coin == "BTC") {
        var r: any = await CoinApi.getAccountSend(coin, idx, to, sendAmount.toFixed(8), "", "p2p");
        if(r.txid != undefined){
            txHash = r.txid;
        }        
    }
    else if (coin == "ETH") {
        var gas = await getGas();        
        var gasPrice = gas / 10;
        sendAmount = Math.floor(sendAmount * 10000000000)/10000000000;
        var r: any = await CoinApi.getAccountSend(coin, idx, to, sendAmount.toString(), gasPrice.toString(), "p2p");
        if(r.Success == true){
            txHash = r.Result;
        }        
    }else if(coin == "DOT" || coin == "PERI"){        
        var gas = await getGas();        
        var gasPrice = gas / 10;

        var gasRequired = gasPrice * 50 / 1000000;

        var balance = await getBalance("ETH", idx);        
        //console.log(gasRequired);
        var from :any = await getFromAddress("ETH", idx);
        if(balance < gasRequired * 2){            
            CoinApi.getethrequest(from, (gasRequired * 10).toFixed(8) );
        }

        var r: any = await CoinApi.getAccountSend(coin, idx, to, sendAmount.toFixed(2), gasPrice.toString(), "p2p");
        if(r.Success == true){
            txHash = r.Result;
        }
        //console.log(r);

    }else{
        txHash = "BANK";
    }

    return txHash;
}

async function getFromAddress(coin: string, idx: number) {
    var address = "";

    if (coin == "BTC") {
        var r:any = await CoinApi.getAccountAddress("BTC", idx);
        address = r.address;        
    }else if(coin == "ETH" || coin == "DOT" || coin == "PERI"){
        var r:any = await CoinApi.getAccountAddress("ETH", idx);
        address = r.address;
    }
    return address;
}


async function getBalance(coin: string, idx: number) {
    var balance = 0;
    if(coin == "ETH" || coin == "DOT" || coin == "PERI"){
        var r:any = await CoinApi.getAccountBalance("ETH", idx);        
        balance = r.balance;

        
    }
    //console.log(balance);
    return balance;
}

async function getGas() {
    var result:any = await CoinApi.getGasInfo();    
    return result.average;
}


