import { View } from "react-native";
import { Link } from "expo-router";
import { Button, Dialog, List, Portal, TextInput } from "react-native-paper";
import { DivideLine } from "@/components/DivideLine";
import { MyDialog } from "@/components/Dialog";

import { Colors } from "@/constants";

import styles from "./TagList.style";
import useTagList from "./TagList.store";

const TagList = () => {
  const {
    tags,
    inputTagName,
    deleteTagModalTitle,
    setInputTagName,
    showTagDeal,
    tagRename,
    confirmDeleteTag,
    cancelDeleteTag,
    confirmRenameTag,
    cancelRenameTag,
    isShowTagDeal,
    isShowTagDelete,
    dismissTagDelete,
    isShowTagRename,
    toggleIsShowTagRename,
    toggleIsShowTagDelete,
    toggleIsShowTagDeal,
    isTagFolding,
    setIsTagFolding,
    dismissTagRename,
    dismissTagDeal,
    addTagModal,
  } = useTagList();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.tagDeal}>
        <Button
          icon="tag-plus-outline"
          mode="outlined"
          onPress={() => {
            addTagModal();
          }}
        >
          添加标签
        </Button>
        <Button
          icon={isTagFolding ? "arrow-down" : "arrow-up"}
          mode="outlined"
          onPress={() => console.log(setIsTagFolding(!isTagFolding))}
        >
          {isTagFolding ? "折叠" : "展开"}标签
        </Button>
      </View>

      {/* 标签栏 */}
      {isTagFolding && (
        <List.Section
          title=""
          style={{ backgroundColor: "#fff" }}
        >
          {tags
            .filter((item1: any) => {
              return item1.father === "";
            })
            .map((item2: any) => (
              <List.Accordion
                key={item2.id}
                onPress={() => {
                  tagRename();
                }}
                onLongPress={() => {
                  showTagDeal(item2);
                }}
                descriptionStyle={{ backgroundColor: "red" }}
                rippleColor={Colors.light.tagBg}
                titleStyle={{ color: Colors.light.defalutText }}
                style={{ backgroundColor: "#fff" }}
                title={item2.name}
                left={props => (
                  <List.Icon
                    {...props}
                    icon="tag-outline"
                  />
                )}
              >
                {tags
                  .filter((item3: any) => {
                    return item3.father === item2.id;
                  })
                  .map((item4: any) => (
                    <List.Item
                      key={item4.name}
                      title={item4.name}
                    ></List.Item>
                  ))}
              </List.Accordion>
            ))}
        </List.Section>
      )}

      <DivideLine
        color={Colors.light.other}
        width={250}
      />

      <Portal>
        <Dialog
          style={styles.tagDealDialog}
          visible={isShowTagDeal}
          onDismiss={dismissTagDeal}
        >
          <Dialog.Content>
            <Button
              textColor={Colors.light.defalutText}
              onPress={() => {
                toggleIsShowTagRename();
                toggleIsShowTagDeal();
              }}
            >
              重命名
            </Button>
            <Button
              textColor="red"
              onPress={() => {
                toggleIsShowTagDelete();
                toggleIsShowTagDeal();
              }}
            >
              删除
            </Button>
          </Dialog.Content>
        </Dialog>
      </Portal>

      {/* 重命名 */}
      <Portal>
        <Dialog
          style={styles.tagDealDialog}
          visible={isShowTagRename}
          onDismiss={dismissTagRename}
        >
          <Dialog.Content>
            <TextInput
              value={inputTagName}
              onChangeText={text => setInputTagName(text)}
            />
            <Dialog.Actions>
              <Button
                textColor="red"
                onPress={() => {
                  confirmRenameTag();
                }}
              >
                确认
              </Button>
              <Button
                textColor="red"
                onPress={() => {
                  cancelRenameTag();
                }}
              >
                取消
              </Button>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog>
      </Portal>

      {/* 删除 */}
      <MyDialog
        content={deleteTagModalTitle}
        visible={isShowTagDelete}
        onConfirmClick={confirmDeleteTag}
        onCancelClick={cancelDeleteTag}
        onDismiss={dismissTagDelete}
      />
    </View>
  );
};

export default TagList;
