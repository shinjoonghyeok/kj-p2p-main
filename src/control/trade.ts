
import Util from '../common/util'
import TradeModel from '../model/trade';
import BaseControl from './base';
import { ERR } from '../protocol/ErrorCodes';
import * as express from 'express';



export default class Trade extends BaseControl {


    static tradeInsert(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);
        var { symbol, orderSide, price, amount, bank, account, owner, coinAddress, swift, branchCode, branchAddress } = req.body;

        if(swift == undefined){
            swift = "";
        }

        if(branchCode == undefined){
            branchCode = "";
        }

        if(branchAddress == undefined){
            branchAddress = "";
        }

        let promise = TradeModel.insert(uid, symbol, orderSide, price, amount, bank, account, owner, coinAddress, swift, branchCode, branchAddress );
        super.execute(res, promise);
    }

    // static tradeUpdate(req: express.Request, res: express.Response) {        
    //     var { tradeIdx, uidMaker, symbol, orderSide, amount1, amount2, tradeState, makerState, orderAt, depositConfirm, confirmAt, bank, account, owner, depositAt, sender, coinAddress, comment } = req.body;
    //     var trade = new TradeModel(tradeIdx, uidMaker, symbol, orderSide, amount1, amount2, tradeState, makerState, orderAt, depositConfirm, confirmAt, bank, account, owner, depositAt, sender, coinAddress, comment);
    //     let promise = trade.update();
    //     super.execute(res, promise);
    // }


    static tradeSelect(req: express.Request, res: express.Response) {        
        var { tradeIdx } = req.params;
        let promise = TradeModel.select(Util.Number(tradeIdx));
        super.select(res, promise);
    }


    static tradeList(req: express.Request, res: express.Response) {                
        var { startDate, endDate, searchKey, searchValue, limit, offset } = req.query;
        let promise = TradeModel.list(Util.String(startDate), Util.String(endDate),Util.String(searchKey), Util.String(searchValue), Util.Number(limit), Util.Number(offset));
        super.select(res, promise);

    }


    static async tradeOpenList(req: express.Request, res: express.Response){
        var { symbol, orderSide, limit, offset } = req.query;
        let promise = TradeModel.tradeOpenList(Util.String(symbol), Util.String(orderSide), Util.Number(limit), Util.Number(offset));
        super.select(res, promise);
    }

    static tradeDepositList(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);        
        let promise = TradeModel.tradeDepositList(uid);
        super.select(res, promise);
    }

    static orderInsert(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);
        var { tradeIdx, bank, account, owner, coinAddress, swift, branchCode, branchAddress  } = req.body;

        
        if(swift == undefined){
            swift = "";
        }

        if(branchCode == undefined){
            branchCode = "";
        }

        if(branchAddress == undefined){
            branchAddress = "";
        }


        let promise = TradeModel.orderInsert(tradeIdx, uid, bank, account, owner, coinAddress, swift, branchCode, branchAddress );
        super.execute(res, promise);
    }


    static tradeBankDepsit(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);    
        var { tradeIdx, sender, depositAt  } = req.body;   
        let promise = TradeModel.tradeBankDepsit(tradeIdx, uid, sender, depositAt);
        super.execute(res, promise);
    }


    static tradeBankDepsitConfirm(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);    
        var { tradeIdx  } = req.body;       
		let promise = TradeModel.tradeBankDepsitConfirm(tradeIdx, uid);
        super.execute(res, promise);
    }

    static tradeConfirm(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);    
        var { tradeIdx  } = req.body;       
		let promise = TradeModel.tradeConfirm(tradeIdx, uid);
        super.execute(res, promise);
    }

    static tradeCancel(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);    
        var { tradeIdx  } = req.body;       
		let promise = TradeModel.tradeCancel(tradeIdx, uid);
        super.execute(res, promise);
    }

    static tradeListComplete(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);    
        var { limit, offset  } = req.query;       
		let promise = TradeModel.tradeListComplete(uid, Util.Number(limit), Util.Number(offset));
        super.select(res, promise);
    }

    static tradeListCancel(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);    
        var { limit, offset  } = req.query;       
		let promise = TradeModel.tradeListCancel(uid, Util.Number(limit), Util.Number(offset));
        super.select(res, promise);
    }


    static tradeListRecent(req: express.Request, res: express.Response) {                
        var { symbol, limit } = req.query;       
		let promise = TradeModel.tradeListRecent(Util.String(symbol), Util.Number(limit));
        super.select(res, promise);
    }


    static recieveInfo(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);    
        var {symbol, orderSide} = req.query;
        let promise = TradeModel.recieveInfo(uid, Util.String(symbol), Util.String(orderSide));
        super.select(res, promise);        ;
    }


    static tradeInsertLP(req: express.Request, res: express.Response) {        
        
        var {  uid, symbol, orderSide, price, amount } = req.body;
        let promise = TradeModel.insertLP(uid, symbol, orderSide, price, amount);
        super.select(res, promise);
    }

    static tradeStateLP(req: express.Request, res: express.Response) {        
        
        var {  uid, orderID } = req.body;
        let promise = TradeModel.stateLP(uid, orderID);
        super.select(res, promise);
    }

    static tradeCancelLP(req: express.Request, res: express.Response) {        
        
        var {  uid, orderID } = req.body;        
		let promise = TradeModel.tradeCancel(orderID, uid);
        super.execute(res, promise);
    }

}



