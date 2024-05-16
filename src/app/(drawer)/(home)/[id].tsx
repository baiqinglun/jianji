import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { Dialog } from "@rneui/themed";
import { Colors, defalutSize, FontSize } from "@/constants";
import { CreateNotionModal } from "@/components";
import { useSqlite } from "@/providers/SqliteProvider";

const IdScreen = () => {
  const { id }: any = useLocalSearchParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const notionModalRef: any = useRef(null);
  const { exeSql } = useSqlite();

  const getDataById = async () => {
    exeSql("searchNotionById", [id]).then((res: any) => {
      notionModalRef?.current?.setTextInput(res[0]["content"]);
    });
  };

  useEffect(() => {
    getDataById();
  }, [id]);

  // 取消
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `${id ? "编辑" : "创建"}`,
          headerTitleAlign: "center",
          headerTintColor: Colors.light.other,
        }}
      />
      <CreateNotionModal
        props={{ toggleModal, isModalVisible, id }}
        ref={notionModalRef}
      />
      <View></View>
      <Dialog
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
      >
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            color={Colors.light.tint}
            name="checkmark"
            size={30}
            style={{ marginRight: defalutSize * 0.5 }}
          />
          <Text style={{ fontSize: 20, color: Colors.light.tint }}>
            创建成功
          </Text>
        </View>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 5,
    height: 350,
    width: 300,
    elevation: 2,
  },
  input: {
    backgroundColor: "#fff",
    height: 300,
    textAlignVertical: "top",
    padding: defalutSize,
    fontSize: FontSize.m,
  },
  modalBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancel: {
    color: Colors.light.tagText,
    marginLeft: 10,
    marginTop: 10,
    fontSize: FontSize.m,
  },
});

export default IdScreen;
