import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useState, useRef } from "react";
import { Link, Stack, router } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { FontSize, defalutSize } from "@/constants/Size";
import Colors from "@/constants/Colors";
import { windowWidth } from "@/constants/Dimensions";
import { Checkbox } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectTag, setSelectTag] = useState<"checked" | "unchecked">(
    "unchecked",
  );
  const [selectedContent, setSelectedContent] = useState<
    "checked" | "unchecked"
  >("checked");
  const navigation = useNavigation();

  const getStatus = (status: string) => {
    switch (status) {
      case "checked":
        return true;
      case "unchecked":
        return true;
      default:
        break;
    }
  };

  const toggleSelectTag = () => {
    if (selectTag == "unchecked") {
      setSelectTag("checked");
    } else {
      setSelectTag("unchecked");
    }
  };
  const toggleSelectedContent = () => {
    if (selectedContent == "unchecked") {
      setSelectedContent("checked");
    } else {
      setSelectedContent("unchecked");
    }
  };

  const textInput: any = useRef(null);

  // 搜索
  const search = () => {
    console.log(searchText);
    setSearchText("");
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
          <Text style={styles.search}>搜索</Text>
        </Pressable>
      </View>

      {/* 内容 */}
      <View style={styles.selectContainer}>
        <Text style={styles.selectTip}>搜索指定内容</Text>
        <Checkbox.Item
          color={Colors.light.tint}
          label="标签"
          status={selectTag}
          onPress={() => {
            toggleSelectTag();
          }}
        />
        <Checkbox.Item
          color={Colors.light.tint}
          label="内容"
          status={selectedContent}
          onPress={() => {
            toggleSelectedContent();
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#f2f4f3",
    alignItems: "center",
    width: windowWidth - 120,
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
    width: windowWidth - 80,
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
});
