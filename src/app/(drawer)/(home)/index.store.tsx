import { useSqlite } from "@/providers/SqliteProvider";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useData } from "@/providers/DataProvider";

const useIndex = () => {
  const notionModalRef: any = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLodingData, setIsLodingData] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { exeSql, deleteDb, initDbFile } = useSqlite();
  const navigation = useNavigation();
  const { notions, getAllNotion, setNotions } = useData();

  // 切换模态框
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 获取所有灵感
  const getData = useCallback(async () => {
    setIsLodingData(true); // 设置加载状态为 true
    await getAllNotion();
    setIsLodingData(false);
  }, [setNotions, setIsLodingData]);

  // 数据刷新
  const onRefresh = () => {
    getData();
  };

  // 监听页面刷新
  useEffect(() => {
    onRefresh();
  }, [getData]);

  // 返回页面刷新
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onRefresh();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getAllNotion();
    // deleteDb();
    // initDbFile();
    // getData();
    // onRefresh();
  }, []);

  return {
    notions,
    isLodingData,
    refreshing,
    onRefresh,
    notionModalRef,
    isModalVisible,
    toggleModal,
    setModalVisible,
    setIsLodingData,
    setRefreshing,
    getData,
    deleteDb,
    initDbFile,
    exeSql,
    navigation,
  };
};

export default useIndex;
