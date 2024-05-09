import { Asset } from "expo-asset";
import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

type SqliteType = {
    db:SQLite.SQLiteDatabase | null;
    openDb:()=>void;
    getDbFile:() => void;
    setDb:(str:boolean) => void;
    exeSelectAll:(func:any) => void;
    exeInsert:(data:[],func:any) => void;
}

const SqliteContext = createContext<SqliteType>({
    db:null,
    openDb:()=>{},
    getDbFile:()=>{},
    setDb:()=>{},
    exeSelectAll:()=>{},
    exeInsert:()=>{}
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

    // 查询全部
    const exeSelectAll = async (func:any) => {
        try {
            if(db.current==null){
                console.log("查询全部时数据库不存在");
                openDb()
            }
            const readOnly = false;
            console.log("查询全部时db=",db?.current?._db?._name);
            await db?.current?.execAsync([{ sql: 'SELECT * FROM NOTIONS',args: [] }],readOnly).then((result)=>{
                console.log("查询全部成功");
                const data = result[0]?.rows
                console.log("查询全部结果",result[0]?.rows);
                data.reverse()
                func(data)
            })
          } catch (error) {
            console.error('查询全部An error occurred:', error);
          }
      }

    // 插入
    const exeInsert = async (data:any[],func:any) => {
        try {
            if(db.current==null){
                console.log("插入时数据库不存在");
                openDb()
            }
            const readOnly = false;
            console.log("插入时db=",db);
            await db?.current?.execAsync([{ sql: 'INSERT INTO NOTIONS (content,id,tags,time) VALUES (?, ?, ?, ?)',args: data }],readOnly).then((result)=>{
                console.log('插入成功');
                func()
            })
                     } catch (error) {
            console.error('插入An error occurred:', error);
          }
    }
  
    
    return (
        <SqliteContext.Provider value={{db,openDb,getDbFile,exeSelectAll,exeInsert}}>
            {children}
        </SqliteContext.Provider>
    )
}

export default SqliteProvider

export const useSqlite = () => useContext(SqliteContext)