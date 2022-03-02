import _ from 'lodash'
import mariadb from 'mariadb'

let pool: any = {}

export default class DB{

    static async init(config_db:any) {
        return new Promise(async (resolve, reject) => {
            const connectionLimit = 10
            const idleTimeout = 0
            try { 
                for (let db of config_db) {
                    let conn, rows;
                    pool[db.name] = mariadb.createPool({ host: db.host, port: db.port, user: db.user, password: db.password, database: db.database, connectionLimit })
                    conn = await pool[db.name].getConnection();
                    rows = await conn.serverVersion()
                    console.log(`${db.name}: version = ${rows}`)
                    conn.release();
                }
                resolve(pool)
            } catch (e) {
                reject(e)            
            }
        })
    }
    
    
    static async conn(db: any) {
        try {
            return await pool[db].getConnection();
        }
        catch (err) {
            console.log({error:db});
            return null
        }
    }
    
    
    
    /**
     * 
     * @param db 
     * @param query 1개의 row를 기대한다. 
     */
    static async select(db: any, sql: string, values?: any) {
        let conn, row;
        conn = await pool[db].getConnection();
        row = await conn.query(sql, values);
        conn.release();
        if (!row.length) {
            throw new Error('no item');
        }
        return row[0]
      
    }

    /**
     * 
     * @param db 
     * @param query 1개의 row를 기대한다. 
     */
    static async selectSP(db: any, sql: string, values?: any) {
        let conn, row;
        conn = await pool[db].getConnection();
        row = await conn.query(sql, values);
        conn.release();
        if (!row.length) {
            throw new Error('no item');
        }
        return row[0][0];
      
    }
    /**
     * 
     * @param db 
     * @param query  여러개의 rows를 기대한다. 
     */
    static async list(db: any, sql: string, values?: any) {
        let conn, rows;
    
        conn = await pool[db].getConnection();
        rows = await conn.query(sql, values);
        conn.release();
        return rows

    }

    /**
     * 
     * @param db 
     * @param query  여러개의 rows를 기대한다. 
     */
    static async listCountSP(db: any, sql: string, values?: any) {
        let conn, rows
    
    
        conn = await pool[db].getConnection();
        rows = await conn.query(sql, values);
        conn.release();

        var totalCount = 0;
        if(rows[1].length > 0){
            totalCount = rows[1][0]["totalCount"]; 
        }

        let data = {
            rows: rows[0],
            totalCount: totalCount
        };

        return data;
        
    }
    
    
    /**
     * 
     * @param db 
     * @param data 
     */
    static async execute(db: any, sql: string, values?: any) {
        let conn, row;
       try{
            conn = await pool[db].getConnection();
            row = await conn.query(sql, values);
            conn.release();
            return row;
       }catch(e){      

            console.log(e)
            try{
                if(e.message.match(/SQLState: 45000/).length > 0){
                        var message = e.message.match(/SQLState: 45000\)(.+)\n/)[0];
                        message = message.replace(/SQLState: 45000\)/, '').replace(/\n/, '').trim();
                        throw new Error(message);
                }
            }catch(err){
                
            }
           throw new Error(e)
            
       }

    
    }
    
    

}



