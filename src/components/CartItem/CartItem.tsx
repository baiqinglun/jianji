import { useState } from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Button, Text, Checkbox } from "react-native-paper";
import { Tooltip } from "@rneui/themed";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { Colors } from "@/constants";
import { Dialog } from "@/components";
import styles from "./CartItem.styles";

dayjs.extend(relativeTime);

const CartItem = ({ notion, cartType, func }: any) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [checked, setChecked] = useState(false);

  const hideDialog = () => setDeleteVisible(false);

  const toggleDialog = () => {
    setDeleteVisible(!deleteVisible);
  };

  const shareNotion = () => {
    setOpenList(!openList);
    console.log("分享");
  };
  const copyNotionContent = () => {
    setOpenList(!openList);
    console.log("复制");
  };
  const editNotion = () => {
    setOpenList(!openList);
    console.log("编辑");
  };
  const deleteNotion = () => {
    console.log("删除");
    setOpenList(!openList);
    setDeleteVisible(!deleteVisible);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.time}>
          <Text style={styles.timeText}>
            {cartType == "show"
              ? dayjs(notion.update_time).format("YYYY-MM-DD HH:mm:ss")
              : dayjs(notion.update_time).fromNow()}
          </Text>
          {/* 弹窗 */}
          <Tooltip
            visible={openList}
            onOpen={() => setOpenList(true)}
            onClose={() => setOpenList(false)}
            width={100}
            height={200}
            backgroundColor={Colors.light.background}
            popover={
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  paddingVertical: 10,
                }}
              >
                <Button
                  style={{ width: "100%" }}
                  textColor={Colors.light.defalutText}
                  onPress={() => copyNotionContent()}
                >
                  复制
                </Button>
                <Button
                  style={{ width: "100%" }}
                  textColor={Colors.light.defalutText}
                  onPress={() => shareNotion()}
                >
                  分享
                </Button>
                <Button
                  style={{ width: "100%" }}
                  textColor={Colors.light.defalutText}
                  onPress={() => editNotion()}
                >
                  编辑
                </Button>
                <Button
                  style={{ width: "100%" }}
                  textColor="red"
                  onPress={() => deleteNotion()}
                >
                  删除
                </Button>
              </View>
            }
          >
            {cartType == "show" ? (
              <MaterialIcons
                name="more-horiz"
                color={Colors.light.other}
                size={20}
              />
            ) : (
              <Checkbox
                color={Colors.light.tint}
                status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
            )}
          </Tooltip>
        </View>

        {/* 标签 */}
        <View style={[styles.tag]}>
          <MaterialIcons
            name="sell"
            color={Colors.light.tagText}
            size={15}
          />
          <Text style={styles.tagText}>{notion.tag}</Text>
        </View>

        {/* 内容 */}
        <Link
          style={{ height: 70 }}
          href={{
            pathname: `/${notion.id}`,
            params: { func: func },
          }}
        >
          <Text
            numberOfLines={1}
            style={styles.content}
          >
            {notion.content}
          </Text>
        </Link>

        {/* 是否删除弹窗 */}
        <Dialog
          content={notion.content}
          visible={deleteVisible}
          onConfirmClick={toggleDialog}
          onCancelClick={toggleDialog}
          onDismiss={hideDialog}
        />
      </View>
    </>
  );
};

export default CartItem;
