
import Util from '../common/util'
import BasicModel from '../model/basic';
import BaseControl from './base';
import { ERR } from '../protocol/ErrorCodes';
import * as express from 'express';
import BasicData from '../data/basicData';



export default class Basic extends BaseControl {

    static symbolInsert(req: express.Request, res: express.Response) {        
        var { symbol, priceUnit, minAmount1, minAmount2, symbolType, tradeFee } = req.body;
        let promise = BasicModel.symbolInsert(symbol, priceUnit, minAmount1, minAmount2, symbolType, tradeFee);
        Basic.execute(res, promise);
    }

    static symbolUpdate(req: express.Request, res: express.Response) {        
        var { symbol, priceUnit, minAmount1, minAmount2, symbolType, tradeFee } = req.body;
        let promise = BasicModel.symbolUpdate(symbol, priceUnit, minAmount1, minAmount2, symbolType, tradeFee);
        Basic.execute(res, promise);
    }


    static symbolSelect(req: express.Request, res: express.Response) {        
        var { symbol } = req.params;
        let promise = BasicModel.symbolSelect(Util.String(symbol));
        Basic.select(res, promise);
    }


    static symbolList(req: express.Request, res: express.Response) {                
        let promise = BasicModel.symbolList();
        Basic.select(res, promise);
    }


    static currencyInsert(req: express.Request, res: express.Response) {        
        var { coin, coinName, coinType, transactionFee } = req.body;
        let promise = BasicModel.currencyInsert(coin, coinName, coinType, transactionFee);
        Basic.execute(res, promise);
    }


    static currencyUpdate(req: express.Request, res: express.Response) {        
        var { coin, coinName, coinType, transactionFee } = req.body;
        let promise = BasicModel.currencyUpdate(coin, coinName, coinType, transactionFee);
        Basic.execute(res, promise);
    }


    static currencySelect(req: express.Request, res: express.Response) {        
        var { coin } = req.params;
        let promise = BasicModel.currencySelect(coin);
        Basic.select(res, promise);
    }



    static currencyList(req: express.Request, res: express.Response) {                
        let promise = BasicModel.currencyList();
        Basic.select(res, promise);
    }



    static boardInsert(req: express.Request, res: express.Response) {        
        var { boardCode, boardName } = req.body;
        let promise = BasicModel.boardInsert(boardCode, boardName);
        Basic.execute(res, promise);
    }

    static boardUpdate(req: express.Request, res: express.Response) {        
        var { boardCode, boardName } = req.body;
        let promise = BasicModel.boardUpdate(boardCode, boardName);
        Basic.execute(res, promise);
    }

    
    static boardList(req: express.Request, res: express.Response) {                
        let promise = BasicModel.boardList();
        Basic.select(res, promise);
    }


    
    static articleInsert(req: express.Request, res: express.Response) {        
        var uid = super.getUID(req);
        var { boardCode } = req.params;
        var { subject, content } = req.body;
        let promise = BasicModel.articleInsert(boardCode, uid, subject, content);
        Basic.execute(res, promise);
    }


    
    static articleUpdate(req: express.Request, res: express.Response) {        
        var { articleIdx, subject, content } = req.body;
        let promise = BasicModel.articleUpdate(articleIdx, subject, content);
        Basic.execute(res, promise);
    }


    static articleSelect(req: express.Request, res: express.Response) {        
        var { articleIdx } = req.params;        
        let promise = BasicModel.articleSelect(Util.Number(articleIdx));
        Basic.select(res, promise);
    }

    
    static articleList(req: express.Request, res: express.Response) {   
        var { boardCode }= req.params;     
        var { searchKey, searchValue, limit, offset } = req.query;
        let promise = BasicModel.articleList(boardCode, Util.String(searchKey), Util.String(searchValue), Util.Number(limit), Util.Number(offset));
        Basic.select(res, promise);
    }


    static requireBank(req: express.Request, res: express.Response) {        
        var {symbol, orderSide} = req.query;
        let promise = BasicData.requireBank(Util.String(symbol), Util.String(orderSide));
        super.select(res, promise);

    }






}



