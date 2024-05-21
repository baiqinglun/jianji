import { useEffect, useRef, useState } from "react";
import { useData } from "@/providers/DataProvider";

type createNotionModalProps = {
  id: string;
  onRefresh: () => void;
  toggleModal: () => void;
  getData: () => void;
};

const useCreateNotionModal = ({
  id,
  onRefresh,
  toggleModal,
  getData,
}: createNotionModalProps) => {
  const [textInput, setTextInput] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [isShowTagsPop, setIsShowTagsPop] = useState<boolean>(false);
  const { updateNotion, addNotion, getAllTag, tags } = useData();

  // 获取父组件传递的值与方法
  const inputRef: any = useRef(null);
  const inputTagRef: any = useRef(null);

  // 显示标签弹窗
  const showTagsPop = () => {
    setIsShowTagsPop(true);
  };

  // 输入框变化
  const inputTagChange = (text: string) => {
    setTagInput(text);
    setIsShowTagsPop(true);
    inputTagRef?.current?.focus();
  };

  // 选择标签后
  const selectTag = (tagid: string, tagname: string) => {
    setIsShowTagsPop(false);
    setTagInput(tagname);
  };

  // 切换模态框
  const inputOnFocus = () => {};

  // 更新数据
  const updata = async () => {
    updateNotion(textInput, id);
    toggleModal();
    onRefresh();
    setTextInput("");
    setTagInput("");
  };

  // 创建灵感
  const create = async () => {
    addNotion(textInput, tagInput);
    // 执行成功后的操作
    toggleModal();
    onRefresh();
    setTextInput("");
    setTagInput("");
  };

  useEffect(() => {
    getAllTag();
  }, []);

  return {
    textInput,
    setTextInput,
    tagInput,
    setTagInput,
    tags,
    isShowTagsPop,
    inputRef,
    inputTagRef,
    showTagsPop,
    inputTagChange,
    selectTag,
    inputOnFocus,
    updata,
    create,
    setIsShowTagsPop,
  };
};

export default useCreateNotionModal;
