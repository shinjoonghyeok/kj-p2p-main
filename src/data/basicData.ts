import DB from '../common/dbConn';

export default class BasicData{

    static async symbolInsert( symbol:string, priceUnit:number, minAmount1:number, minAmount2:number, symbolType:string, tradeFee:number ){        
        var sql = "INSERT into `tbSymbol` ( `symbol` , `priceUnit` , `minAmount1` , `minAmount2` , `symbolType`, `tradeFee` ) values ( ?, ?, ?, ?, ?, ? );";
        return await DB.execute('p2p', sql, [ symbol, priceUnit, minAmount1, minAmount2, symbolType, tradeFee ]);
    }
        
    static async symbolUpdate( symbol:string, priceUnit:number, minAmount1:number, minAmount2:number, symbolType:string, tradeFee:number  ){        
        var sql = "UPDATE `tbSymbol` set `priceUnit` = ?, `minAmount1` = ?, `minAmount2` = ?, `symbolType` = ?, tradeFee = ? where `symbol` = ?;";
        return await DB.execute('p2p', sql, [ priceUnit, minAmount1, minAmount2, symbolType, tradeFee, symbol ]);
    }

    static async symbolSelect(symbol:string){
        var sql = "select symbol, priceUnit, minAmount1, minAmount2, symbolType, tradeFee from tbSymbol where `symbol` = ?";
        return await DB.select('p2p', sql, symbol);
    }

    static async symbolList(){
        var sql = "select symbol, priceUnit, minAmount1, minAmount2, symbolType, tradeFee from tbSymbol"
        return await DB.list('p2p', sql);
    }

    static async currencyInsert( coin:string, coinName:string, coinType:string, transactionFee:number ){
        var sql = "INSERT into `tbCurrency` ( `coin` , `coinName` , `coinType` , `transactionFee` ) values ( ?, ?, ?, ? );";
        return await DB.execute('p2p', sql, [ coin, coinName, coinType, transactionFee ]);
    }
        
    static async currencyUpdate( coin:string, coinName:string, coinType:string, transactionFee:number ){        
        var sql = "UPDATE `tbCurrency` set `coinName` = ?, `coinType` = ?, `transactionFee` = ? where `coin` = ?;";
        return await DB.execute('p2p', sql, [ coinName, coinType, transactionFee, coin]);
    }

    static async currencySelect(coin:string){        
        var sql = "select coin, coinName, coinType, transactionFee from tbCurrency where `coin` = ?";
        return await DB.select('p2p', sql, coin);
    }

    static async currencyList(){
        var sql = "select coin, coinName, coinType, transactionFee from tbCurrency"
        return await DB.list('p2p', sql);
    }


    static async boardInsert( boardCode:string, boardName:string ){
        var sql = "INSERT into `tbBoard` ( `boardCode` , `boardName` ) values ( ?, ? );";
        return await DB.execute('p2p', sql, [ boardCode, boardName ]);
    }
        
    static async boardUpdate( boardCode:string, boardName:string ){        
        var sql = "UPDATE `tbBoard` set `boardName` = ? where `boardCode` = ?;";
        return await DB.execute('p2p', sql, [ boardName, boardCode ]);
    }

    static async boardList(){
        var sql = "select boardCode, boardName from tbBoard";
        return await DB.list('p2p', sql);
    }

    static async articleInsert( boardCode:string, writer:string, subject:string, content:string ){
        var sql = "INSERT into `tbArticle` ( `boardCode` , `writer` , `writeAt` , `subject` , `content` , `hit` , `editAt` ) values ( ?, ?, now(), ?, ?, 0, now() );";
        return await DB.execute('p2p', sql, [ boardCode, writer, subject, content ]);
    }
        
    static async articleUpdate( articleIdx:number, subject:string, content:string){        
        var sql = "UPDATE `tbArticle` set `subject` = ?, `content` = ?, `editAt` = now() where `articleIdx` = ?;";
        return await DB.execute('p2p', sql, [ subject, content, articleIdx ]);
    }

    static async articleSelect(articleIdx:number){        
        var sql = "select articleIdx, boardCode, writer, writeAt, subject, content, hit, editAt from tbArticle where `articleIdx` = ?";
        return await DB.select('p2p', sql, [articleIdx]);
    }

    static async articleList(boardCode:string, searchKey:string, searchValue:string, limit:number, offset:number){
        var sql = "CALL spArticleList(?, ?, ?, ?, ?);"
        return await DB.listCountSP('p2p', sql, [boardCode, searchKey, searchValue, limit, offset]);
    }


    static async requireBank(symbol:string, orderSide:string){
        var sql = "SELECT case when symbolType = '2' AND ? = 'S' then 'Y' ELSE 'N' END AS requireBank FROM 	tbSymbol WHERE 	symbol = ?";
        return await DB.select('p2p', sql, [orderSide, symbol])
    }
}

  