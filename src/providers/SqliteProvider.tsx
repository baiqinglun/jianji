import { Asset } from "expo-asset";
import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

type SqliteType = {
    db:SQLite.SQLiteDatabase | null | any;
    openDb:()=>void;
    getDbFile:() => void;
    exeSql:(type:string,data:any[]) => Promise<any>;
}

const sqls:any = {
    "searchAllNotions":"SELECT * FROM NOTIONS",
    "insertNotion":"INSERT INTO NOTIONS (content,id,tags,time) VALUES (?, ?, ?, ?)",
    "updateNotionById":"UPDATE notions SET content = ? WHERE id = ?",
    "searchNotionById":"SELECT content FROM notions WHERE id = ?",
}

const SqliteContext = createContext<SqliteType>({
    db:null,
    openDb:()=>{},
    getDbFile:()=>{},
    exeSql:async()=>{},
})

const SqliteProvider = ({children}:PropsWithChildren) => {
    const db = useRef<null|SQLite.SQLiteDatabase>(null)

    // 打开数据库
    const openDb = () => {
        console.log("打开数据库");
        db.current = SQLite.openDatabase("mydata.db")
    }

    // 获取远程db数据
    const getDbFile = async () => {
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
            console.log("获取远程数据成功");
            
        } catch (error) {
            console.error("初始化数据库时出错：", error);
        }
    }

    // 执行语句
    const exeSql = async (type:string,data:any[]) => {
        try {
            if(db.current==null){
                console.log("数据库不存在");
                openDb()
            }
            // return 1
            const readOnly = false;
            return db?.current?.execAsync([{ sql: sqls[type],args: data }],readOnly).then((result:any)=>{
                const data = result[0]?.rows
                console.log("执行结果",result[0]?.rows);
                data.reverse()
                // func(data)
                return data
            })
          } catch (error) {
            console.error('An error occurred:', error);
            throw error;
          }
      }

    return (
        <SqliteContext.Provider value={{db,openDb,getDbFile,exeSql}}>
            {children}
        </SqliteContext.Provider>
    )
}

export default SqliteProvider

export const useSqlite = () => useContext(SqliteContext)