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
    exeInsert:(data:any[],func:any) => void;
    exeSelectById:(id:string,func:any) => void;
    exeUpdate:(data:any[]) => Promise<void>;
}

const SqliteContext = createContext<SqliteType>({
    db:null,
    openDb:()=>{},
    getDbFile:()=>{},
    setDb:()=>{},
    exeSelectAll:()=>{},
    exeInsert:()=>{},
    exeSelectById:()=>{},
    exeUpdate:async()=>{}
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
            await db?.current?.execAsync([{ sql: 'SELECT * FROM NOTIONS',args: [] }],readOnly).then((result:any)=>{
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

    // 通过id查询
    const exeSelectById = async (id:any,func:any) => {
        try {
            if(db.current==null){
                console.log("通过id查询时数据库不存在");
                openDb()
            }
            const readOnly = false;
            await db?.current?.execAsync([{ sql: 'SELECT content FROM notions WHERE id = ?',args: [id] }],readOnly).then((result:any)=>{
                if (result[0]?.rows?.length > 0) {
                    console.log("通过id查询成功",result[0].rows[0]);
                    const {content} = result[0].rows[0]; // 假设只返回一行，取第一行的 ID
                    func(content)
                } else {
                console.log("No matching rows found.");
                }
            })
          } catch (error) {
            console.error('通过id查询An error occurred:', error);
          }
    }

    
    // 更改数据
    const exeUpdate = async (data:any) => {
        try {
            if(db.current==null){
                console.log("通过id查询时数据库不存在");
                openDb()
            }
            const readOnly = false;
            await db?.current?.execAsync([{ sql: 'UPDATE notions SET content = ? WHERE id = ?',args: data }],readOnly).then((result:any)=>{
                console.log("更改成功");
            })
          } catch (error) {
            console.error('更改数据An error occurred:', error);
          }
    }

    return (
        <SqliteContext.Provider value={{db,openDb,getDbFile,exeSelectAll,exeInsert,exeSelectById,exeUpdate}}>
            {children}
        </SqliteContext.Provider>
    )
}

export default SqliteProvider

export const useSqlite = () => useContext(SqliteContext)