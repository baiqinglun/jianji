import { Asset } from "expo-asset";
import { PropsWithChildren, createContext, useContext, useRef } from "react";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

type SqliteType = {
  db: SQLite.SQLiteDatabase | null | any;
  openDb: () => void;
  getDbFile: () => void;
  exeSql: (type: string, data: any[]) => Promise<any>;
};

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

const SqliteContext = createContext<SqliteType>({
  db: null,
  openDb: () => {},
  getDbFile: () => {},
  exeSql: async () => {},
});

const SqliteProvider = ({ children }: PropsWithChildren) => {
  const db = useRef<null | SQLite.SQLiteDatabase>(null);

  // 打开数据库
  const openDb = () => {
    console.log("打开数据库");
    db.current = SQLite.openDatabase("mydata.db", "3");
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

  // 执行语句
  // const exeSql = async (type: string, data: any[]) => {
  //   try {
  //     if (db.current == null) {
  //       console.log("数据库不存在");
  //       openDb();
  //     }
  //     const readOnly = false;
  //     return db?.current
  //       ?.execAsync([{ sql: sqls[type], args: data }], readOnly)
  //       .then((result: any) => {
  //         const data = result[0]?.rows;
  //         console.log("执行结果", result[0]?.rows);
  //         return data;
  //       });
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     throw error;
  //   }
  // };
  // const exeSql = async (type: string, data: any[]) => {
  //   try {
  //     if (db.current == null) {
  //       console.log("数据库不存在");
  //       openDb();
  //     }
  //     const readOnly = false;
  //     const result = await db?.current?.transactionAsync(async (tx: any) => {
  //       return tx.executeSqlAsync(sqls[type], data).then((res: any) => {
  //         console.log("数据1:", res);
  //         return res;
  //       });
  //     });
  //     console.log("result=", result);
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     throw error;
  //   }
  // };

  const exeSql = async (type: string, data: any[]) => {
    console.log(data);

    try {
      if (db.current == null) {
        console.log("数据库不存在");
        openDb();
      }
      const readOnly = false;
      const result = await new Promise((resolve, reject) => {
        db?.current?.transactionAsync(async (tx: any) => {
          try {
            const res = await tx.executeSqlAsync(sqls[type], data);
            console.log("数据1:", res);
            resolve(res);
          } catch (error) {
            reject(error);
          }
        });
      });
      console.log("result=", result);
      return result;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  };

  return (
    <SqliteContext.Provider value={{ db, openDb, getDbFile, exeSql }}>
      {children}
    </SqliteContext.Provider>
  );
};

export default SqliteProvider;

export const useSqlite = () => useContext(SqliteContext);
