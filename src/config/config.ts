var cfg = require('./config.json');
export default class Config{
    public static TitleName = cfg.TitleName;
    public static server = cfg.server
    public static db = cfg.db
    public static mdb = cfg.mdb

}

