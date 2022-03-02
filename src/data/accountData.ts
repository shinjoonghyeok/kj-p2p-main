import DB from '../common/dbConn';

export default class AccountData{

    static async accounthistoryInsert(coin:string, uid:string, amount:number, type:string, txHash:string, withdrawIdx:number){
        var sql = "call spAccountHistoryInsert(?, ?, ?, ?, ?, ?)";
        return await DB.execute('p2p', sql, [coin, uid, amount, type, txHash, withdrawIdx]);
    }


    static async accounthistoryList(startDate:string, endDate:string, searchKey:string, searchValue:string, limit:number, offset:number){
        var sql = "CALL spAccountHistoryList(?, ?, ?, ?, ?, ?);"
        return await DB.listCountSP('p2p', sql, [startDate, endDate, searchKey, searchValue, limit, offset]);
    }


    static async withdrawInsert( amount:number, coin:string, withdrawAddress:string, uid:string ){
        var sql = "call spWithdrawInsert(?, ?, ?, ?);";
        return await DB.execute('p2p', sql, [  amount, coin, withdrawAddress, uid ]);
    }
        
    static async withdrawConfirm( withdrawIdx:number ){        
        var sql = "UPDATE `tbWithdraw` set `confirmAt` = now(), `state` = '1' where `withdrawIdx` = ?;";
        return await DB.execute('p2p', sql, [ withdrawIdx]);
    }

    static async withdrawCancel( withdrawIdx:number){        
        var sql = "UPDATE `tbWithdraw` set `state` = 'C' where `withdrawIdx` = ?;";
        return await DB.execute('p2p', sql, [withdrawIdx]);
    }

    static async withdrawSendingList(){
        var sql = "SELECT U.`uid`, U.walletIdx, `withdrawIdx`, coin, amount, state, withdrawAddress from tbWithdraw W JOIN tbUser U ON W.uid = U.uid where state = '1' ";
        return await DB.list('p2p', sql);
    }

    static async withdrawList(startDate:string, endDate:string, searchKey:string, searchValue:string, limit:number, offset:number){
        var sql = "CALL spWithdrawList(?, ?, ?, ?, ?, ?);"
        return await DB.listCountSP('p2p', sql, [startDate, endDate, searchKey, searchValue, limit, offset]);
    }



    static async getCheckAddressList(coin:string){
        var sql = `SELECT U.uid, U.walletIdx
                FROM tbUser U order by walletIdx;`
        return await DB.list('p2p', sql, [coin]);
    }



    // static async getCheckAddressList(coin:string){
    //     var sql = `SELECT U.uid, U.walletIdx
    //             FROM 
    //                 tbUser U
    //                 JOIN 
    //                 tbTrade T 
    //                 ON U.uid = T.uidMaker
    //                 LEFT OUTER JOIN tbOrder O  ON T.tradeIdx = O.tradeIdx AND U.uid = O.uidTaker
    //             WHERE
    //                 T.symbol LIKE CONCAT('%', ?, '%') AND T.tradeState IN (0, 1) AND (O.tradeIdx IS NULL OR O.takerState IN (0, 1))
    //             GROUP BY 
    //                 U.uid, U.walletIdx;`
    //     return await DB.list('p2p', sql, [coin]);
    // }

}