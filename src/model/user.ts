import BaseModel from './baseModel';
import UserData from '../data/userData';
import CoinApi from '../data/coin';

export default class UserModel extends BaseModel{
    public uid:string;
	 public email:string;
	 public firstName:string;
	 public lastName:string;
	 public userState:string;
	 public role:string;
	 public activeYN:string;
	 public tel:string;
	 public otp:string;
	 public language:string;
	 public referal:string;
	 public walletIdx:number;
	 public btcYN:string;
	 public ethYN:string;
	 public dotYN:string;
     public periYN:string ;
     public referalEmail:string
	
    constructor( uid:string, email:string, firstName:string, lastName:string, userState:string, role:string, activeYN:string, tel:string, otp:string, language:string, referal:string, walletIdx:number, btcYN:string, ethYN:string, dotYN:string, periYN:string, referalEmail:string ){
        super();
         this.uid = uid;
		 this.email = email;
		 this.firstName = firstName;
		 this.lastName = lastName;
		 this.userState = userState;
		 this.role = role;
		 this.activeYN = activeYN;
		 this.tel = tel;
		 this.otp = otp;
		 this.language = language;
		 this.referal = referal;
		 this.walletIdx = walletIdx;
		 this.btcYN = btcYN;
		 this.ethYN = ethYN;
		 this.dotYN = dotYN;
         this.periYN = periYN ;
         this.referalEmail = referalEmail
		
    } 

    static async insert( uid:string, email:string, firstName:string, lastName:string, role:string, tel:string, language:string, referal:string ){
        return await UserData.userInsert( uid, email, firstName, lastName, role, tel, language, referal );        
    }


    async update() {                                                
        return await UserData.userUpdate( this.uid,  this.firstName, this.lastName, this.userState, this.role, this.activeYN, this.tel, this.otp, this.language, this.referal,  this.btcYN, this.ethYN, this.dotYN, this.periYN );
    }

    static select(uid:string){
        var promise = UserData.userSelect(uid)
        return UserModel.selectFromData(promise, UserModel);
    }
    
    static selectByEmail(email:string){
        var promise = UserData.userSelectByEmail(email)
        return UserModel.selectFromData(promise, UserModel);
    }

    static getEmailByTel(tel:string){
        var promise = UserData.getEmailByTel(tel);
        return UserModel.selectFromData(promise, UserModel);
    }

    protected static applyData(data: any) {
        return new UserModel( data.uid, data.email, data.firstName, data.lastName, data.userState, data.role, data.activeYN, data.tel, data.otp, data.language, data.referal, data.walletIdx, data.btcYN, data.ethYN, data.dotYN, data.periYN, data.referalEmail );
    }

    static async list(searchKey:string, searchValue:string, limit:number, offset:number) {
        return await UserData.list(searchKey, searchValue, limit, offset);
    }

    static getWalletAddress(coin:string, walletIdx:number){
        return CoinApi.getWalletAddress(coin, walletIdx);
    }

    static getWalletBalance(coin:string, walletIdx:number){
        return CoinApi.getWalletBalance(coin, walletIdx);
    }

    static getAccountAddress(coin:string, walletIdx:number){
        return CoinApi.getAccountAddress(coin, walletIdx);
    }

    static getAccountBalance(coin:string, walletIdx:number){
        return CoinApi.getAccountBalance(coin, walletIdx);
    }

    static getWalletSend(coin:string, walletIdx:number, to:string, value:string, gasPrice:number){
        return CoinApi.getWalletSend(coin, walletIdx, to, value, gasPrice.toString(), "");
    }

    
    
    static async kycApply( uid:string, birthday:string, sex:string, address1:string, address2:string, city:string, country:string, certImg1:string, certImg2:string ){
        return await UserData.kycApply(uid, birthday, sex, address1, address2, city, country, certImg1, certImg2);        
    }

    static async kycConfrim( uid:string){        
        return await UserData.kycConfirm(uid, "1");
    }

    static async kycRefuse( uid:string){        
        return await UserData.kycConfirm(uid, "2");
    }

    static async kycSelect(uid:string){
        return await UserData.kycSelect(uid);
    }

    static async kycList(searchKey:string, searchValue:string, limit:number, offset:number){
        return await UserData.kycList(searchKey, searchValue, limit, offset);
    }

    static async getBalance(uid:string, coin:string){
        return await UserData.getBalance(uid, coin);
    }    

    static async claimInsert( uid:string, tradeIdx:number, subject:string, message:string, file:string ){
        return await UserData.claimInsert(uid, tradeIdx, subject, message, file);
    }        

    static async claimSelect(claimIdx:number){
        return await UserData.claimSelect(claimIdx);
    }

    static async claimList(startDate:string, endDate:string, searchKey:string, searchValue:string, limit:number, offset:number){
        return await UserData.claimList(startDate, endDate, searchKey, searchValue, limit, offset);
    }

    static async messageInsert( claimIdx:number, uid:string, messsage:string, file:string ){
        return await UserData.messageInsert(claimIdx, uid, messsage, file);
    }
        
    static async messageRead( idx:number, uid:string ){        
        return await UserData.messageRead(idx, uid);
    }

    static async messageList(claimIdx:number){
        return await UserData.messageList(claimIdx);
    }

    static async recieveInfoList(uid:string){
        return await UserData.recieveInfoList(uid);
    }

    static async recieveInfoUpdate(uid:string, coin:string, bank:string, account:string, owner:string, coinAddress:string, swift:string, branchCode:string, branchAddress:string){
        return await UserData.recieveInfoUpdate(uid, coin, bank, account, owner, coinAddress, swift, branchCode, branchAddress);
    }
  

}