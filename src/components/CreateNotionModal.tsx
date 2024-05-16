// 核心库
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { View, Text, TextInput, Pressable } from "react-native";

// 第三方库
import { Ionicons } from "@expo/vector-icons";
import * as Crypto from "expo-crypto";
import dayjs from "dayjs";
import { exeSql } from "@/libs/Sqlite";
import { Divider } from "react-native-paper";

// 自定义库
import { pasteFromClipboard } from "@/libs/Clipboard";
import Colors from "@/constants/Colors";
import styles from "./CreateNotionModal.styles";

export default forwardRef(({ props }: any, ref: any) => {
  const [textInput, setTextInput] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [isShowTagsPop, setIsShowTagsPop] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>("");
  // 获取父组件传递的值与方法
  const inputRef: any = useRef(null);
  const inputTagRef: any = useRef(null);
  const { toggleModal, isModalVisible, getData, id, tags } = props;

  // 向外导出的函数
  useImperativeHandle(ref, () => ({
    inputOnFocus,
    setTextInput,
  }));

  // 显示标签弹窗
  const showTagsPop = () => {
    console.log("show");
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
    setSelectedTag(tagid);
    setIsShowTagsPop(false);
    setTagInput(tagname);
  };

  // 切换模态框
  const inputOnFocus = () => {
    console.log(111);
  };

  // 更新数据
  const updata = async () => {
    try {
      exeSql("searchNotionById", [id]).then((res: any) => {
        if (res[0]["content"] == textInput) {
          toggleModal();
          return;
        }
        const updata_time = dayjs().valueOf();
        exeSql("updateNotionById", [textInput, updata_time, id]).then(() => {
          console.log("更新数据成功");
        });
        toggleModal();
      });
    } catch (error) {
      throw error;
    }
  };

  // 创建灵感
  const create = async () => {
    try {
      const notion_id = Crypto.randomUUID();
      const tag_id = Crypto.randomUUID();
      const create_time: any = dayjs().valueOf();
      const update_time: any = create_time;

      const tagId: any = await exeSql("searchTagIdByName", [tagInput]);
      if (tagId.length > 0) {
        // 标签已存在，直接插入灵感
        await insertNotion(
          notion_id,
          textInput,
          tagId[0].id,
          create_time,
          update_time,
        );
      } else {
        // 标签不存在，先插入标签，再插入灵感
        const newTagId = await insertTag(
          tag_id,
          tagInput,
          "",
          create_time,
          update_time,
        );
        await insertNotion(
          notion_id,
          textInput,
          newTagId,
          create_time,
          update_time,
        );
      }

      // 执行成功后的操作
      toggleModal();
      getData();
      setTextInput("");
    } catch (error) {
      throw error;
    }
  };

  // 插入标签
  async function insertTag(
    tag_id: string,
    tagInput: string,
    father: string,
    create_time: any,
    update_time: any,
  ) {
    const res: any = await exeSql("insertTag", [
      tag_id,
      tagInput,
      father,
      create_time,
      update_time,
    ]);
    return res[0].id;
  }

  // 插入灵感
  async function insertNotion(
    notion_id: string,
    textInput: string,
    tagId: string,
    create_time: any,
    update_time: any,
  ) {
    await exeSql("insertNotion", [
      notion_id,
      textInput,
      tagId,
      create_time,
      update_time,
    ]);
  }

  // 渲染标签列表弹窗
  const renderTagPopItem = () => {
    return (
      <View style={styles.tagModal}>
        {isShowTagsPop &&
          tags
            ?.filter((tagItem: any) =>
              tagItem.name.toLowerCase().includes(tagInput),
            )
            .map((tagItem: any) => {
              let father_name: string = tagItem?.father
                ? (tags?.find((item: any) => item.id === tagItem?.father)
                    ?.name || "") + "/"
                : "";
              // 如果father_name为/（表示没有father），则重新赋值为空
              father_name = father_name === "/" ? "" : father_name;
              return (
                <Text
                  onPress={() => {
                    selectTag(tagItem.id, `${father_name}${tagItem.name}`);
                  }}
                  style={styles.tagText}
                  key={tagItem.id}
                >
                  #{father_name}
                  {tagItem.name}
                </Text>
              );
            })}
      </View>
    );
  };

  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* 上部标签输入 */}
          <View style={styles.tagInputContainer}>
            <Pressable
              style={styles.tagIcon}
              onPress={() => {
                console.log(555);
                setIsShowTagsPop(!isShowTagsPop);
              }}
            >
              <Ionicons
                color={Colors.light.tint}
                name="pricetags-outline"
                size={27}
              />
            </Pressable>
            <TextInput
              style={styles.inputTags}
              onFocus={() => {
                showTagsPop();
              }}
              maxLength={20}
              value={tagInput}
              ref={inputTagRef}
              onChangeText={text => {
                inputTagChange(text);
              }}
              onBlur={() => {
                setIsShowTagsPop(false);
              }}
            />
          </View>

          {/* 分割线 */}
          <Divider />

          {/* 内容输入框 */}
          <View
            style={{
              backgroundColor: "red",
            }}
          >
            <TextInput
              multiline={true}
              style={styles.inputText}
              maxLength={1000}
              // autoFocus={true}
              value={textInput}
              ref={inputRef}
              onBlur={() => {}}
              onChangeText={text => {
                setTextInput(text);
              }}
            ></TextInput>

            {/* 显示tags弹窗 */}
            {renderTagPopItem()}
          </View>

          {/* 底部按钮 */}
          <View style={styles.modalBtn}>
            <Pressable
              onPress={() => {
                toggleModal();
              }}
            >
              {/* <Pressable onPress={()=>{} }> */}
              {({}) => <Text style={styles.cancel}>取消</Text>}
            </Pressable>
            <Pressable
              onPress={() => {
                setTextInput("");
              }}
            >
              {({}) => <Text style={styles.cancel}>清空</Text>}
            </Pressable>
            <Pressable
              onPress={async () => {
                inputRef?.current?.focus();
                setIsShowTagsPop(false);
                setTextInput(await pasteFromClipboard(textInput));
              }}
            >
              {({ pressed }) => (
                <Ionicons
                  color={Colors.light.tint}
                  name="clipboard-outline"
                  size={30}
                  style={{
                    marginRight: 15,
                    opacity: pressed ? 0.5 : 1,
                  }}
                />
              )}
            </Pressable>

            <Pressable
              onPress={() => {
                id ? updata() : create();
              }}
            >
              {({ pressed }) => (
                <Ionicons
                  color={Colors.light.tint}
                  name="send-outline"
                  size={30}
                  style={{
                    marginRight: 15,
                    opacity: pressed ? 0.5 : 1,
                  }}
                />
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
});
