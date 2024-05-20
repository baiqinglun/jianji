import { NotionListType, TagListType } from "@/constants";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type SqliteType = {
  notions: NotionListType;
  tags: TagListType;
};

const DataContext = createContext<SqliteType>({
  notions: [],
  tags: [],
});

const DataProvider = ({ children }: PropsWithChildren) => {
  const [notions, setNotions] = useState<NotionListType>([]);
  const [tags, setTags] = useState<TagListType>([]);

  const addNotion = async () => {};

  const addTag = async () => {};

  const updateNotion = async () => {};

  const updateTag = async () => {};

  return (
    <DataContext.Provider value={{ notions, tags }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => useContext(DataContext);
