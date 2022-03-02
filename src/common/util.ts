var _ = require('lodash');
var ErrorCodes = require('../protocol/ErrorCodes').ERR;
var ErrorCodesMsg = _.invertBy(ErrorCodes);
import * as express from 'express';
import AppManager from '../appManager';
import jwt from 'jsonwebtoken'

export default class Util{
    static fail_json = function (ecode:any, what?:any) {
        let msg = '';
        if (ErrorCodesMsg[ecode]) {
            msg = ErrorCodesMsg[ecode][0];
        }
        var json :any = { ecode: ecode, message: msg};
        if (what) {
            json.error = what;
        }
        return json;
    };

    static is_string (str:string, name?:string, what?:any) {
        var b = true;
        if (str === undefined || str === null || str === '' || !(typeof str === 'string')) {
            b = false;
        }
        if (b === false) {
            if (str === undefined)
                str = 'undefined';
            this.makeWhat(what, name, str, 'is_string');
        }
        return b;
    };

    static makeWhat(what:any, name:any, x:any, functionname:any) {
        if (!what)
            return;
        if (!name)
            return;
        Object.defineProperty(what, name, { value: x, writable: true, configurable: true, enumerable: true });
        what.function = functionname;
    }


    static is_string_length (str:any, min:any, max:any, name:any, what:any) {
        var b = true;
        if (str === undefined || str === null || str === '' || !(typeof str === 'string' || str instanceof String)) {
            b = false;
        }
        if (str.length < min || str.length > max) {
            b = false;
        }
        if (b === false) {
            if (str === undefined)
                str = 'undefined';
            this.makeWhat(what, name, str, 'is_string_length');
        }
        return b;
    };

    static is_string_no_whiteSpace(str:string, name:any, what:any) {
        var b = true;
        if (str === undefined || str === null || str === '' || !(typeof str === 'string' )) {
            b = false;
        }
        else {
            b = /\s/g.test(str);
            b = !b;
        }
        if (b === false) {
            if (str === undefined)
                str = 'undefined';
            this.makeWhat(what, name, str, 'is_string_no_whiteSpace');
        }
        return b;
    };

    static is_positive(x:any, name?:any, what?:any) {
        var b = true;
        var reg = /^\d+$/;
        if (x === undefined) {
            b = false;
            x = 'undefined';
        }
        else if (x === null || reg.test(x) === false || x <= 0) {
            b = false;
        }
        if (b === false)
            this.makeWhat(what, name, x, 'is_positive');
        return b;
    };

    static Log(message:string){

    }

    static is_email(x:any, name?:any, what?:any) {
        var b = true;
        if (x === undefined || x === null) {
            b = false;
        }
        else {
            b = validator.isEmail(x);
        }
        if (b === false) {
            if (x === undefined)
                x = 'undefined';
            this.makeWhat(what, name, x, 'is_email');
        }
        return b;
    };

    static response_err(res:express.Response, endcode:number, ecode?:number, what?:any) {
        res.status(endcode)
        return res.json(Util.fail_json(ecode,what))
    }

    static Number(n:any) {
        n = Number(n);
        if (isNaN(n)) {
            n = 0;
        }
        return n;
    };

    static String(s:any) {
        
        var result :string;
        result = "";
        if (s != undefined) {
            result = s;
        }
        return result;
    };

    static getToken(payLoad:any){
        var jwt_Secret = AppManager.config.server.jwt_Secret
        var jwt_exp = AppManager.config.server.jwt_exp       

        var token = jwt.sign(payLoad, jwt_Secret, {
            algorithm: 'HS256', // "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" default SHA256
            expiresIn: jwt_exp
        });
        return token;
    }

    static decodeToken(token:any){
        var jwt_Secret = AppManager.config.server.jwt_Secret        
        var decoded = jwt.verify(token, jwt_Secret);
        return decoded;

    }
    
}
