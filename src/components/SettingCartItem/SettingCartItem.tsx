import { View, Text, Image } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import styles from "./SettingCartItem.styles";

const SettingCartItem = ({ item }: any) => {
  const { image, name, text } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.right}>
        {image && (
          <Image
            style={styles.img}
            source={image}
          />
        )}
        {text && <Text style={styles.text}>{text}</Text>}
        <MaterialIcons
          name="chevron-right"
          size={28}
          color={Colors.light.other}
        />
      </View>
    </View>
  );
};

export default SettingCartItem;
