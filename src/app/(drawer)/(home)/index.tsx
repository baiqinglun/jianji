import { Pressable, View, FlatList, Modal, RefreshControl } from "react-native";
import { Stack, Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DrawerActions } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import styles from "./index.styles";
import { CartItem, CreateNotionModal } from "@/components";
import { defalutSize, Colors } from "@/constants";
import useIndex from "./index.store";

function HomeScreen() {
  const {
    notions,
    isLodingData,
    refreshing,
    onRefresh,
    notionModalRef,
    isModalVisible,
    toggleModal,
    setModalVisible,
    getData,
    navigation,
  } = useIndex();

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
              getData={getData}
              onRefresh={onRefresh}
            />
          )}
          contentContainerStyle={{
            gap: defalutSize,
            padding: defalutSize * 0.5,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}

      {/* 右下角新增按钮 */}
      <View style={styles.button}>
        <Pressable
          onPress={() => {
            toggleModal();
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
          props={{ id: "", toggleModal, onRefresh, getData }}
          ref={notionModalRef}
        />
      </Modal>
    </View>
  );
}

export default HomeScreen;
