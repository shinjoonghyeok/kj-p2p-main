
import Util from '../common/util'
import AccountModel from '../model/account';
import BaseControl from './base';
import { ERR } from '../protocol/ErrorCodes';
import * as express from 'express';



export default class Trade extends BaseControl {


    static accountInsert(req: express.Request, res: express.Response) {        
        //var uid = super.getUID(req);
        var { coin, uid, amount, txHash } = req.body;
        let promise = AccountModel.insert(coin, uid, amount, txHash);
        super.execute(res, promise);
    }


    static accountList(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);    
        var { startDate, endDate, searchKey, searchValue,   limit, offset  } = req.query;       
		let promise = AccountModel.list(Util.String(startDate), Util.String(endDate), Util.String(searchKey), Util.String(searchValue), Util.Number(limit), Util.Number(offset));
        super.select(res, promise);
    }


    static withdrawInsert(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);    
        var { amount, coin, withdrawAddress  } = req.body;
        let promise = AccountModel.withdrawInsert(amount, coin, withdrawAddress, uid);
        super.execute(res, promise);
    }
    
    static withdrawConfirm(req: express.Request, res: express.Response) {                  
        var { withdrawIdx  } = req.query;
        let promise = AccountModel.withdrawConfirm(Util.Number(withdrawIdx));
        super.execute(res, promise);
    }
    
    static withdrawCancel(req: express.Request, res: express.Response) {                  
        var { withdrawIdx  } = req.query;
        let promise = AccountModel.withdrawCancel(Util.Number(withdrawIdx));
        super.execute(res, promise);
    }
    
    static withdrawList(req: express.Request, res: express.Response) {        
        var { startDate, endDate, searchKey, searchValue, limit, offset  } = req.query;       
		let promise = AccountModel.withdrawList(Util.String(startDate), Util.String(endDate), Util.String(searchKey), Util.String(searchValue), Util.Number(limit), Util.Number(offset));
        super.select(res, promise);
    }


    static checkDeposit(){
        
    }
}



