import { pasteFromClipboard } from "./Clipboard";
import { removeLine } from "./DealString";
import MySqlite from "./Sqlite";

const { db, getDbFile, exeSql } = MySqlite;

export { pasteFromClipboard, removeLine, MySqlite };

export { db, getDbFile, exeSql };
