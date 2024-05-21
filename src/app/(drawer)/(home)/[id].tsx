import { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Stack, router, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { Dialog } from "@rneui/themed";
import { Colors, defalutSize, FontSize } from "@/constants";
import { CreateNotionModal } from "@/components";
import { useSqlite } from "@/providers/SqliteProvider";
import { useRoute } from "@react-navigation/native";

type IdScreenProps = {
  id: string;
};

const IdScreen = () => {
  const { id }: Partial<IdScreenProps> = useLocalSearchParams();
  const route = useRoute();
  const { params }: any = route;
  // const onRefresh = new Function(`return ${params.onRefreshString}`)();
  const onRefresh = params.onRefresh;

  const [isModalVisible, setModalVisible] = useState(false);
  const notionModalRef: any = useRef(null);
  const { exeSql } = useSqlite();

  // 通过传过来的id获取信息
  const getDataById = async () => {
    exeSql("searchNotionById", [id]).then((searchNotionByIdRes: any) => {
      notionModalRef?.current?.setTextInput(
        searchNotionByIdRes[0].rows[0].content,
      );
      exeSql("searchTagNameById", [searchNotionByIdRes[0].rows[0].tag]).then(
        searchTagNameByIdRes => {
          searchTagNameByIdRes;

          notionModalRef?.current?.setTagInput(
            searchTagNameByIdRes[0].rows[0].name,
          );
        },
      );
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
        props={{ toggleModal, id, onRefresh }}
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
