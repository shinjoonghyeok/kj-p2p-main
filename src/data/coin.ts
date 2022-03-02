import ApiManager from '../common/apiManager';
import Config from '../config/config';
import { add } from 'lodash';
import DB from '../common/dbConn';

var ethApi = new ApiManager(Config.server.kj.ETH.url);
var btcApi = new ApiManager(Config.server.kj.BTC.url);
var gasApi = new ApiManager("https://ethgasstation.info");


export default class CoinApi{

    static async getAddress(idx:number){
        return await ethApi.requestGet("/eth/invest/getaddress/" + idx.toString());
    }

    static async getLastBlock(){
        return await ethApi.requestGet("/getLastBlockNumber");
    }

    static async getGasInfo(){
        return await gasApi.requestGet("/json/ethgasAPI.json");
    }

    static async getethrequest(address:string, value:string){
        var body = {address:address, value:value};
        return await ethApi.requestPost(`/eth/p2p/request`, body);        
    }


    static async getP2PAddressList(indexList:string){
        var body = {indexList:indexList};
        return await ethApi.requestPost(`/eth/p2p/addresslist`, body);        
    }


    static async getWalletAddress(coin:string, idx:number){
        coin = coin.toLowerCase();        
        if(coin == "btc"){
            return await btcApi.requestGet("/btc/wallet/getaddress/" + idx.toString());
        }else{
            return await ethApi.requestGet("/eth/wallet/getaddress/" + idx.toString());
        }
    }

    static async getAccountAddress(coin:string, idx:number){
        coin = coin.toLowerCase();        
        if(coin == "btc"){
            return await btcApi.requestGet("/btc/account/getaddress/" + idx.toString());
        }else{
            return await ethApi.requestGet("/eth/p2p/getaddress/" + idx.toString());
        }
    }

    static async getWalletBalance(coin:string, idx:number){
        coin = coin.toLowerCase();

        if(coin == "btc"){
            return await btcApi.requestGet("/btc/wallet/getbalance/" + idx.toString());
        }else{
            return await ethApi.requestGet(`/${coin}/wallet/getbalance/` + idx.toString());
        }
    }

    
    static async getAccountBalance(coin:string, idx:number){
        coin = coin.toLowerCase();
        if(coin == "btc"){
            return await btcApi.requestGet("/btc/account/getbalance/" + idx.toString());
        }else{
            return await ethApi.requestGet(`/${coin}/p2p/getbalance/` + idx.toString());
        }
    }


    static async listTransaction(coin:string, addresses:string, range:number) {
        coin = coin.toLowerCase();
        var body = {addresses : addresses, range : range};
        return await ethApi.requestPost(`/${coin}/listTransaction`, body);
    }

    static async getTransactions(coin:string, blockNumber:number) {
        coin = coin.toLowerCase();
        var body = {blockNumber:blockNumber};
        return await ethApi.requestPost(`/${coin}/p2p/getTransactions`, body);
    }


    static async getWalletSend(coin:string, idx:number, to:string, value:string, gasPrice:string, otp:string){
        coin = coin.toLowerCase();
        var gasLimit = 21000;
        if(coin != "eth"){
            gasLimit = 60000;
        }

        var iGasPrice =  (gasPrice == undefined)?0:parseInt(gasPrice) * 1000000000;

        var from : any = await CoinApi.getWalletAddress(coin, idx);
        var body = {index:idx, from : from.address, to: to, value:value, gasLimit:gasLimit, gasPrice: iGasPrice, otp: otp };

        if(coin == "btc"){            
            return await btcApi.requestPost(`/${coin}/wallet/send`, body);
        }else{
            return await ethApi.requestPost(`/${coin}/wallet/send`, body);
        }
    }

    static async getAccountSend(coin:string, idx:number, to:string, value:string, gasPrice:string, otp:string){
        coin = coin.toLowerCase();
        var gasLimit = 21000;
        if(coin != "eth"){
            gasLimit = 60000;
        }

//        console.log(coin + "/" + idx + "/" + to + "/" + value);

        var iGasPrice =  (gasPrice == undefined)?0:parseInt(gasPrice) * 1000000000;

        var from : any = await CoinApi.getAccountAddress(coin, idx);
        var body = {index:idx, from : from.address, to: to, value:value, gasLimit:gasLimit, gasPrice: iGasPrice, otp: otp };

        if(coin == "btc"){            
            return await btcApi.requestPost(`/${coin}/account/send`, body);
        }else{
            return await ethApi.requestPost(`/${coin}/p2p/send`, body);
        }
    }

    static async lastUpdateBlock(){
        var sql = "SELECT ifnull(MAX(blockNumber), 0) AS lastBlock FROM tbETHBlocks;";
        return await DB.select('p2p', sql)
    }

    static async updateBlockInfo(blockNumber:number){
        var sql = "insert into tbETHBlocks(blockNumber, updateTime) values(?, now());";
        return await DB.execute('p2p', sql, [blockNumber])
    
    }


}