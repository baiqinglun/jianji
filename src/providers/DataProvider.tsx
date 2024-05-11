import { Asset } from "expo-asset";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

type DataType = {
  notions: any[];
  myTags: any[];
  setTags: (value: string) => void;
  setAllNotions: (value: string) => void;
};

const DataContext = createContext<DataType | any>({
  notions: [],
  myTags: [],
  setTags: () => {},
  setAllNotions: () => {},
});

const DataProvider = ({ children }: PropsWithChildren) => {
  const notions = useRef<any[]>([]);
  const myTags = useRef<any[]>([]);

  const setTags = (value: any) => {
    myTags.current = value;
  };

  const setAllNotions = (value: any) => {
    notions.current = value;
  };

  return (
    <DataContext.Provider value={{ notions, setAllNotions, myTags, setTags }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => useContext(DataContext);
