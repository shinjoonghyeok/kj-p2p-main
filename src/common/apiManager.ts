import _ from 'lodash'
import Request from 'request'
import jwt from 'jsonwebtoken'
import Util from '../common/util';

function _error_msg(path: string) { return '[' + (new Date()).toString() + '][ lll api ' + path + '] ' }

export default class ApiManager {

    public host:string;
    public header:any;

    constructor(host:string) {
        this.host = host;
        this.header =  { 'content-type': 'application/json', 'x-access-token': '' }        
    }

    requestPost(path: string, body: any) {
        return new Promise(async (resolve, reject) => {
        
            const form = {
                url: this.host + path,
                method: 'POST',
                json: true,
                headers: this.header,
                body: body
            }
            Request.post(form, function (error: any, response: any, body: any) {
                if (error) {
                    reject(_error_msg(path) + 'error =' + error);                    
                } else if (!body) {                    
                    reject(_error_msg(path) + 'body =' + body);
                } else {
                    if (response.statusCode !== 200 && response.statusCode !== 201) {
                        reject(_error_msg(path) + 'statusCode =' + response.statusCode);                        
                    }else{
                        resolve(body);
                    }
                }
            })
        });
    }
   
    requestGet(path: string) {
        return new Promise(async (resolve, reject) => {
            var url = this.host + path;
            Request.get(url, function (error: any, response: any, body: any) {
                if (error) {
                    reject(_error_msg(path) + 'error =' + error);                    
                } else if (!body) {
                    reject(_error_msg(path) + 'body =' + body);        
                } else {
                    try {
                        if (typeof body === 'string') {
                            if (body.length > 0) {
                                body = JSON.parse(body)
                            }
                        }

                        resolve(body);


                        
                    } catch (e) {
                        console.log(e)
                        reject(_error_msg(path) + 'error=' +e);        
                    }                    
                    
                    
                    // if (response.statusCode !== 200 && response.statusCode !== 201) {                        
                    //     reject(_error_msg(path) + 'statusCode =' + response.statusCodey);
                    // }else if(response.body.error){
                    //     reject(_error_msg(path) + 'response.body.error = ' + response.body.error.toString())
                    // }
                    // else{
                    // }
                }
            })
        });
   
    }



    // not complete 
    static RequestFormGet(self: any, path: string, body: any, next: any) {
        const form = {
            method: 'GET',
            json: true,
            headers: self.api_lll_header,
            body: body
        }
        Request.get(self.api_lll.host + path, form, function (error: any, response: any, body: any) {
            if (error) {
                console.log('[' + path + '] error =' + error)
            } else if (!body) {
                console.log('[' + path + '] body  =' + body)
            } else {
                if (response.statusCode !== 200 && response.statusCode !== 201) {
                    console.log('[' + path + '] statusCode != 200  statusCode =' + response.statusCode)
                }

                try {
                    if (typeof body === 'string') {
                        if (body.length > 0) {
                            body = JSON.parse(body)
                        }
                    }
                } catch (e) {
                    console.log(e)
                }
            }
            return next(error, response, body)
        })
    }
}