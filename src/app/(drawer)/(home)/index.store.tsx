import { useSqlite } from "@/providers/SqliteProvider";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";

const useIndex = () => {
  const notionModalRef: any = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLodingData, setIsLodingData] = useState(true);
  const [notions, setNotions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { exeSql, deleteDb, initDbFile } = useSqlite();
  const navigation = useNavigation();
  const route = useRoute();

  // 切换模态框
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 获取所有灵感
  const getData = useCallback(async () => {
    setIsLodingData(true); // 设置加载状态为 true

    try {
      const searchAllNotionsRes = await exeSql("searchAllNotions", []);
      const rows = searchAllNotionsRes[0].rows;

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
    } finally {
      setIsLodingData(false);
    }
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
    // deleteDb();
    // initDbFile();
    getData();
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
    setNotions,
    navigation,
  };
};

export default useIndex;
