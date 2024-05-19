import { useEffect, useState } from "react";
import { useSqlite } from "@/providers/SqliteProvider";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";

const useCustomDrawer = () => {
  const [renameModal, setRenameModal] = useState<boolean>(false);
  const { exeSql } = useSqlite();
  const [tags, setTags] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const tagRename = () => {};

  // 返回页面刷新
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("返回1", route.name);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getData = async () => {
      await exeSql("searchAllTags", []).then(searchAllTagsRes => {
        //   setTags(searchAllTagsRes[0].rows);
        console.log(searchAllTagsRes);
      });
    };
    getData();
    console.log("挂载");
    console.log(tags);
  }, []);
  console.log(tags);

  return {
    renameModal,
    setRenameModal,
    exeSql,
    tags,
    setTags,
    tagRename,
  };
};

export default useCustomDrawer;
