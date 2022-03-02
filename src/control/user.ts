import Util from '../common/util'
import UserModel from '../model/user';
import { ERR } from '../protocol/ErrorCodes';
import * as express from 'express';
import BaseControl from './base'


export default class User extends BaseControl {


    static async userInsert(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var { email, firstName, lastName, role, tel, language, referal, referalEmail } = req.body;


        if (referal == undefined || referal.trim() == "") {
            try{
                var referalUser: any = await UserModel.selectByEmail(Util.String(referalEmail));
                if (referalUser.uid != undefined) {
                    referal = referalUser.uid;
                }
            }catch(e){
                if(referal == undefined){
                    referal = "";
                }
            }
        }
        let promise = UserModel.insert(uid, email, firstName, lastName, role, tel, language, referal);
        super.execute(res, promise);
    }

    static async userUpdate(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var { firstName, lastName, userState, role, activeYN, tel, otp, language, referal, referalEmail, btcYN, ethYN, dotYN, periYN } = req.body;



        UserModel.select(uid).then(function (user: any) {
            user.firstName = User.setUndefinedValue(firstName, user.firstName);
            user.lastName = User.setUndefinedValue(lastName, user.lastName);
            user.userState = User.setUndefinedValue(userState, user.userState);
            user.role = User.setUndefinedValue(role, user.role);
            user.activeYN = User.setUndefinedValue(activeYN, user.activeYN);
            user.tel = User.setUndefinedValue(tel, user.tel);
            user.otp = User.setUndefinedValue(otp, user.otp);
            user.language = User.setUndefinedValue(language, user.language);
            user.referal = User.setUndefinedValue(referal, user.referal);
            user.btcYN = User.setUndefinedValue(btcYN, user.btcYN);
            user.ethYN = User.setUndefinedValue(ethYN, user.ethYN);
            user.dotYN = User.setUndefinedValue(dotYN, user.dotYN);
            user.periYN = User.setUndefinedValue(periYN, user.periYN);


            let promise = user.update();
            User.execute(res, promise);
        }, function (err) {
            console.error(err)
            return Util.response_err(res, 400, ERR.FAIL, err)
        })

    }

    
    static async userUpdateAdmin(req: express.Request, res: express.Response) {        
        var {uid, firstName, lastName, userState, role, activeYN, tel, otp, language, referal, referalEmail, btcYN, ethYN, dotYN, periYN } = req.body;



        UserModel.select(uid).then(function (user: any) {
            user.firstName = User.setUndefinedValue(firstName, user.firstName);
            user.lastName = User.setUndefinedValue(lastName, user.lastName);
            user.userState = User.setUndefinedValue(userState, user.userState);
            user.role = User.setUndefinedValue(role, user.role);
            user.activeYN = User.setUndefinedValue(activeYN, user.activeYN);
            user.tel = User.setUndefinedValue(tel, user.tel);
            user.otp = User.setUndefinedValue(otp, user.otp);
            user.language = User.setUndefinedValue(language, user.language);            
            user.btcYN = User.setUndefinedValue(btcYN, user.btcYN);
            user.ethYN = User.setUndefinedValue(ethYN, user.ethYN);
            user.dotYN = User.setUndefinedValue(dotYN, user.dotYN);
            user.periYN = User.setUndefinedValue(periYN, user.periYN);


            let promise = user.update();
            User.execute(res, promise);
        }, function (err) {
            console.error(err)
            return Util.response_err(res, 400, ERR.FAIL, err)
        })

    }

    static userList(req: express.Request, res: express.Response) {                
        var { searchKey, searchValue, limit, offset } = req.query;
        let promise = UserModel.list(Util.String(searchKey), Util.String(searchValue), Util.Number(limit), Util.Number(offset));
        super.select(res, promise);

    }

    static kycList(req: express.Request, res: express.Response) {                
        var { searchKey, searchValue, limit, offset } = req.query;
        let promise = UserModel.kycList(Util.String(searchKey), Util.String(searchValue), Util.Number(limit), Util.Number(offset));
        super.select(res, promise);

    }

    static userBalance(req: express.Request, res: express.Response){
        var uid = super.getUID(req);
        var {coin} = req.params;
        let promise = UserModel.getBalance(uid, coin);


        try {                      
            promise.then(function(result){    
                res.json({
                    ecode: 0,
                    message: {balance : result.balance}
                });
            }, function(e){
                console.error(e)
                res.json({
                    ecode: 0,
                    message: {balance : 0}
                });
            })
            
        } catch (e) {
            console.error(e)
            res.json({
                ecode: 0,
                message: {balance : 0}
            });
        }
    }



    static userSelect(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        let promise = UserModel.select(Util.String(uid));
        super.select(res, promise);
    }

    static userSelectAdmin(req: express.Request, res: express.Response) {
        var {uid} = req.params;
        let promise = UserModel.select(Util.String(uid));
        super.select(res, promise);
    }


    static userSelectEmail(req: express.Request, res: express.Response) {
        var { email } = req.params;
        let promise = UserModel.selectByEmail(unescape(Util.String(email)));
        super.select(res, promise);
    }

    static userGetMailByTel(req: express.Request, res: express.Response) {
        var { tel } = req.query;
        let promise = UserModel.getEmailByTel(unescape(Util.String(tel)));
        super.select(res, promise);
    }

