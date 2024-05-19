import { useEffect, useState } from "react";
import { useSqlite } from "@/providers/SqliteProvider";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { TagType } from "@/constants";
import dayjs from "dayjs";
import * as Crypto from "expo-crypto";

const useTagList = () => {
  const [renameModal, setRenameModal] = useState<boolean>(false);
  const [tags, setTags] = useState([]);
  const [isShowTagDeal, setIsShowTagDeal] = useState<boolean>(false);
  const [isShowTagDelete, setIsShowTagDelete] = useState<boolean>(false);
  const [deleteTagItem, setDeleteItem] = useState<TagType>();
  const [deleteTagModalTitle, setDeleteTagModalTitle] = useState<string>("");
  const [inputTagName, setInputTagName] = useState<string>("");
  const [isShowTagRename, setIsShowTagRename] = useState<boolean>(false);
  const [isTagFolding, setIsTagFolding] = useState<boolean>(true);
  const { exeSql } = useSqlite();
  const navigation = useNavigation();
  const route = useRoute();
  const tagRename = () => {};

  const addTag = () => {
    console.log("添加标签");
    toggleIsShowTagRename();
  };

  const showTagDeal = (item: TagType) => {
    console.log("点击", item);
    setDeleteItem(item);
    setDeleteTagModalTitle(item.name);
    setIsShowTagDeal(true);
  };

  // 转化重命名标签弹窗
  const toggleIsShowTagRename = () => {
    setIsShowTagRename(!isShowTagRename);
  };
  // 转化删除标签弹窗
  const toggleIsShowTagDelete = () => {
    setIsShowTagDelete(!isShowTagDelete);
  };
  // 转化处理标签弹窗
  const toggleIsShowTagDeal = () => {
    setIsShowTagDeal(!isShowTagDeal);
  };

  const dismissTagDelete = () => {
    setIsShowTagDelete(false);
  };
  const dismissTagRename = () => {
    setIsShowTagRename(false);
  };
  const dismissTagDeal = () => {
    setIsShowTagDeal(false);
  };

  // 确认删除标签
  const confirmDeleteTag = () => {
    exeSql("deleteTagById", [deleteTagItem?.id]).then(() => {
      console.log("删除成功");
      getTags();
      toggleIsShowTagDelete();
    });
  };

  // 取消删除标签
  const cancelDeleteTag = () => {
    toggleIsShowTagDelete();
  };

  // 重命名标签
  const confirmRenameTag = async () => {
    const create_time = dayjs().valueOf();
    const update_time = create_time;

    if (deleteTagItem) {
      await exeSql("updateTagById", [
        inputTagName,
        update_time,
        deleteTagItem?.id,
      ]).then(() => {
        console.log("重命名标签成功");
        getTags();
        toggleIsShowTagRename();
        setDeleteItem({});
        setInputTagName("");
      });
    } else {
      exeSql("insertTag", [
        Crypto.randomUUID(),
        inputTagName,
        "",
        create_time,
        update_time,
      ]).then(() => {
        console.log("添加标签成功");
        getTags();
        toggleIsShowTagRename();
        setInputTagName("");
      });
    }
  };

  const cancelRenameTag = () => {
    toggleIsShowTagRename();
  };

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
        setTags(searchAllTagsRes[0].rows);
        console.log(searchAllTagsRes);
      });
    };
    getData();
    console.log(tags);
  }, []);

  useEffect(() => {
    console.log("挂载");
    return () => {
      console.log("卸载");
      exeSql("searchAllTags", []).then(searchAllTagsRes => {
        // setTags(searchAllTagsRes[0].rows);
        console.log(searchAllTagsRes[0].rows);
        // setTags(searchAllTagsRes[0].rows);
      });
    };
  }, []);

  const getTags = async () => {
    await exeSql("searchAllTags", []).then(searchAllTagsRes => {
      setTags(searchAllTagsRes[0].rows);
      console.log(searchAllTagsRes);
    });
  };

  return {
    renameModal,
    setRenameModal,
    exeSql,
    tags,
    tagRename,
    showTagDeal,
    deleteTagModalTitle,
    deleteTagItem,
    confirmDeleteTag,
    cancelDeleteTag,
    confirmRenameTag,
    cancelRenameTag,
    inputTagName,
    setInputTagName,
    isShowTagDeal,
    isShowTagDelete,
    isShowTagRename,
    toggleIsShowTagRename,
    toggleIsShowTagDelete,
    toggleIsShowTagDeal,
    dismissTagDelete,
    dismissTagRename,
    dismissTagDeal,
    isTagFolding,
    setIsTagFolding,
    addTag,
  };
};

export default useTagList;
