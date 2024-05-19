import { View, Text, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Button, Dialog, List, Portal, TextInput } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { DivideLine, MyDialog } from "@/components";
import { Colors, Images } from "@/constants";
import useCustomDrawer from "./custom-drawer.store";
import styles from "./custom-drawer.style";

const CustomDrawer = () => {
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
    addTag,
  } = useCustomDrawer();

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 顶部用户信息 */}
        <View style={styles.top}>
          <View style={styles.user}>
            {/* <Image style={styles.avater} source={require("../../../assets/images/avater.jpg")}/> */}
            <Image
              style={styles.avater}
              source={Images.avaterImage}
            />
            <Text style={styles.username}>用户名</Text>
          </View>
          <View style={styles.setting}>
            <MaterialIcons
              name="autorenew"
              size={28}
              color={Colors.light.other}
            />
          </View>
        </View>

        {/* 统计信息 */}
        <View style={styles.statistics}>
          <View style={styles.count}>
            <Text
              onPress={() => {
                tagRename();
              }}
              style={styles.countText}
            >
              4
            </Text>
            <Text style={styles.countText1}>简记</Text>
          </View>
          <View style={styles.count}>
            <Text style={styles.countText}>4</Text>
            <Text style={styles.countText1}>标签</Text>
          </View>
          <View style={styles.count}>
            <Text style={styles.countText}>4</Text>
            <Text style={styles.countText1}>天数</Text>
          </View>
        </View>

        <DivideLine
          color={Colors.light.other}
          width={250}
        />

        {/* 导航栏 */}
        <List.Section
          title=""
          style={{ backgroundColor: "#fff" }}
        >
          <Link
            href={"/(drawer)/(home)/"}
            asChild
          >
            <List.Item
              descriptionStyle={{ backgroundColor: "red" }}
              rippleColor={Colors.light.tagBg}
              titleStyle={{ color: Colors.light.defalutText }}
              style={{ backgroundColor: "#fff" }}
              title={"全部简记"}
              left={props => (
                <List.Icon
                  {...props}
                  icon="book-outline"
                />
              )}
              right={props => (
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Text>{4}</Text>
                  <List.Icon
                    {...props}
                    icon="chevron-right"
                  />
                </View>
              )}
            ></List.Item>
          </Link>
        </List.Section>

        <DivideLine
          color={Colors.light.other}
          width={250}
        />

        <View style={styles.tagDeal}>
          <Button
            icon="tag-plus-outline"
            mode="outlined"
            onPress={() => {
              addTag();
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
        {/* 回收站 */}
        <List.Section
          title=""
          style={{ backgroundColor: "#fff" }}
        >
          <Link href={"/(drawer)/(rubbish)/"}>
            <List.Item
              descriptionStyle={{ backgroundColor: "red" }}
              rippleColor={Colors.light.tagBg}
              titleStyle={{ color: Colors.light.defalutText }}
              style={{ backgroundColor: "#fff" }}
              title={"回收站"}
              left={props => (
                <List.Icon
                  {...props}
                  icon="trash-can-outline"
                />
              )}
            ></List.Item>
          </Link>
          <Link href={"/(drawer)/(setting)/"}>
            <List.Item
              descriptionStyle={{ backgroundColor: "red" }}
              rippleColor={Colors.light.tagBg}
              titleStyle={{ color: Colors.light.defalutText }}
              style={{ backgroundColor: "#fff" }}
              title={"设置"}
              left={props => (
                <List.Icon
                  {...props}
                  icon="cog-outline"
                />
              )}
            ></List.Item>
          </Link>
        </List.Section>

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
    </ScrollView>
  );
};

export default CustomDrawer;
