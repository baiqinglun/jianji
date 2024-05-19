import { View } from "react-native";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Button, Text, Checkbox } from "react-native-paper";
import { Tooltip } from "@rneui/themed";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { NotionType, CartItemType, Colors } from "@/constants";
import { Dialog } from "@/components/Dialog";
import styles from "./CartItem.styles";
import useCartItem from "./CartItem.store";

dayjs.extend(relativeTime);

type Props = {
  notion: NotionType;
  cartType: CartItemType;
  getData: () => void;
  onRefresh: () => void;
};

const CartItem = ({ notion, cartType, getData, onRefresh }: Props) => {
  const {
    isDialog,
    isList,
    setIsList,
    hideDialog,
    shareNotion,
    copyNotionContent,
    editNotion,
    deleteNotion,
    isChecked,
    setIsChecked,
    confirmDeleteNotion,
    cancelDeleteNotion,
  } = useCartItem({ notion, onRefresh });

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
            visible={isList}
            onOpen={() => setIsList(true)}
            onClose={() => setIsList(false)}
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
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => {
                  setIsChecked(!isChecked);
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
          href={{
            pathname: `/${notion.id}`,
          }}
          style={{ height: 70 }}
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
          visible={isDialog}
          onConfirmClick={confirmDeleteNotion}
          onCancelClick={cancelDeleteNotion}
          onDismiss={hideDialog}
        />
      </View>
    </>
  );
};

export default CartItem;
