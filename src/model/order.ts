import BaseModel from './baseModel';
import TradeData from '../data/tradeData'

export default class OrderModel extends BaseModel{
     public orderIdx:number;
	 public tradeIdx:number;
	 public uidTaker:string;
	 public takerState:string;
	 public orderAt:number;
	 public depositConfirm:string;
	 public confirmAt:number;
	 public bank:string;
	 public account:string;
	 public owner:string;
	 public depositAt:number;
	 public sender:string;
	 public coinAddress:string ;
	
    constructor( orderIdx:number, tradeIdx:number, uidTaker:string, takerState:string, orderAt:number, depositConfirm:string, confirmAt:number, bank:string, account:string, owner:string, depositAt:number, sender:string, coinAddress:string ){
        super();
         this.orderIdx = orderIdx;
		 this.tradeIdx = tradeIdx;
		 this.uidTaker = uidTaker;
		 this.takerState = takerState;
		 this.orderAt = orderAt;
		 this.depositConfirm = depositConfirm;
		 this.confirmAt = confirmAt;
		 this.bank = bank;
		 this.account = account;
		 this.owner = owner;
		 this.depositAt = depositAt;
		 this.sender = sender;
		 this.coinAddress = coinAddress ;
		
    } 

    static async insert( tradeIdx:number, uidTaker:string, bank:string, account:string, owner:string, coinAddress:string ){        
        return await TradeData.orderInsert( tradeIdx, uidTaker, bank, account, owner, coinAddress );
    }


    protected static applyData(data: any) {
        return new OrderModel( data.orderIdx, data.tradeIdx, data.uidTaker, data.takerState, data.orderAt, data.depositConfirm, data.confirmAt, data.bank, data.account, data.owner, data.depositAt, data.sender, data.coinAddress );
    }

}