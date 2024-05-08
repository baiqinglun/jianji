import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset'
import * as SQLite from 'expo-sqlite';

export const loadDatabase = async () => {
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
      await FileSystem.downloadAsync(dbUri,dbFilePath);
    }
    const db = await SQLite.openDatabase(dbName)
    console.log("数据库加载成功");
    return db
}

export const searchData = async (db:any) => {
    const readOnly = true;
    await db.transactionAsync(async (tx:any) => {
      const result = await tx.executeSqlAsync('SELECT COUNT(*) FROM NOTIONS', []);
      console.log('Count:', result.rows[0]['COUNT(*)']);
    }, readOnly);
    
}