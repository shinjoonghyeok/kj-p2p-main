import DB from '../common/dbConn';
import { start } from 'repl';

export default class TradeData{
    static async tradeInsert( uidMaker:string, symbol:string, orderSide:string, amount1:number, amount2:number, bank:string, account:string, owner:string, coinAddress:string, swift:string, branchCode:string, branchAddress:string){
        var sql = "call spTradeInsert(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return await DB.execute('p2p', sql, [ uidMaker, symbol, orderSide, amount1, amount2, bank, account, owner, coinAddress, swift, branchCode, branchAddress]);
    }

    static async tradeInsertLP( uidMaker:string, symbol:string, orderSide:string, amount1:number, amount2:number){
        var sql = "call spTradeInsertLP(?, ?, ?, ?, ?)";
        return await DB.select('p2p', sql, [ uidMaker, symbol, orderSide, amount1, amount2]);
    }

    static async tradeStateLP( uidMaker:string, orderID:number){
        var sql = `SELECT 
                    tradeIdx AS orderID
                    ,symbol 
                    ,case when orderSide = 'B' then 'buy' when orderSide = 'S' then 'sell' ELSE '' END AS orderSide
                    ,price
                    ,amount AS qty
                    ,case when tradeState = 0 then 'pending' when tradeState = 1 OR tradeState = 2 then 'filled' when tradeState = 3 then 'canceled' ELSE'' end AS orderState
                FROM tbTrade WHERE tradeIdx = ? AND uidMaker = ?;`;
        return await DB.select('p2p', sql, [ orderID, uidMaker]);
    }
        
    static async tradeUpdate( tradeIdx:number, uidMaker:string, symbol:string, orderSide:string, amount1:number, amount2:number, tradeState:string, makerState:string, orderAt:number, depositConfirm:string, confirmAt:number, bank:string, account:string, owner:string, depositAt:number, sender:string, coinAddress:string, comment:string ){        
        var sql = "UPDATE `tbTrade` set uidMaker = ?, `symbol` = ?, `orderSide` = ?, `amount1` = ?, `amount2` = ?, `tradeState` = ?, `makerState` = ?, `orderAt` = ?, `depositConfirm` = ?, `confirmAt` = ?, `bank` = ?, `account` = ?, `owner` = ?, `depositAt` = ?, `sender` = ?, `coinAddress` = ?, `comment` = ? where `tradeIdx` = ?;";
        return await DB.execute('p2p', sql, [ uidMaker, symbol, orderSide, amount1, amount2, tradeState, makerState, orderAt, depositConfirm, confirmAt, bank, account, owner, depositAt, sender, coinAddress, comment, tradeIdx]);
    }

    static async tradeSelect(tradeIdx:number){
        var sql = "select tradeIdx, uidMaker, symbol, orderSide, amount1, amount2, tradeState, makerState, orderAt, depositConfirm, confirmAt, bank, account, owner, depositAt, sender, coinAddress, comment from tbTrade where `tradeIdx` = ?";
        return await DB.select('p2p', sql, tradeIdx);
    }

    static async tradeList(startDate:string, endDate:string, searchKey:string, searchValue:string, limit:number, offset:number){
        var sql = "CALL spTradeList(?, ?, ?, ?, ?, ?);"
        return await DB.listCountSP('p2p', sql, [startDate, endDate, searchKey, searchValue, limit, offset]);
    }

    static async tradeOpenList(symbol:string, orderSide:string, limit:number, offset:number){
        var sql = "CALL spTradeOpenList(?, ?, ?, ?);"
        return await DB.listCountSP('p2p', sql, [symbol, orderSide, limit, offset]);
    }


    static async orderInsert(tradeIdx:number, uidTaker:string, bank:string, account:string, owner:string, coinAddress:string, swift:string, branchCode:string, branchAddress:string ){
        var sql = "call spOrderInsert(?, ?, ?, ?, ?, ?, ?, ?, ?)";
        return await DB.execute('p2p', sql, [ tradeIdx, uidTaker, bank, account, owner, coinAddress, swift, branchCode, branchAddress]);
    }
        

    static async tradeDepositList(uid:string){
        var sql = `call spTradeDepositList(?);`;
        return await DB.select('p2p', sql, [uid]);
    }

