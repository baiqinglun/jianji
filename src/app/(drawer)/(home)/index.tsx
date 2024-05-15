import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, View, StyleSheet, FlatList, Modal } from "react-native";
import { Stack, Link, Navigator, useFocusEffect } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { FontSize, defalutSize } from "@/constants/Size";
import CartItem from "@/components/CartItem";
import CreateNotionModal from "@/components/CreateNotionModal";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useSqlite } from "@/providers/SqliteProvider";
import { ActivityIndicator } from "react-native-paper";
import * as Crypto from "expo-crypto";
import styles from "./index.styles";

function HomeScreen() {
  const notionModalRef: any = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLodingData, setIsLodingData] = useState(true);
  const navigation = useNavigation();
  const [notions, setNotions] = useState([]);
  const [tags, setTags] = useState([]);
  const { exeSql, getDbFile } = useSqlite();
  getDbFile();

  // useEffect(() => {
  //   const asysnGetData = async () => {
  //     await getData();
  //   };
  //   asysnGetData();
  // });

  // 页面聚焦时事件
  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {
        // 离开时发生的事件
      };
    }, []),
  );

  // 切换模态框
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 添加灵感模态框
  const openModal = async () => {
    toggleModal();
    notionModalRef?.current?.inputOnFocus();
  };

  // 获取数据并添加至列表
  // 这里要注意异步循环，要先设置每个对象的tag值，然后再setNotions
  // 先全部获取异步数据，然后再赋值
  const getData = async () => {
    setIsLodingData(true); // 设置加载状态为 true

    await exeSql("searchAllNotions", [])
      .then(
        async res => {
          console.log("res1-1=", res);
          for (let i = 0; i < res.rows.length; i++) {
            await exeSql("searchTagNameById", [res.rows[i].tag]).then(res2 => {
              res.rows[i].tag = res2.rows[0].name;
            });
          }
          console.log("res1-2=", res);

          setNotions(res.rows);
        },
        () => {},
      )
      .finally(() => {});

    await exeSql("searchAllTags", [])
      .then(
        async res => {
          setTags(res.rows);
        },
        () => {},
      )
      .finally(() => {});

    setIsLodingData(false);
  };

  return (
    <View style={styles.container}>
      {/* 栈头 */}
      <Stack.Screen
        options={{
          title: "简记",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              {({ pressed }) => (
                <MaterialIcons
                  color={Colors.light.other}
                  name="density-medium"
                  size={25}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
          headerRight: () => (
            <Link
              href="/search"
              asChild
            >
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    color={Colors.light.other}
                    name="search"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTintColor: Colors.light.other,
        }}
      ></Stack.Screen>

      {/* 数据展示卡片 */}
      {isLodingData ? (
        <ActivityIndicator
          animating={isLodingData}
          color={Colors.light.tint}
        />
      ) : (
        <FlatList
          data={notions}
          renderItem={({ item }) => (
            <CartItem
              cartType="show"
              notion={item}
              func={getData}
            />
          )}
          contentContainerStyle={{
            gap: defalutSize,
            padding: defalutSize * 0.5,
          }}
        />
      )}

      {/* 右下角新增按钮 */}
      <View style={styles.button}>
        <Pressable
          onPress={() => {
            openModal();
          }}
          style={styles.buttonIcon}
        >
          {({ pressed }) => (
            <Ionicons
              color={"#fff"}
              name="add"
              size={40}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </View>

      {/* 灵感记录弹窗 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        {/* 传递给子组件一些数值及函数 */}
        <CreateNotionModal
          props={{ toggleModal, isModalVisible, getData, tags }}
          ref={notionModalRef}
        />
      </Modal>
    </View>
  );
}

export default HomeScreen;
