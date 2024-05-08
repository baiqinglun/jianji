import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset'
import * as SQLite from 'expo-sqlite';

export const loadDatabase = async () => {
  console.log("开启数据库");
  
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
    return await SQLite.openDatabase(dbName)
}

// 查询全部
export const exeSelectAll = async (func:any) => {
  try {
    const db = await loadDatabase();
    const readOnly = true;
    await db.transactionAsync(async (tx:any) => {
      const result = await tx.executeSqlAsync('SELECT * FROM NOTIONS', []);
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

// 通过id查询
export const exeSelectById = async (id:any,func:any) => {
  try {
    const db = await loadDatabase();
    const readOnly = true;
    await db.transactionAsync(async (tx) => {
      const result:any = await tx.executeSqlAsync('SELECT content FROM notions WHERE id = ?', [id]);
      if (result.rows.length > 0) {
        console.log("通过id查询成功",result["rows"][0]);
        const {content} = result["rows"][0]; // 假设只返回一行，取第一行的 ID
        await func(content)
        // await db.closeAsync()
      } else {
        console.log("No matching rows found.");
      }
    }, readOnly);
  } catch (error) {
    console.error('通过id查询An error occurred:', error);
  }
}

// 插入
export const exeInsert = async (data:any,func:any) => {
  try {
    const db = await loadDatabase();
    console.log(db);
    
    await db.transactionAsync(async (tx) => {
      await tx.executeSqlAsync('INSERT INTO notions (id,content,tags,time) VALUES (?, ?, ?, ?)', data);
      console.log('插入成功');
      // await db.closeAsync()
      await func()
    });
  } catch (error) {
    console.error('插入An error occurred:', error);
  }
}

// 更改数据
export const exeUpdate = async (data:any,func:any) => {
  try {
    const db = await loadDatabase();
    await db.transactionAsync(async (tx) => {
      await tx.executeSqlAsync('UPDATE notions SET content = ? WHERE id = ?', data);
      console.log("更改成功");
      await func()
    });
  } catch (error) {
    console.error('更改数据 error occurred:', error);
  }
}