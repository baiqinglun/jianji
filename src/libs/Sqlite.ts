import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("mydata.db");

const sqls: any = {
  searchAllNotions: "SELECT * FROM notions",
  insertNotion:
    "INSERT INTO notions (id,content,tag,create_time,update_time) VALUES (?, ?, ?, ?,?)",
  updateNotionById:
    "UPDATE notions SET content = ?,update_time = ? WHERE id = ?",
  searchNotionById: "SELECT content FROM notions WHERE id = ?",
  searchTagNameById: "SELECT name FROM tags WHERE id = ?",
  searchTagIdByName: "SELECT id FROM tags WHERE name = ?",
  searchChildrenTagsById: "SELECT name FROM tags WHERE father = ?",
  searchAllTags: "SELECT * FROM tags",
  insertTag:
    "INSERT INTO tags (id,name,father,create_time,update_time) VALUES (?, ?, ?, ?,?)",
};

// 获取远程db数据
const getDbFile = async () => {
  try {
    const dbName = "mydata.db";
    const dbAsset = require("../../assets/data/mydata.db");
    const dbUri = Asset.fromModule(dbAsset).uri;
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
    const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
    if (!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`,
        { intermediates: true },
      );
    }
    await FileSystem.downloadAsync(dbUri, dbFilePath);
    console.log("获取远程数据成功");
  } catch (error) {
    console.error("初始化数据库时出错：", error);
  }
};

const exeSql = async (type: string, data: any[]) => {
  return new Promise((resolve, reject) => {
    try {
      const readOnly = false;
      db
        ?.execAsync([{ sql: sqls[type], args: data }], readOnly)
        .then((result: any) => {
          const rows = result[0]?.rows;
          resolve(rows);
        })
        .catch((error: any) => {
          console.error("An error occurred:", error);
          reject(error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
      reject(error);
    }
  });
};

const MySqlite = { db, getDbFile, exeSql };

export default MySqlite;