    static async tradeBankDepsit(tradeIdx:number, uid:string, sender:string, depositAt:string){
        var sql = `call spTradeBankDeposit(?, ?, ?, ?);`;
        return await DB.execute('p2p', sql, [tradeIdx, uid, sender, depositAt]);
    }

    static async tradeBankDepsitConfirm(tradeIdx:number, uid:string){
        var sql = `call spTradeBankDepositConfirm(?, ?);`;
        return await DB.execute('p2p', sql, [tradeIdx, uid]);
    }


    static async tradeConfirm(tradeIdx:number, uid:string){
        var sql = `call spTradeConfirm(?, ?);`;
        return await DB.execute('p2p', sql, [tradeIdx, uid]);
    }

    static async tradeCancel(tradeIdx:number, uid:string){
        var sql = `call spTradeCancel(?, ?);`;
        return await DB.execute('p2p', sql, [tradeIdx, uid]);
    }


    static async tradeListComplete(uid:string, limit:number, offset:number){
        var sql = `call spTradeListComplete(?, ?, ?);`;
        return await DB.listCountSP('p2p', sql, [uid, limit, offset]);
    }

    static async tradeListCancel(uid:string, limit:number, offset:number){
        var sql = `call spTradeListCancel(?, ?, ?);`;
        return await DB.listCountSP('p2p', sql, [uid, limit, offset]);
    }

    static async tradeListRecent(symbol:string, limit:number){
        var sql = `SELECT symbol, price, amount, confirmAt FROM tbTrade WHERE tradeState = '2' AND symbol = ? ORDER BY confirmAt DESC LIMIT ? OFFSET 0`;
        return await DB.list('p2p', sql, [symbol, limit]);
    }

    static async recieveInfo(uid:string, symbol:string, orderSide:string){
        var sql = `select bank, account, owner, coinAddress, swift, branchCode, branchAddress from tbRecieveInfo where uid = ? 
        and coin = case when ? = 'B' then SUBSTRING_INDEX(?, '/', 1) when ? = 'S' then SUBSTRING_INDEX(?, '/', -1) ELSE '' END`;
        return await DB.select('p2p', sql, [uid, orderSide, symbol, orderSide, symbol]);        
    }

    static async tradeListSettle(){
        var sql = `SELECT uidMaker, uidTaker, T.symbol, T.tradeIdx, T.orderSide, T.price, T.amount, T.coinAddress as makerAddress, O.coinAddress as takerAddress 
                    ,S.tradeFee, M.walletIdx AS makerIdx, U.walletIdx AS takerIdx, T.txHash as makerHash, O.txHash as takerHash
                FROM 
                    tbTrade T 
                    JOIN tbOrder O ON T.tradeIdx = O.tradeIdx 
                    JOIN tbSymbol S ON T.symbol = S.symbol
                    JOIN tbUser M ON T.uidMaker = M.uid
                    JOIN tbUser U ON O.uidTaker = U.uid

                WHERE tradeState = '1' AND makerState = '2' AND takerState = '2';`;
        return await DB.list('p2p', sql);
    }

    static async tradeSettleMaker(tradeIdx:number, uidMaker:string, txHashMaker:string ){
        var sql = `UPDATE tbTrade T
            SET T.txHash = ?
            WHERE tradeState = '1' AND makerState = '2'
                AND T.uidMaker = ? AND T.tradeIdx = ?;`;
        
        return await DB.execute('p2p', sql, [txHashMaker, uidMaker, tradeIdx])
    }

    static async tradeSettleTaker(tradeIdx:number, uidTaker:string, txHashTaker:string ){
        var sql = `UPDATE tbTrade T join tbOrder O  on T.tradeIdx = O.tradeIdx
            SET O.txHash = ?
            WHERE tradeState = '1' AND takerState = '2'
                AND O.uidTaker = ? AND T.tradeIdx = ?;`;
        
        return await DB.execute('p2p', sql, [txHashTaker, uidTaker, tradeIdx])
    }

    
    static async tradeSettle(tradeIdx:number, uidMaker:string, uidTaker:string){
        var sql = `call spTradeSettle(?, ?, ?);`;
        
        return await DB.execute('p2p', sql, [tradeIdx, uidMaker, uidTaker])
    }

}