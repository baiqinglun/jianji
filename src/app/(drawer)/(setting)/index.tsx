import { View, FlatList, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Settings } from "@/constants";
import { SettingCartItem } from "@/components";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const Index = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Stack.Screen
        options={{
          title: "设置",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <MaterialIcons
                name="chevron-left"
                size={28}
                color={Colors.light.other}
              />
            </Pressable>
          ),
        }}
      />

      {/* 内容 */}
      <FlatList
        data={Settings}
        renderItem={item => <SettingCartItem {...item} />}
      />
    </View>
  );
};

export default Index;
