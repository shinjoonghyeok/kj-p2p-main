
import _ from 'lodash'
import jwt from 'jsonwebtoken'
import Common from '../protocol/Common'
import AppManager from '../appManager';
import Util from '../common/util';
import * as express from 'express';
import User from '../control/user';

let no_token_4_test = true // 나중에 제거 
const path = require('path');
import multer from 'multer'
import { ERR } from '../protocol/ErrorCodes';
import { ExtraPoolOptions } from 'request';
import Basic from '../control/basic';
import Trade from '../control/trade';
import Account from '../control/account';

const routes = (appManager: AppManager) => {
    let app = appManager.app

    let config = AppManager.config
    let version = config.server.version
    
    app.locals.TitleName = config.TitleName

    // TODO: s3 또는 firebase cloud storage 로 바꾸는것이 좋다. 
    let uploadCertImg = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, config.server.kj.customer.certImages);
            },
            filename: function (req: any, file, cb) {
                if(file.fieldname == 'certImg1'){
                    cb(null, req.headers.decodedToken.uid + "_1"+ path.extname(file.originalname));                    
                }else if(file.fieldname == 'certImg2'){
                    cb(null, req.headers.decodedToken.uid + "_2"+ path.extname(file.originalname));                    
                }

            }
        }),
    });

    let uploadClaim = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, config.server.kj.customer.claim);
            },
            filename: function (req: any, file, cb) {
                if(file.fieldname == 'file'){
                    cb(null, Date.now() + path.extname(file.originalname));                    
                }
            }
        }),
    });

    /// ////////////////////////////////////////////////////////////
    /// ////////////////////////////////////////////////////////////
    /// ////////////////////////////////////////////////////////////

    app.get('/health_check', healthCheck)

    // app.get('/error', u.isLoggedIn, u.render(locomotion, {message: 'Error'}));

    /**************************************************************************************/
    /*             Auth                                                                   */
    /**************************************************************************************/

    //app.post('/publisher/get/token', publisherManager.getToken(appManager))
    //app.post('/publisher/get/info', checkReqParams, publisherManager.getInfo(appManager))

    /**************************************************************************************/
    /*             basic                                                                  */
    /**************************************************************************************/

    app.post('/basic/symbol/insert', checkFirebaseIdToken, Basic.symbolInsert);
    app.post('/basic/symbol/update', checkFirebaseIdToken, Basic.symbolUpdate);
    app.get('/basic/symbol/select/:symbol', checkFirebaseIdToken, Basic.symbolSelect);
    app.get('/basic/symbol/list', checkFirebaseIdToken, Basic.symbolList);
    app.get('/basic/symbol/requireBank', checkFirebaseIdToken, Basic.requireBank);

    app.post('/basic/currency/insert', checkFirebaseIdToken, Basic.currencyInsert);
    app.post('/basic/currency/update', checkFirebaseIdToken, Basic.currencyUpdate);
    app.get('/basic/currency/select/:coin', checkFirebaseIdToken, Basic.currencySelect);
    app.get('/basic/currency/list', checkFirebaseIdToken, Basic.currencyList);


    app.post('/basic/board/insert', checkFirebaseIdToken, Basic.boardInsert);
    app.post('/basic/board/update', checkFirebaseIdToken, Basic.boardUpdate);    
    app.get('/basic/board/list', checkFirebaseIdToken, Basic.boardList);

    app.post('/basic/board/:boardCode/insert', checkFirebaseIdToken, Basic.articleInsert);
    app.post('/basic/board/:boardCode/update', checkFirebaseIdToken, Basic.articleUpdate);    
    app.get('/basic/board/:boardCode/select/:articleIdx', Basic.articleSelect);
    app.get('/basic/board/:boardCode/list', Basic.articleList);


    /**************************************************************************************/
    /*             User                                                                  */
    /**************************************************************************************/


    app.get('/user/checkemail/:email', User.userCheckEmail);
    app.get('/user/checkemailtel/', User.userCheckEmailTel);    
    app.get('/user/getemail', User.userGetMailByTel);
    app.post('/user/insert', checkFirebaseIdToken, User.userInsert);
    app.post('/user/update', checkFirebaseIdToken, User.userUpdate);    
    app.get('/user/select', checkFirebaseIdToken, User.userSelect);    
    app.get('/user/balance/:coin', checkFirebaseIdToken, User.userBalance);    
    app.get('/user/wallet/:coin', checkFirebaseIdToken, User.getWalletAddress);
    app.get('/user/account/:coin', checkFirebaseIdToken, User.getAccountAddress);

    app.get('/user/recieveinfo/list', checkFirebaseIdToken, User.recieveInfoList);
    app.post('/user/recieveinfo/update', checkFirebaseIdToken, User.recieveInfoUpdate);

    app.post('/user/kyc/apply', checkFirebaseIdToken, uploadCertImg.fields([{name:'certImg1'},{name:'certImg2'}]), User.kycApply);
    app.get('/user/kyc/select', checkFirebaseIdToken, User.kycSelect);

    app.post('/user/claim/insert', checkFirebaseIdToken, uploadClaim.single("file"), User.claimInsert);    
    app.get('/user/claim/select/:claimIdx', checkFirebaseIdToken, User.claimSelect);    
    app.get('/user/claim/list', checkFirebaseIdToken, User.claimList);    

    app.post('/user/message/insert', checkFirebaseIdToken, uploadClaim.single("file"), User.messageInsert);    
    app.get('/user/message/read/:idx', checkFirebaseIdToken, User.messageRead);    
    app.get('/user/message/list/:claimIdx', checkFirebaseIdToken, User.messageList);    


    app.post('/admin/user/update', checkFirebaseIdToken, User.userUpdateAdmin);
    app.get('/admin/user/select/:uid', checkFirebaseIdToken, User.userSelectAdmin);
    app.get('/admin/user/list', checkFirebaseIdToken, User.userList);
    app.get('/admin/user/kyc/select/:uid', checkFirebaseIdToken, User.kycSelectAdmin);
    app.get('/admin/user/kyc/confirm/:uid', checkFirebaseIdToken, User.kycConfirm);
    app.get('/admin/user/kyc/refuse/:uid', checkFirebaseIdToken, User.kycRefuse);
    app.get('/admin/user/kyc/list', checkFirebaseIdToken, User.kycList);


    
    /**************************************************************************************/
    /*             trade                                                                  */
    /**************************************************************************************/

    app.post('/trade/insert', checkFirebaseIdToken, Trade.tradeInsert);
    //app.post('/trade/update', checkFirebaseIdToken, Trade.tradeUpdate);
    app.get('/trade/select/:tradeIdx', checkFirebaseIdToken, Trade.tradeSelect);
    app.get('/trade/openList', checkFirebaseIdToken, Trade.tradeOpenList);
    app.get('/trade/recentList', checkFirebaseIdToken, Trade.tradeListRecent);
    app.get('/trade/depositList', checkFirebaseIdToken, Trade.tradeDepositList);
    app.get('/trade/list', checkFirebaseIdToken, Trade.tradeList);
    app.get('/trade/listComplete', checkFirebaseIdToken, Trade.tradeListComplete);
    app.get('/trade/listCancel', checkFirebaseIdToken, Trade.tradeListCancel);
    app.get('/trade/recieveInfo', checkFirebaseIdToken, Trade.recieveInfo);

    app.post('/trade/order/insert', checkFirebaseIdToken, Trade.orderInsert);

   
    app.post('/trade/bank/deposit', checkFirebaseIdToken, Trade.tradeBankDepsit);
    app.post('/trade/bank/confirm', checkFirebaseIdToken, Trade.tradeBankDepsitConfirm);
    app.post('/trade/confrim', checkFirebaseIdToken, Trade.tradeConfirm);
    app.post('/trade/cancel', checkFirebaseIdToken, Trade.tradeCancel);


    app.post('/lp/order', Trade.tradeInsertLP);
    app.post('/lp/cancel', Trade.tradeCancelLP);
    app.post('/lp/info', Trade.tradeStateLP);
    

     /**************************************************************************************/
    /*             account                                                                  */
    /**************************************************************************************/

    app.post('/account/insert', checkFirebaseIdToken, Account.accountInsert);
    app.get('/account/list', checkFirebaseIdToken, Account.accountList);

    app.post('/account/withdraw/insert', checkFirebaseIdToken, Account.withdrawInsert);
    app.get('/account/withdraw/confirm', checkFirebaseIdToken, Account.withdrawConfirm);
    app.get('/account/withdraw/cancel', checkFirebaseIdToken, Account.withdrawCancel);
    app.get('/account/withdraw/list', checkFirebaseIdToken, Account.withdrawList);


    /**************************************************************************************/
    /*             System            */
    /**************************************************************************************/

    /**************************************************************************************/

    function checkFirebaseIdToken(req: express.Request, res: express.Response, next: any) {

        const { idtoken } = req.headers;
        if (idtoken == undefined) {
            console.log('헤더에 idtoken 없음')
            res.status(400)
            return res.json(Util.fail_json(ERR.UID_TOKEN_EMPTY))
        }


        const decodedToken:any = Util.decodeToken(idtoken);
        if(decodedToken.uid == undefined){
            res.status(400)
            return res.json(Util.fail_json(ERR.UID_TOKEN_EMPTY))
        }

        req.headers.decodedToken = decodedToken;
        next();

        // appManager.firebase_admin.auth().verifyIdToken(idtoken)
        //     .then(function (decodedToken: any) {
        //         req.headers.decodedToken = decodedToken
        //         console.log(decodedToken);
        //         next()
        //     })
        //     .catch(function (e: any) {
        //         res.status(400)
        //         if (e.code === 'auth/id-token-expired') {
        //             return res.json(Util.fail_json(ERR.UID_TOKEN_EXPIRED))
        //         } else if (e.code === "auth/argument-error") {
        //             return res.json(Util.fail_json(ERR.WRONG_TOKEN_OR_PASSWORD))
        //         } else {
        //             return res.json(Util.fail_json(ERR.REQ_PARAMETER_WRONG))
        //         }
        //     })
    }


    /**
   * 파라메터가 제대로 넘어왔는지 체크한다.
   * @param locomotion
   * @returns {Function}
   */
    function checkReqParams(req: any, res: any, next: any) {
        var jwt_Secret = AppManager.config.server.jwt_Secret
        let token = req.headers.token
        jwt.verify(token, jwt_Secret, function (error: any, decoded: any) {

            // TODO: for test
            if (no_token_4_test || error) {
                error = undefined
                decoded = {
                    account: 'bymyself',
                    role: 255,
                    permit: 0
                }
            }

            if (error) {
                //let err_msg = '[ip:' + u.getip(req) + '] ' + error.toString() + ' token:' + token
                //u.Log2file.debug(err_msg)
                let e
                switch (error.name) {
                    case 'TokenExpiredError': e = ERR.PUBLISHER_ACCOUNT_API_ACCESS_TOKOEN_EXPIRED; break
                    default: e = ERR.PUBLISHER_ACCOUNT_API_ACCESS_TOKOEN_WRONG; break
                }
                return res.json(Util.fail_json(e))
            } else {
                const account = decoded.account || 'no_account'
                const role = decoded.role || 0
                const permit = decoded.permit || 0

                req.publisher = req.publisher || {}
                req.publisher.account = account

                switch (req.url) {
                    /**************************************************************************************/
                    /*             Auth                                                                   */
                    /**************************************************************************************/
                    case '/api/publisher/get_info':
                        break

                    /**************************************************************************************/
                    /*             cgs:user                                                               */
                    /**************************************************************************************/
                    case '/api/user/register':
                    case '/api/user/login':
                    case '/api/user/getinfo':
                    case '/api/user/logout':
                    case '/api/user/deposit':
                    case '/api/user/withdraw':
                    case '/api/user/transfergcsc':
                    case '/cgs/user/gamein':
                    case '/cgs/user/gameout':
                        if (role | Common.API_ACCESS_ROLE.ALL) {
                            break
                        } else {
                            return res.json(Util.fail_json(ERR.PUBLISHER_ACCOUNT_API_ACCESS_TOKOEN_NO_PERMIT))
                        }

                    /**************************************************************************************/
                    /*             Manager                                                                */
                    /**************************************************************************************/

                    case '/api/gm/login_manager':
                    case '/api/gm/get_manager_info':
                    case '/api/gm/create_manager':
                    case '/api/gm/update_manager_info':

                    case '/api/gm/get_managers_list':
                    case '/api/gm/get_publishers_list':
                    case '/api/gm/get_users_list':
                    case '/api/gm/get_game_global_variables':
                    case '/api/gm/update_game_global_variables':
                    case '/api/gm/get_divs_for_log':
                    case '/api/gm/get_logs_list_user_bettings':
                    case '/api/gm/get_logs_list_user_tranfers':
                    case '/api/gm/get_logs_list_user_dividens':
                    case '/api/gm/get_logs_list_user_commons':
                    case '/api/gm/get_logs_list_manager_commons':
                    case '/api/gm/update_patch_info':
                        if (role | Common.API_ACCESS_ROLE.ADMIN) {
                            break
                        } else {
                            return res.json(Util.fail_json(ERR.PUBLISHER_ACCOUNT_API_ACCESS_TOKOEN_NO_PERMIT))
                        }
                }

                next()
            }
        })

    };

    function healthCheck(req: express.Request, res: express.Response) {
        res.status(200)
        res.end()

    }
}

export { routes }