    static userCheckEmail(req: express.Request, res: express.Response) {
        var { email } = req.params;
        UserModel.selectByEmail(unescape(Util.String(email))).then(
            function (user: any) {
                if (user.uid == undefined) {
                    res.json({
                        ecode: 0,
                        message: JSON.stringify({ count: 0 })
                    });
                } else {
                    res.json({
                        ecode: 0,
                        message: JSON.stringify({ count: 1 })
                    });
                }
            }, function (err) {
                if (err.message.match(/no item/).length > 0) {
                    res.json({
                        ecode: 0,
                        message: JSON.stringify({ count: 0 })
                    });
                } else {
                    console.error(err)
                    return Util.response_err(res, 400, ERR.FAIL, err)
                }
            }
        );
    }

    
    static userCheckEmailTel(req: express.Request, res: express.Response) {
        var { email, tel } = req.query;
        UserModel.selectByEmail(unescape(Util.String(email))).then(
            function (user: any) {
                if (user.uid == undefined || tel == undefined || user.tel != tel) {
                    res.json({
                        ecode: 0,
                        message: JSON.stringify({ count: 0 })
                    });
                } else {
                    res.json({
                        ecode: 0,
                        message: JSON.stringify({ count: 1 })
                    });
                }
            }, function (err) {
                if (err.message.match(/no item/).length > 0) {
                    res.json({
                        ecode: 0,
                        message: JSON.stringify({ count: 0 })
                    });
                } else {
                    console.error(err)
                    return Util.response_err(res, 400, ERR.FAIL, err)
                }
            }
        );
    }


    static kycSelect(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        let promise = UserModel.kycSelect(Util.String(uid));
        super.select(res, promise);
    }


    
    static kycSelectAdmin(req: express.Request, res: express.Response) {
        var {uid} = req.params;
        let promise = UserModel.kycSelect(Util.String(uid));
        super.select(res, promise);
    }

    static kycConfirm(req: express.Request, res: express.Response) {
        var {uid} = req.params;
        let promise = UserModel.kycConfrim(Util.String(uid));
        super.execute(res, promise);
    }



    static kycRefuse(req: express.Request, res: express.Response) {
        var {uid} = req.params;
        let promise = UserModel.kycRefuse(Util.String(uid));
        super.execute(res, promise);
    }






    static kycApply(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var { birthDay, sex, address1, address2, city, country } = req.body;
        var files: any = req.files;
        var certImg1 = "";
        var certImg2 = "";

        if (files.certImg1 != undefined) {
            certImg1 = Util.String(files.certImg1[0].filename);
        }
        if (files.certImg2 != undefined) {
            certImg2 = Util.String(files.certImg2[0].filename);
        }

        let promise = UserModel.kycApply(uid, birthDay, sex, address1, address2, city, country, certImg1, certImg2);
        User.execute(res, promise);
    }

    
    static getWalletAddress(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var {coin} = req.params;
        UserModel.select(uid).then(
            (user:any)=>{
                let promise = UserModel.getWalletAddress(coin, user.walletIdx)
                User.select(res, promise);
            }
            , (error)=>{
                console.error(error)
                return Util.response_err(res, 400, ERR.FAIL, error);    
            }
        );
    }

    static getAccountAddress(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var {coin} = req.params;
        UserModel.select(uid).then(
            (user:any)=>{
                let promise = UserModel.getAccountAddress(coin, user.walletIdx)
                User.select(res, promise);
            }
            , (error)=>{
                console.error(error)
                return Util.response_err(res, 400, ERR.FAIL, error);    
            }
        );
    }

    static claimInsert(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var {tradeIdx, subject, message} = req.body;
        var objFile: any = req.file;        

        var file = "";


        if (objFile != undefined) {
            file = Util.String(objFile.filename);
        }

        let promise = UserModel.claimInsert(uid, tradeIdx, subject, message, file);
        User.execute(res, promise);
    }
    

    static claimSelect(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var {claimIdx} = req.params;

        let promise = UserModel.claimSelect( Util.Number(claimIdx));
        super.select(res, promise);
    }

    static claimList(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var {startDate, endDate, searchKey, searchValue, limit, offset} = req.query;

        let promise = UserModel.claimList(Util.String(startDate), Util.String(endDate), Util.String(searchKey), Util.String(searchValue), Util.Number(limit), Util.Number(offset));
        super.select(res, promise);
    }

    static messageInsert(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var {claimIdx, message} = req.body;
        var objFile: any = req.file;        

        var file = "";


        if (objFile != undefined) {
            file = Util.String(objFile.filename);
        }

        let promise = UserModel.messageInsert(claimIdx, uid, message, file);
        User.execute(res, promise);
    }

    static messageRead(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var {idx} = req.params;

        let promise = UserModel.messageRead( Util.Number(idx), uid);
        super.select(res, promise);
    }

        

    static messageList(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);
        var {claimIdx} = req.params;
        let promise = UserModel.messageList( Util.Number(claimIdx));
        super.select(res, promise);
    }


    static recieveInfoList(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);        
        let promise = UserModel.recieveInfoList(uid);
        super.select(res, promise);
    }

    static recieveInfoUpdate(req: express.Request, res: express.Response) {
        var uid = super.getUID(req);        
        var {coin, bank, account, owner, coinAddress, swift, branchCode, branchAddress} = req.body;        
        let promise = UserModel.recieveInfoUpdate(uid, coin, bank, account, owner, coinAddress, swift, branchCode, branchAddress);
        super.execute(res, promise);
    }


}