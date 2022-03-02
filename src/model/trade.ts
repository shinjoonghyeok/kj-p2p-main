
import BaseModel from './baseModel';
import TradeData from '../data/tradeData'
import Trade from '../control/trade';

export default class TradeModel extends BaseModel{
     public tradeIdx:number;
	 public uidMaker:string;
	 public symbol:string;
	 public orderSide:string;
	 public price:number;
	 public amount:number;
	 public tradeState:string;
	 public makerState:string;
	 public orderAt:number;
	 public depositConfirm:string;
	 public confirmAt:number;
	 public bank:string;
	 public account:string;
	 public owner:string;
	 public depositAt:number;
	 public sender:string;
	 public coinAddress:string;
	 public comment:string ;
	
    constructor( tradeIdx:number, uidMaker:string, symbol:string, orderSide:string, price:number, amount:number, tradeState:string, makerState:string, orderAt:number, depositConfirm:string, confirmAt:number, bank:string, account:string, owner:string, depositAt:number, sender:string, coinAddress:string, comment:string ){
        super();
         this.tradeIdx = tradeIdx;
		 this.uidMaker = uidMaker;
		 this.symbol = symbol;
		 this.orderSide = orderSide;
		 this.price = price;
		 this.amount = amount;
		 this.tradeState = tradeState;
		 this.makerState = makerState;
		 this.orderAt = orderAt;
		 this.depositConfirm = depositConfirm;
		 this.confirmAt = confirmAt;
		 this.bank = bank;
		 this.account = account;
		 this.owner = owner;
		 this.depositAt = depositAt;
		 this.sender = sender;
		 this.coinAddress = coinAddress;
		 this.comment = comment ;
		
	} 
	
	static async orderInsert( tradeIdx:number, uidTaker:string, bank:string, account:string, owner:string, coinAddress:string, swift:string, branchCode:string, branchAddress:string ){        
        return await TradeData.orderInsert( tradeIdx, uidTaker, bank, account, owner, coinAddress, swift, branchCode, branchAddress );
    }

    static async insert( uidMaker:string, symbol:string, orderSide:string, amount1:number, amount2:number, bank:string, account:string, owner:string, coinAddress:string, swift:string, branchCode:string, branchAddress:string ){        
        return await TradeData.tradeInsert( uidMaker, symbol, orderSide, amount1, amount2, bank, account, owner, coinAddress, swift, branchCode, branchAddress );
	}
	
	static async insertLP( uidMaker:string, symbol:string, orderSide:string, amount1:number, amount2:number){        
        return await TradeData.tradeInsertLP( uidMaker, symbol, orderSide, amount1, amount2);
	}
	
	static async stateLP( uidMaker:string, orderID:number){        
        return await TradeData.tradeStateLP(uidMaker, orderID);
    }

    // async update() {
    //     return await TradeData.tradeUpdate( this.tradeIdx, this.uidMaker, this.symbol, this.orderSide, this.price, this.amount, this.tradeState, this.makerState, this.orderAt, this.depositConfirm, this.confirmAt, this.bank, this.account, this.owner, this.depositAt, this.sender, this.coinAddress, this.comment );
    // }

    static select(tradeIdx:number){
        var promise = TradeData.tradeSelect(tradeIdx)
        return TradeModel.selectFromData(promise, TradeModel);
    }

    protected static applyData(data: any) {
        return new TradeModel( data.tradeIdx, data.uidMaker, data.symbol, data.orderSide, data.amount1, data.amount2, data.tradeState, data.makerState, data.orderAt, data.depositConfirm, data.confirmAt, data.bank, data.account, data.owner, data.depositAt, data.sender, data.coinAddress, data.comment );
    }

    static async list(startDate:string, endDate:string, searchKey:string, searchValue:string, limit:number, offset:number){
        return await TradeData.tradeList(startDate, endDate, searchKey, searchValue, limit, offset);
	}    
	
	static async tradeOpenList(symbol:string, orderSide:string, limit:number, offset:number){
        return await TradeData.tradeOpenList(symbol, orderSide, limit, offset);
	}
	
	static async tradeDepositList(uid:string){
		return await TradeData.tradeDepositList(uid);
	}


	static async tradeBankDepsit(tradeIdx:number, uid:string, sender:string, depositAt:string){
		return await TradeData.tradeBankDepsit(tradeIdx, uid, sender, depositAt);
    }

    static async tradeBankDepsitConfirm(tradeIdx:number, uid:string){
		return await TradeData.tradeBankDepsitConfirm(tradeIdx, uid);       
    }


    static async tradeConfirm(tradeIdx:number, uid:string){
		return await TradeData.tradeConfirm(tradeIdx, uid);       		
    }

    static async tradeCancel(tradeIdx:number, uid:string){
		return await TradeData.tradeCancel(tradeIdx, uid);
	}
	
	static async tradeListComplete(uid:string, limit:number, offset:number){
		return await TradeData.tradeListComplete(uid, limit, offset);
	}
	
	static async tradeListCancel(uid:string, limit:number, offset:number){
		return await TradeData.tradeListCancel(uid, limit, offset);
	}


	static async tradeListRecent(symbol:string, limit:number){
		return await TradeData.tradeListRecent(symbol, limit);
	}
	
	static async recieveInfo(uid:string, symbol:string, orderSide:string){
		return await TradeData.recieveInfo(uid, symbol, orderSide);
	}
}