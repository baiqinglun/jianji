import React, { forwardRef, useImperativeHandle } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";

// 自定义库
import useCreateNotionModal from "./CreateNotionModal.store";
import styles from "./CreateNotionModal.styles";
import { pasteFromClipboard } from "@/libs";
import { Colors } from "@/constants";

type createNotionModalProps = {
  id: string;
  onRefresh: () => void;
  toggleModal: () => void;
  getData: () => void;
};

type Props = {
  props: createNotionModalProps;
};

const CreateNotionModal = forwardRef(({ props }: Props, ref: any) => {
  const { toggleModal, id, onRefresh, getData } = props;

  const {
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
  } = useCreateNotionModal({ id, toggleModal, onRefresh, getData });

  // 向外导出的函数
  useImperativeHandle(ref, () => ({
    inputOnFocus,
    setTextInput,
    setTagInput,
  }));

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
              {() => <Text style={styles.cancel}>取消</Text>}
            </Pressable>
            <Pressable
              onPress={() => {
                setTextInput("");
              }}
            >
              {() => <Text style={styles.cancel}>清空</Text>}
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
                if (id) {
                  updata();
                } else {
                  create();
                }
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

export default CreateNotionModal;
