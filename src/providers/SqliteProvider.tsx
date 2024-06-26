import { Asset } from "expo-asset";
import { PropsWithChildren, createContext, useContext } from "react";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import * as Crypto from "expo-crypto";
import dayjs from "dayjs";

type SqliteType = {
  db: SQLite.SQLiteDatabase | null | any;
  openDb: () => Promise<any>;
  deleteDb: () => Promise<any>;
  initDbFile: () => Promise<any>;
  getDbFile: () => Promise<any>;
  exeSql: (type: string, data: any[]) => Promise<any>;
};

const sqls: any = {
  searchAllNotions: "SELECT * FROM notions",
  insertNotion:
    "INSERT INTO notions (id,content,tag,create_time,update_time) VALUES (?, ?, ?, ?,?)",
  updateNotionById:
    "UPDATE notions SET content = ?,update_time = ? WHERE id = ?",
  searchNotionById: "SELECT content,tag FROM notions WHERE id = ?",
  searchNotionByLike: "SELECT content,tag FROM notions WHERE content LIKE ?",
  searchTagNameById: "SELECT name FROM tags WHERE id = ?",
  searchTagIdByName: "SELECT id FROM tags WHERE name = ?",
  searchChildrenTagsById: "SELECT name FROM tags WHERE father = ?",
  searchAllTags: "SELECT * FROM tags",
  insertTag:
    "INSERT INTO tags (id,name,father,create_time,update_time) VALUES (?, ?, ?, ?,?)",
  deleteNotionById: "DELETE FROM notions WHERE id = ?",
  deleteTagById: "DELETE FROM tags WHERE id = ?",
  updateTagById: "UPDATE tags SET name = ?,update_time = ? WHERE id = ?",
  searchUser: "SELECT * FROM user",
  searchNotionCount: "SELECT COUNT(*) FROM notions",
  searchTagCount: "SELECT COUNT(*) FROM tags",
};

let db = SQLite.openDatabase("mydata2.db");

const SqliteContext = createContext<SqliteType>({
  db: null,
  openDb: async () => {},
  deleteDb: async () => {},
  initDbFile: async () => {},
  getDbFile: async () => {},
  exeSql: async () => {},
});

const SqliteProvider = ({ children }: PropsWithChildren) => {
  // const [db, setDB] = useState<SQLite.SQLiteDatabase>();

  // useEffect(() => {
  //   setDB(SQLite.openDatabase("mydata2.db"));
  // }, []);

  // 打开数据库
  const openDb = async () => {
    console.log("打开数据库");
    db = SQLite.openDatabase("mydata2.db");
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
  const exeSql = async (type: string, data: any[]) => {
    if (db == null) {
      openDb();
    }
    return new Promise((resolve, reject) => {
      if (db != null) {
        try {
          const readOnly = false;
          db
            ?.execAsync([{ sql: sqls[type], args: data }], readOnly)
            .then((result: any) => {
              console.log("result=", type, result);
              resolve(result);
            });
        } catch (error) {
          console.error("An error occurred:", error);
          reject(error);
        }
      }
    });
  };

  // 删除数据库
  const deleteDb = async () => {
    await db?.closeAsync();
    db?.deleteAsync();
  };

  // 初始化db数据库
  const initDbFile = async () => {
    const readOnly = false;
    const notion_id = Crypto.randomUUID();
    const tag_id = Crypto.randomUUID();
    const create_time: any = dayjs().valueOf();
    const update_time: any = create_time;

    if (db == null) {
      openDb();
    }

    await db
      ?.execAsync(
        [
          {
            sql: "CREATE TABLE IF NOT EXISTS notions (id TEXT,content TEXT,tag TEXT,create_time INTEGER,update_time INTEGER)",
            args: [],
          },
          {
            sql: "CREATE TABLE IF NOT EXISTS tags (id TEXT,name TEXT,father TEXT,create_time INTEGER,update_time INTEGER)",
            args: [],
          },
          {
            sql: "CREATE TABLE IF NOT EXISTS user (name TEXT,password TEXT,image TEXT,create_time INTEGER)",
            args: [],
          },
        ],
        readOnly,
      )
      .then(res => {});

    await db
      ?.execAsync(
        [
          {
            sql: "INSERT INTO notions (id,content,tag,create_time,update_time) VALUES (?, ?, ?, ?,?)",
            args: [
              notion_id,
              "C++是一门极其强大的编程语言",
              tag_id,
              create_time,
              update_time,
            ],
          },
          {
            sql: "INSERT INTO tags (id,name,father,create_time,update_time) VALUES (?, ?, ?, ?,?)",
            args: [tag_id, "编程", "", create_time, update_time],
          },
          {
            sql: "INSERT INTO user (name,password,image,create_time) VALUES (?,?, ?,?)",
            args: [
              "大白不太白",
              "123456",
              "https://test-123456-md-images.oss-cn-beijing.aliyuncs.com/img/202405192246485.jpg",
              create_time,
            ],
          },
        ],
        readOnly,
      )
      .then(res => {});

    await db
      ?.execAsync(
        [
          {
            sql: "SELECT * FROM notions",
            args: [],
          },
        ],
        readOnly,
      )
      .then((res: any) => {});
  };

  return (
    <SqliteContext.Provider
      value={{ db, openDb, getDbFile, exeSql, deleteDb, initDbFile }}
    >
      {children}
    </SqliteContext.Provider>
  );
};

export default SqliteProvider;

export const useSqlite = () => useContext(SqliteContext);
