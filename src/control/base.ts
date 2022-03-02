import * as express from 'express';
import Util from '../common/util'
import { ERR } from '../protocol/ErrorCodes';
import fs from 'fs';
import stream from 'stream';

export default class BaseControl{

    static getUID(req:express.Request) {
        var decodedToken: any = req.headers.decodedToken;
        var uid = Util.String(decodedToken.uid);
        return uid;
    }

    static execute(res:express.Response, execPromise:Promise<any>){
        try {             
            
            execPromise.then(function(result){
                res.json({
                    ecode: 0,
                    message: "success"
                });
            }, function(e){
                console.error(e)
                return Util.response_err(res, 400, ERR.FAIL, e.message)
            })
            
        } catch (e) {
            console.error(e)
            return Util.response_err(res, 400, ERR.FAIL, e.message)
        }
    }

    static select(res:express.Response, execPromise:Promise<any>){
        try {                      
            execPromise.then(function(result){    
                res.json({
                    ecode: 0,
                    message: JSON.stringify(result)
                });
            }, function(e){
                console.error(e)
                return Util.response_err(res, 400, ERR.FAIL, e.message)
            })
            
        } catch (e) {
            console.error(e)
            return Util.response_err(res, 400, ERR.FAIL, e.message)
        }
    }

    
    protected static setUndefinedValue(value: any, value2: any) {
        
        return (value != undefined && value != "") ? value : value2;
    }

    protected static sendFile(res:express.Response, path:string){
        
        const r = fs.createReadStream(path) // or any other way to get a readable stream
        const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
        stream.pipeline(
         r,
         ps, // <---- this makes a trick with stream error handling
         (err) => {
          if (err) {
            console.log(err) // No such file or any other kind of error
            return res.sendStatus(400); 
          }
        })
        ps.pipe(res) // <---- this makes a trick with stream error handling
    }


}