import log4js from 'log4js';


log4js.configure({
  appenders: { info: { type: "file", filename: "info.log" } },
  categories: { default: { appenders: ["info"], level: "error" } }
});


const logger = log4js.getLogger("info");

export default class Logger{

    static Info(message:any){
        logger.info(message);
    }
}