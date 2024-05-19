import { useEffect, useRef, useState } from "react";
import { useSqlite } from "@/providers/SqliteProvider";
import dayjs from "dayjs";
import * as Crypto from "expo-crypto";

const useCreateNotionModal = ({ id, toggleModal }: any) => {
  const { exeSql } = useSqlite();
  const [textInput, setTextInput] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [isShowTagsPop, setIsShowTagsPop] = useState<boolean>(false);
  const [tags, setTags] = useState([]);

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
    console.log(tagname);
    setIsShowTagsPop(false);
    setTagInput(tagname);
  };

  // 切换模态框
  const inputOnFocus = () => {};

  // 更新数据
  const updata = async () => {
    exeSql("searchNotionById", [id]).then(async (searchNotionByIdRes: any) => {
      if (searchNotionByIdRes[0].rows[0].content === textInput) {
        toggleModal();
        return;
      }
      const updata_time = dayjs().valueOf();
      await exeSql("updateNotionById", [textInput, updata_time, id]).then(
        () => {
          console.log("更新数据成功");
        },
      );
      toggleModal();
    });
  };

  // 创建灵感
  const create = async () => {
    const notion_id = Crypto.randomUUID();
    const tag_id = Crypto.randomUUID();
    const create_time: any = dayjs().valueOf();
    const update_time: any = create_time;

    await exeSql("searchTagIdByName", [tagInput]).then(
      (searchTagIdByNameRes: any) => {
        const rows = searchTagIdByNameRes[0].rows;
        if (rows.length > 0) {
          exeSql("insertNotion", [
            notion_id,
            textInput,
            rows[0].id,
            create_time,
            update_time,
          ]).then(() => {
            console.log("插入notion成功");
          });
        } else {
          exeSql("insertTag", [
            tag_id,
            tagInput,
            "null",
            create_time,
            update_time,
          ]).then(insertTagRes => {
            exeSql("insertNotion", [
              notion_id,
              textInput,
              tag_id,
              create_time,
              update_time,
            ]).then(() => {
              console.log("插入notion成功");
            });
          });
        }
      },
    );

    // 执行成功后的操作
    toggleModal();
    setTextInput("");
  };

  useEffect(() => {
    exeSql("searchAllTags", []).then(searchAllTagsRes => {
      setTags(searchAllTagsRes[0].rows);
    });
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
