import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useRef } from "react";
import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors, FontSize, defalutSize, Dimensions, Images } from "@/constants";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CartItem } from "@/components";
import { useData } from "@/providers/DataProvider";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const [isLodedData, setIsLodedData] = useState<boolean>(false);
  const { searchTempNotions, notionsByTemp } = useData();

  const textInput: any = useRef(null);

  // 搜索
  const search = () => {
    searchTempNotions(searchText).then(() => {
      setIsLodedData(true);
    });
  };

  return (
    <SafeAreaProvider style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>

      {/* 搜索 */}
      <View style={styles.top}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          {({ pressed }) => (
            <MaterialIcons
              color={Colors.light.other}
              name="chevron-left"
              size={30}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
        <View style={styles.inputContainer}>
          <Ionicons
            color={Colors.light.other}
            name="search"
            size={20}
          />
          <TextInput
            ref={textInput}
            value={searchText}
            multiline={true}
            maxLength={1000}
            style={styles.input}
            editable
            blurOnSubmit={true}
            onSubmitEditing={search}
            onChangeText={text => setSearchText(text)}
          />
        </View>
        <Pressable onPress={search}>
          <Text style={styles.search}>{"搜索"}</Text>
        </Pressable>
      </View>

      {/* 内容 */}
      {/*<View style={styles.selectContainer}>
        <Text style={styles.selectTip}>搜索指定内容</Text>
        <Checkbox.Item
          color={Colors.light.tint}
          label="内容"
          status={selectedContent}
          onPress={() => {
            toggleSelectedContent();
          }}
        />
      </View>*/}
      <View style={styles.contentContainer}>
        {isLodedData ? (
          <FlatList
            data={notionsByTemp}
            renderItem={({ item }) => (
              <CartItem
                cartType="show"
                notion={item}
                getData={null}
                onRefresh={null}
              />
            )}
            contentContainerStyle={{
              gap: defalutSize,
              padding: defalutSize * 0.5,
            }}
            refreshControl={
              <RefreshControl
                refreshing={null}
                onRefresh={null}
              />
            }
          />
        ) : (
          <View
            style={{ flex: 1, flexDirection: "column", alignItems: "center" }}
          >
            <Image
              source={Images.blackPageImage}
              style={styles.blackPageImage}
              resizeMode="contain"
            />
            <Text style={{ fontSize: FontSize.ll, color: "#999" }}>
              未查找到
            </Text>
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  top: {
    marginTop: 0,
    justifyContent: "space-between",
    margin: defalutSize,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    width: Dimensions.windowWidth - 120,
    paddingHorizontal: defalutSize,
    paddingVertical: defalutSize * 0.7,
    borderRadius: defalutSize * 2,
  },
  search: {
    marginLeft: 10,
    marginRight: defalutSize,
    fontSize: FontSize.m,
    color: Colors.light.other,
  },
  input: {
    width: Dimensions.windowWidth - 80,
    fontSize: FontSize.s,
    marginLeft: defalutSize * 0.5,
    color: Colors.light.other,
  },
  selectContainer: {
    marginTop: 100,
    marginHorizontal: defalutSize * 2,
  },
  selectTip: {
    marginVertical: defalutSize,
    color: Colors.light.other,
    fontSize: FontSize.m,
    marginLeft: defalutSize,
    marginBottom: defalutSize * 2,
  },
  contentContainer: {
    // backgroundColor: "red",
    width: Dimensions.windowWidth,
    height: Dimensions.windowHeight,
  },
  blackPageImage: {
    width: "100%",
    height: 400,
    opacity: 0.2,
  },
});
