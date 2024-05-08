import { Asset } from "expo-asset";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

const SqliteContext = createContext({
    db:false,
    getDb:()=>{},
    exeSelectAll:(func:any)=>{}
})

const SqliteProvider = ({children}:PropsWithChildren) => {
    const [db,setDb] = useState(false)
    
    const getDb = async () => {
        try {
            const dbName = "mydata.db"
            const dbAsset = require("../../assets/data/mydata.db")
            const dbUri = Asset.fromModule(dbAsset).uri
            const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`
            const fileInfo = await FileSystem.getInfoAsync(dbFilePath)
            if(!fileInfo.exists){
            await FileSystem.makeDirectoryAsync(
                `${FileSystem.documentDirectory}SQLite`,
                {intermediates:true}
            );
            }
            await FileSystem.downloadAsync(dbUri,dbFilePath);
            console.log("开启数据库2");
            // setDb(await SQLite.openDatabase(dbName))
            await setDb(true)
        } catch (error) {
            console.error("初始化数据库时出错：", error);
        }
    }
    // getDb()

    const exeSelectAll = async (func:any) => {
        try {
          const readOnly = true;
          if(!db) return;
          db.transaction(async (tx:any) => {
            const result = tx.executeSql('SELECT * FROM NOTIONS', []);
            console.log("查询全部成功");
            const data = result.rows
            data.reverse()
            func(data)
            // await db.closeAsync();
          }, readOnly);
        } catch (error) {
          console.error('查询全部An error occurred:', error);
        }
      }

    return (
        <SqliteContext.Provider value={{db,getDb,exeSelectAll}}>
            {children}
        </SqliteContext.Provider>
    )
}

export default SqliteProvider

export const useSqlite = () => useContext(SqliteContext)