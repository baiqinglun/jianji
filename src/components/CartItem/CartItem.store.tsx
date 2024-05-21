import { useState } from "react";
import { copyToClipboard } from "@/libs";
import { router } from "expo-router";
import { NotionType } from "@/constants";
import { useData } from "@/providers/DataProvider";

type Props = {
  notion: NotionType;
  onRefresh: () => void;
};

const useCartItem = ({ notion, onRefresh }: Props) => {
  const [isDialog, setIsDialog] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const { deleteNotion } = useData();

  const hideDialog = () => setIsDialog(false);

  const toggleDialog = () => {
    setIsDialog(!isDialog);
  };

  // 分享
  const shareNotion = () => {
    setIsList(!isList);
  };

  // 复制内容
  const copyNotionContent = () => {
    copyToClipboard(notion.content);
    setIsList(!isList);
  };

  // 编辑notion
  const editNotion = () => {
    router.navigate(`/${notion.id}`);
    setIsList(!isList);
  };

  // 删除notion
  const deleteNotionModal = async () => {
    setIsList(!isList);
    setIsDialog(!isDialog);
  };

  const confirmDeleteNotion = () => {
    deleteNotion(notion.id);
    setIsList(false);
    setIsDialog(false);
    onRefresh();
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
    deleteNotionModal,
    isChecked,
    setIsChecked,
    confirmDeleteNotion,
    cancelDeleteNotion,
  };
};

export default useCartItem;
