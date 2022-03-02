import BaseModel from './baseModel';
import AccountData from '../data/accountData'

export default class AccountModel extends BaseModel{
     
	
    constructor(){
        super();    	
    } 

    static async insert(coin:string, uid:string, amount:number, txHash:string){        
        return await AccountData.accounthistoryInsert(coin, uid, amount, "D", txHash, 0);
    }


    static async list(startDate:string, endDate:string, searchKey:string, searchValue:string, limit:number, offset:number){
        return await AccountData.accounthistoryList(startDate, endDate, searchKey, searchValue, limit, offset);
    }


    
    static async withdrawInsert( amount:number, coin:string, withdrawAddress:string, uid:string ){
        return await AccountData.withdrawInsert(amount, coin, withdrawAddress, uid);
    }
        
    static async withdrawConfirm( withdrawIdx:number ){        
        return await AccountData.withdrawConfirm(withdrawIdx);
    }

    static async withdrawCancel( withdrawIdx:number){        
        return await AccountData.withdrawCancel(withdrawIdx);
    }

    static async withdrawSendingList(){
        return await AccountData.withdrawSendingList();
    }

    static async withdrawList(startDate:string, endDate:string, searchKey:string, searchValue:string, limit:number, offset:number){
        return await AccountData.withdrawList(startDate, endDate, searchKey, searchValue, limit, offset);
    }
}