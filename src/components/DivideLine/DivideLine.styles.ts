import { StyleSheet } from "react-native";
import { Colors, defalutSize } from "@/constants";

export default StyleSheet.create({
  container: {
    margin: defalutSize * 2,
  },
  box: {
    borderBottomWidth: 0.5,
    alignSelf: "center",
    marginHorizontal: "auto",
    borderColor: Colors.light.other,
    opacity: 0.5,
  },
});
