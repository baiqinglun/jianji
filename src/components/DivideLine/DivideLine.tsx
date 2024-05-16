import { View } from "react-native";
import React from "react";
import styles from "./DivideLine.styles";

const DivideLine = ({ width, color }: any) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.box, { width: width ? width : 100, borderColor: color }]}
      ></View>
    </View>
  );
};

export default DivideLine;
