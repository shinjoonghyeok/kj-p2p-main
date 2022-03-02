import DB from '../common/dbConn';
import { start } from 'repl';

export default class ManagerData{

    
    static async userInsert( uid:string, email:string, firstName:string, lastName:string, role:string, tel:string, language:string, referal:string){
        var sql = "INSERT into `tbUser` ( `uid` , `email` , `firstName` , `lastName` , `role` , `tel`, `language` , `referal` , `updateAt` , `registAt` ) values ( ?, ?, ?, ?, ?,  ?, ?, ?, now(), now() );";
        return await DB.execute('p2p', sql, [ uid, email, firstName, lastName, role, tel, language, referal]);
    }
        
    static async userUpdate( uid:string, firstName:string, lastName:string, userState:string, role:string, activeYN:string, tel:string, otp:string, language:string, referal:string, btcYN:string, ethYN:string, dotYN:string, periYN:string ){        
        var sql = "UPDATE `tbUser` set `firstName` = ?, `lastName` = ?, `userState` = ?, `role` = ?, `activeYN` = ?, `tel` = ?, `otp` = ?, `language` = ?, `referal` = ?, `updateAt` = now(), `btcYN` = ?, `ethYN` = ?, `dotYN` = ?, `periYN` = ? where `uid` = ?;";
        return await DB.execute('p2p', sql, [firstName, lastName, userState, role, activeYN, tel, otp, language, referal, btcYN, ethYN, dotYN, periYN, uid]);
    }

    static async userSelect(uid:string){
        var sql = `select U.uid, U.email, U.firstName, U.lastName, U.userState, U.role, U.activeYN, U.tel, U.otp, U.language, U.referal, U.updateAt, U.registAt, U.walletIdx, U.btcYN, U.ethYN, U.dotYN, U.periYN, R.email as referalEmail 
        from 
            tbUser U
            left outer join
            tbUser R
            on U.referal = R.uid
        
        where U.uid = ?`;
        return await DB.select('p2p', sql, uid);
    }

    static async userSelectByEmail(email:string){
        var sql = `select U.uid, U.email, U.firstName, U.lastName, U.userState, U.role, U.activeYN, U.tel, U.otp, U.language, U.referal, U.updateAt, U.registAt, U.walletIdx, U.btcYN, U.ethYN, U.dotYN, U.periYN, R.email as referalEmail 
        from 
            tbUser U
            left outer join
            tbUser R
            on U.referal = R.uid
        
        where U.email = ?`;
        return await DB.select('p2p', sql, email);
    }

    static async getEmailByTel(tel:string){
        var sql = `select email from tbUser where tel = ?`;
        return DB.select('p2p', sql, tel);
    }

    static async list(searchKey:string, searchValue:string, limit:number, offset:number){
        var sql = `call spUserList(?, ?, ?, ?)`;
        return await DB.listCountSP('p2p', sql, [searchKey, searchValue, limit, offset]);
    }


    static async kycApply( uid:string, birthday:string, sex:string, address1:string, address2:string, city:string, country:string, certImg1:string, certImg2:string ){
        var sql = "call spKYCApply(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return await DB.execute('p2p', sql, [ uid, birthday, sex, address1, address2, city, country, certImg1, certImg2]);
    }
        
    static async kycConfirm( uid:string, confirmState:string ){        
        var sql = "call spKYCConfirm(?, ?)";
        return await DB.execute('p2p', sql, [ uid, confirmState]);
    }

    static async kycSelect(uid:string){
        var sql = "select uid, birthday, sex, address1, address2, city, country, certImg1, certImg2, confirmState, confirmAt from tbKYC where `uid` = ?";
        return await DB.select('p2p', sql, uid);
    }

    static async kycList(searchKey:string, searchValue:string, limit:number, offset:number){
        var sql = "CALL spKYCList(?, ?, ?, ?);"
        return await DB.listCountSP('p2p', sql, [searchKey, searchValue, limit, offset]);
    }
    

    static async getBalance(uid:string, coin:string){
        var sql = "select balance from tbBalance where uid = ? and coin = ?";
        return await DB.select('p2p', sql, [uid, coin]);
    }


    static async claimInsert( uid:string, tradeIdx:number, subject:string, message:string, file:string ){
        var sql = "INSERT into `tbClaim` ( `writer` , `tradeIdx` , `subject` , `message` , `writeAt` , `file` ) " +
            "values (?, ?, ?,?, now(), ? );";
        return await DB.execute('p2p', sql, [ uid, tradeIdx, subject, message, file ]);
    }        

    static async claimSelect(claimIdx:number){
        var sql = "select claimIdx, writer, tradeIdx, subject, message, writeAt, file, email, firstName, lastName from tbClaim c join tbUser U on writer = uid  where `claimIdx` = ?";
        return await DB.select('p2p', sql, claimIdx);
    }

    static async claimList(startDate:string, endDate:string, searchKey:string, searchValue:string, limit:number, offset:number){        
        var sql = "CALL spClaimList(?, ?, ?, ?, ?, ?);"
        return await DB.listCountSP('p2p', sql, [startDate, endDate, searchKey, searchValue, limit, offset]);
    }

    static async messageInsert( claimIdx:number, uid:string, messsage:string, file:string ){
        var sql = "INSERT into `tbMessage` ( `claimIdx` , `writer` , `messsage` , `writeAt` , `file`, `recieveYN` ) " + 
        " values ( ?, ?, ?, now(),?, 'N' );";
        return await DB.execute('p2p', sql, [claimIdx, uid, messsage, file]);
    }
        
    static async messageRead( idx:number, uid:string ){        
        var sql = "UPDATE `tbMessage` set  `recieveYN` = 'Y', `recieveAt` = now() where `idx` = ? and writer <> ?;";
        return await DB.execute('p2p', sql, [ idx, uid ]);
    }

    static async messageList(claimIdx:number){        
        var sql = "select idx, claimIdx, writer, messsage, writeAt, file, recieveYN, recieveAt, email, firstName, lastName from tbMessage M join tbUser U on M.writer = U.uid  where `claimIdx` = ? order by idx";
        return await DB.list('p2p', sql, [claimIdx]);
    }


    static async recieveInfoList(uid:string){
        var sql = "SELECT R.coin, bank, `account`, `owner`, coinAddress, C.coinType, case when C.coinType = '1' then 'Coin' when C.coinType = '2' then 'Fiat' ELSE '' END AS typeText FROM tbRecieveInfo R join tbCurrency C ON R.coin = C.coin WHERE R.uid = ? ";
        return await DB.list('p2p', sql, uid);
    }

    static async recieveInfoUpdate(uid:string, coin:string, bank:string, account:string, owner:string, coinAddress:string, swift:string, branchCode:string, branchAddress:string){
        var sql = "UPDATE tbRecieveInfo R SET bank = ?,`account` = ?,`owner` = ?,coinAddress = ?, swift = ?, branchCode = ?, branchAddress = ? WHERE R.uid = ? AND coin = ?";
        return await DB.execute('p2p', sql, [ bank, account, owner, coinAddress, uid, coin, swift, branchCode, branchAddress ]);
    }
}

  




