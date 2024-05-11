import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { FontSize, defalutSize } from "@/constants/Size";
import Colors from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { pasteFromClipboard } from "@/libs/Clipboard";
import * as Crypto from "expo-crypto";
import dayjs from "dayjs";
import { useSqlite } from "@/providers/SqliteProvider";
import { Divider } from "react-native-paper";
import { useData } from "@/providers/DataProvider";
import { windowHeight, windowWidth } from "@/constants/Dimensions";

export default forwardRef(({ props }: any, ref: any) => {
  const [textInput, setTextInput] = useState<string | undefined>("");
  const [tagInput, setTagInput] = useState<string | undefined>("");
  const { exeSql } = useSqlite();
  const [isShowTagsPop, setIsShowTagsPop] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<string>("");
  // 获取父组件传递的值与方法
  const inputRef: any = useRef(null);
  const inputTagRef: any = useRef(null);
  const { toggleModal, isModalVisible, getData, id } = props;
  const { myTags } = useData();

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
      const id = Crypto.randomUUID();
      const create_time: any = dayjs().valueOf();
      const updata_time: any = create_time;

      exeSql("searchTagIdByName", [tagInput]).then(res => {
        if (res.length == 0) {
          const newTagId = Crypto.randomUUID();
          exeSql("insertTag", [
            newTagId,
            tagInput,
            "null",
            create_time,
            updata_time,
          ]).then(res => {
            exeSql("insertNotion", [
              id,
              textInput,
              newTagId,
              create_time,
              updata_time,
            ]).then(() => {
              toggleModal();
              getData();
              setTextInput("");
            });
          });
        }
        exeSql("insertNotion", [
          id,
          textInput,
          res[0]?.id,
          create_time,
          updata_time,
        ]).then(() => {
          toggleModal();
          getData();
          setTextInput("");
        });
      });
    } catch (error) {
      throw error;
    }
  };

  // 渲染标签列表弹窗
  const renderTagPopItem = () => {
    return (
      <View style={styles.tagModal}>
        {isShowTagsPop &&
          myTags?.current
            ?.filter((tagItem: any) =>
              tagItem.name.toLowerCase().includes(tagInput),
            )
            .map((tagItem: any) => {
              let father_name: string = tagItem?.father
                ? (myTags?.current.find(
                    (item: any) => item.id === tagItem?.father,
                  )?.name || "") + "/"
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 5,
    height: windowHeight * 0.5,
    width: windowWidth * 0.8,
    elevation: 2,
  },
  tagInputContainer: {
    height: 40,
  },
  tagIcon: {
    position: "absolute",
    height: 30,
    width: 30,
    left: 5,
    bottom: 5,
  },
  inputTags: {
    flex: 1,
    textAlign: "center",
    paddingVertical: defalutSize,
    fontSize: FontSize.m,
  },
  inputText: {
    backgroundColor: "#fff",
    height: 300,
    textAlignVertical: "top",
    padding: defalutSize,
    fontSize: FontSize.m,
  },
  modalBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: defalutSize,
    marginTop: "auto",
  },
  cancel: {
    color: Colors.light.tagText,
    marginLeft: 10,
    fontSize: FontSize.m,
  },
  tagModal: {
    position: "absolute",
    top: 0,
    left: windowWidth * 0.2,
    width: windowWidth * 0.4,
    backgroundColor: Colors.light.tagBg,
    gap: defalutSize * 0.5,
  },
  tagText: {
    fontSize: FontSize.m,
    color: Colors.light.tagText,
    paddingVertical: defalutSize * 0.1,
    paddingHorizontal: defalutSize * 0.4,
  },
});
