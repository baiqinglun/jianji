import { useState } from "react";
import { copyToClipboard } from "@/libs";

const useCartItem = ({ notion }: any) => {
  const [isDialog, setIsDialog] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);

  const hideDialog = () => setIsDialog(false);

  const toggleDialog = () => {
    setIsDialog(!isDialog);
  };

  const shareNotion = () => {
    setIsList(!isList);
    console.log("分享");
  };
  const copyNotionContent = () => {
    console.log(notion.content);
    copyToClipboard(notion.content);
    setIsList(!isList);
    console.log("复制");
  };
  const editNotion = () => {
    setIsList(!isList);
    console.log("编辑");
  };
  const deleteNotion = () => {
    console.log("删除");
    setIsList(!isList);
    setIsDialog(!isDialog);
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
  };
};

export default useCartItem;
