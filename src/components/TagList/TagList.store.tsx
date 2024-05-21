import { useEffect, useState } from "react";
import { useSqlite } from "@/providers/SqliteProvider";
import { useNavigation } from "expo-router";
import { TagType } from "@/constants";
import { useData } from "@/providers/DataProvider";

const useTagList = () => {
  const [renameModal, setRenameModal] = useState<boolean>(false);
  const [isShowTagDeal, setIsShowTagDeal] = useState<boolean>(false);
  const [isShowTagDelete, setIsShowTagDelete] = useState<boolean>(false);
  const [deleteTagItem, setDeleteItem] = useState<TagType>();
  const [deleteTagModalTitle, setDeleteTagModalTitle] = useState<string>("");
  const [inputTagName, setInputTagName] = useState<string>("");
  const [isShowTagRename, setIsShowTagRename] = useState<boolean>(false);
  const [isTagFolding, setIsTagFolding] = useState<boolean>(true);
  const { exeSql } = useSqlite();
  const { updateTag, getAllTag, addTag, deleteTag, tags } = useData();
  const navigation = useNavigation();
  const tagRename = () => {};

  const addTagModal = () => {
    toggleIsShowTagRename();
  };

  const showTagDeal = (item: TagType) => {
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
  const confirmDeleteTag = async () => {
    await deleteTag(deleteTagItem?.id);
    await getAllTag();
    toggleIsShowTagDelete();
  };

  // 取消删除标签
  const cancelDeleteTag = () => {
    toggleIsShowTagDelete();
  };

  // 重命名标签
  const confirmRenameTag = async () => {
    if (deleteTagItem) {
      await updateTag(inputTagName, deleteTagItem.id);
      await getAllTag();
      toggleIsShowTagRename();
      setDeleteItem({});
      setInputTagName("");
    } else {
      await addTag(inputTagName);
      await getAllTag();
      toggleIsShowTagRename();
      setInputTagName("");
    }
  };

  const cancelRenameTag = () => {
    toggleIsShowTagRename();
  };

  // 返回页面刷新
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {});
    return unsubscribe;
  }, []);

  useEffect(() => {
    const getData = async () => {
      await getAllTag();
    };
    getData();
  }, []);

  useEffect(() => {
    return () => {
      getAllTag();
    };
  }, []);

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
    addTagModal,
  };
};

export default useTagList;
