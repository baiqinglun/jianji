import { useState } from "react";
import { copyToClipboard } from "@/libs";
import { router } from "expo-router";
import { useSqlite } from "@/providers/SqliteProvider";

const useCartItem = ({ notion }: any) => {
  const [isDialog, setIsDialog] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const { exeSql } = useSqlite();

  const hideDialog = () => setIsDialog(false);

  const toggleDialog = () => {
    setIsDialog(!isDialog);
  };

  // 分享
  const shareNotion = () => {
    setIsList(!isList);
    console.log("分享");
  };

  // 复制内容
  const copyNotionContent = () => {
    console.log(notion.content);
    copyToClipboard(notion.content);
    setIsList(!isList);
    console.log("复制");
  };

  // 编辑notion
  const editNotion = () => {
    router.navigate(`/${notion.id}`);
    setIsList(!isList);
    console.log("编辑");
  };

  // 删除notion
  const deleteNotion = async () => {
    setIsList(!isList);
    setIsDialog(!isDialog);
  };

  const confirmDeleteNotion = () => {
    exeSql("deleteNotionById", [notion.id]).then(deleteNotionByIdRes => {
      console.log(deleteNotionByIdRes);
      console.log("删除成功");
      setIsList(false);
      setIsDialog(false);
    });
  };

  const cancelDeleteNotion = () => {
    setIsList(false);
    setIsDialog(false);
  };

  return {
    isDialog,
    setIsDialog,
    isList,
    setIsList,
    hideDialog,
    toggleDialog,
    shareNotion,
    copyNotionContent,
    editNotion,
    deleteNotion,
    isChecked,
    setIsChecked,
    confirmDeleteNotion,
    cancelDeleteNotion,
  };
};

export default useCartItem;
