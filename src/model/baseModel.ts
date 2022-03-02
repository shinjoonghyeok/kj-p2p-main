export default class BaseModel{

    protected static selectFromData(promise: Promise<any>, Model:any) {
        return new Promise((resolve: any, reject: any) => {
            try {
                promise.then(function (data: any) {
                    if (data == null) {
                        reject("no data");
                    }
                    var obj = Model.applyData(data);
                    resolve(obj);
                }, function (err: any) {
                    console.log(err);
                    reject(err);
                });
                ;
            }
            catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }

}