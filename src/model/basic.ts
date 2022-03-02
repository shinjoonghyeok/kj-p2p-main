import BaseModel from './baseModel';
import BasicData from '../data/basicData';

export default class BasicModel extends BaseModel{

	
    constructor(){
        super();
    } 

    static async symbolInsert( symbol:string, priceUnit:number, minAmount1:number, minAmount2:number, symbolType:string, tradeFee:number ){  
        return await BasicData.symbolInsert(symbol, priceUnit, minAmount1, minAmount2, symbolType, tradeFee);        
    }
        
    static async symbolUpdate( symbol:string, priceUnit:number, minAmount1:number, minAmount2:number, symbolType:string, tradeFee:number ){        
        return await BasicData.symbolUpdate(symbol, priceUnit, minAmount1, minAmount2, symbolType, tradeFee);        
    }

    static async symbolSelect(symbol:string){
        return await BasicData.symbolSelect(symbol);
    }

    static async symbolList(){
        return await BasicData.symbolList();
    }

    static async currencyInsert( coin:string, coinName:string, coinType:string, transactionFee:number ){
        return await BasicData.currencyInsert(coin, coinName, coinType, transactionFee);
    }
        
    static async currencyUpdate( coin:string, coinName:string, coinType:string, transactionFee:number ){        
        return await BasicData.currencyUpdate(coin, coinName, coinType, transactionFee);
    }

    static async currencySelect(coin:string){
        return await BasicData.currencySelect(coin);
    }

    static async currencyList(){
        return await BasicData.currencyList();
    }



    static async boardInsert( boardCode:string, boardName:string ){
        return await BasicData.boardInsert(boardCode, boardName);
    }
        
    static async boardUpdate( boardCode:string, boardName:string ){        
        return await BasicData.boardUpdate(boardCode, boardName);
    }

    static async boardList(){
        return await BasicData.boardList();
    }

    static async articleInsert( boardCode:string, writer:string, subject:string, content:string ){
        return await BasicData.articleInsert(boardCode, writer, subject, content);
    }
        
    static async articleUpdate( articleIdx:number, subject:string, content:string){        
        return await BasicData.articleUpdate(articleIdx, subject, content);
    }

    static async articleSelect(articleIdx:number){
        return await BasicData.articleSelect(articleIdx);
    }

    static async articleList( boardCode:string, searchKey:string, searchValue:string, limit:number, offset:number){
        return await BasicData.articleList(boardCode, searchKey, searchValue, limit, offset);
    }

}