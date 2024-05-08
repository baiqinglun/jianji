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
    return await SQLite.openDatabase(dbName)
}

// 查询全部
export const exeSelectAll = async (func:any) => {
  try {
    const db = await loadDatabase();
    const readOnly = true;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync('SELECT * FROM NOTIONS', []);
      console.log("查询全部成功");
      await func(result.rows);
    }, readOnly);
    await db.closeAsync();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// 通过id查询
export const exeSelectById = async (id:any,func:any) => {
  try{
    const db = await loadDatabase()
    await db.transaction(
      async(tx:any) => {
        await tx.executeSql('SELECT content FROM notions WHERE id = ?', [id], async(_:any, resultSet:any) => {
          // 处理查询结果
          if (resultSet.rows.length > 0) {
            console.log("通过id查询成功");
            const {content} = resultSet.rows.item(0); // 假设只返回一行，取第一行的 ID
            await func(content)
            await db.closeAsync()
          } else {
            console.log("No matching rows found.");
          }
        },
        (_:any, error:any):any => {
          // 查询失败时的操作
          console.log("查询失败 ", error);
        });
      },
      (error:any) => console.log("Transaction Error: ", error),
      () => console.log("Transaction Success!")
    );
  }catch(error){
    console.error('An error occurred:', error);
  }
}

// 插入
export const exeInsert = async (data:any,func:any) => {
  try{
    const db = await loadDatabase()
    console.log(db.transaction);
    await db.transaction(async(tx:any) => {
      await tx.executeSql(
        'INSERT INTO notions (id,content,tags,time) VALUES (?, ?, ?, ?)',
        data,
        async() => {
          console.log('插入成功');
          await db.closeAsync()
          await func()
        },
        (tx:any, error:any):any => {
          console.log('插入失败：' + error.message);
        },
      );
    });
  }catch(error){
    console.error('An error occurred:', error);
  }
}