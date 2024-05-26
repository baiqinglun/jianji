import { NotionListType, TagListType, UserType } from "@/constants";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import dayjs from "dayjs";
import * as Crypto from "expo-crypto";
import { useSqlite } from "@/providers/SqliteProvider";

type SqliteType = {
  notions: NotionListType;
  tags: TagListType;
  userInformation: UserType;
  contentInformation: ContentInformationProp;
  setNotions: Dispatch<SetStateAction<NotionListType>>;
  getAllNotion: () => Promise<void>;
  addNotion: (textInput: string, tagInput: string) => Promise<void>;
  updateNotion: (textInput: string, id: string) => Promise<void>;
  deleteNotion: (id: string) => Promise<void>;
  getAllTag: () => Promise<void>;
  addTag: (name: string) => Promise<void>;
  updateTag: (name: string, id: string) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  getUserInformation: () => Promise<void>;
  getNotionInformation: () => Promise<void>;
};

const DataContext = createContext<SqliteType>({
  notions: [],
  tags: [],
  userInformation: { name: "", password: "", image: "", create_time: 0 },
  contentInformation: { notionCount: 0, tagCount: 0, dayCount: 0 },
  setNotions: () => {},
  getAllNotion: async () => {},
  addNotion: async (textInput: string, tagInput: string) => {},
  updateNotion: async (textInput: string, id: string) => {},
  deleteNotion: async (id: string) => {},
  getAllTag: async () => {},
  addTag: async (name: string) => {},
  updateTag: async (name: string, id: string) => {},
  deleteTag: async (id: string) => {},
  getUserInformation: async () => {},
  getNotionInformation: async () => {},
});

type ContentInformationProp = {
  notionCount: number;
  tagCount: number;
  dayCount: number;
};

const DataProvider = ({ children }: PropsWithChildren) => {
  const [notions, setNotions] = useState<NotionListType>([]);
  const [tags, setTags] = useState<TagListType>([]);
  const [userInformation, setUserInformation] = useState<UserType>({
    name: "",
    password: "",
    image: "",
    create_time: 0,
  });
  const [contentInformation, setContentInformation] =
    useState<ContentInformationProp>({
      notionCount: 0,
      tagCount: 0,
      dayCount: 0,
    });
  const { exeSql } = useSqlite();

  // 获取全部notion
  const getAllNotion = async () => {
    try {
      let rows: any = [];

      await exeSql("searchAllNotions", []).then(searchAllNotionsRes => {
        rows = searchAllNotionsRes[0].rows;
      });

      // 使用 Promise.all 处理所有异步操作
      const updatedRows: any = await Promise.all(
        rows.map(async (row: any) => {
          const searchTagNameByIdRes = await exeSql("searchTagNameById", [
            row.tag,
          ]);
          row.tag = searchTagNameByIdRes[0].rows[0]?.name;
          return row;
        }),
      );

      setNotions(updatedRows);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // 添加notion
  const addNotion = async (textInput: string, tagInput: string) => {
    const notion_id = Crypto.randomUUID();
    const tag_id = Crypto.randomUUID();
    const create_time: any = dayjs().valueOf();
    const update_time: any = create_time;

    await exeSql("searchTagIdByName", [tagInput]).then(
      (searchTagIdByNameRes: any) => {
        const rows = searchTagIdByNameRes[0].rows;
        if (rows.length > 0) {
          exeSql("insertNotion", [
            notion_id,
            textInput,
            rows[0].id,
            create_time,
            update_time,
          ]).then(() => {});
        } else {
          exeSql("insertTag", [
            tag_id,
            tagInput,
            "null",
            create_time,
            update_time,
          ]).then(insertTagRes => {
            exeSql("insertNotion", [
              notion_id,
              textInput,
              tag_id,
              create_time,
              update_time,
            ]).then(() => {});
          });
        }
      },
    );
  };

  const deleteNotion = async (id: string) => {
    exeSql("deleteNotionById", [id]).then(deleteNotionByIdRes => {});
  };

  // 更新notion
  const updateNotion = async (textInput: string, id: string) => {
    await exeSql("searchNotionById", [id]).then(
      async (searchNotionByIdRes: any) => {
        if (searchNotionByIdRes[0]?.rows[0]?.content === textInput) {
          return;
        }
        const updata_time = dayjs().valueOf();
        await exeSql("updateNotionById", [textInput, updata_time, id]).then(
          () => {},
        );
      },
    );
  };

  // 获取全部tag
  const getAllTag = async () => {
    exeSql("searchAllTags", []).then(searchAllTagsRes => {
      setTags(searchAllTagsRes[0].rows);
    });
  };

  // 添加标签
  const addTag = async (name: string) => {
    const create_time = dayjs().valueOf();
    const update_time = create_time;
    exeSql("insertTag", [
      Crypto.randomUUID(),
      name,
      "",
      create_time,
      update_time,
    ]);
  };

  // 更新标签
  const updateTag = async (name: string, id: string) => {
    const create_time = dayjs().valueOf();
    const update_time = create_time;

    await exeSql("updateTagById", [name, update_time, id]).then(() => {});
  };

  // 删除标签
  const deleteTag = async (id: string) => {
    exeSql("deleteTagById", [id]).then(() => {});
  };

  const getUserInformation = async () => {
    exeSql("searchUser", []).then(searchUserRes => {
      setUserInformation(searchUserRes[0]?.rows[0]);
    });
  };

  const getNotionInformation = async () => {
    const searchNotionCountPromise = exeSql("searchTagCount", []);
    const searchTagCountPromise = exeSql("searchTagCount", []);

    const [searchNotionCountRes, searchTagCountRes] = await Promise.all([
      searchNotionCountPromise,
      searchTagCountPromise,
    ]);

    const dayCount = dayjs(userInformation?.create_time).diff(
      dayjs().valueOf(),
      "days",
    );

    setContentInformation({
      notionCount: searchNotionCountRes[0].rows[0]["COUNT(*)"],
      tagCount: searchTagCountRes[0].rows[0]["COUNT(*)"],
      dayCount,
    });
  };

  return (
    <DataContext.Provider
      value={{
        notions,
        tags,
        setNotions,
        getAllNotion,
        addNotion,
        updateNotion,
        addTag,
        updateTag,
        getAllTag,
        deleteNotion,
        deleteTag,
        getUserInformation,
        getNotionInformation,
        contentInformation,
        userInformation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => useContext(DataContext);
