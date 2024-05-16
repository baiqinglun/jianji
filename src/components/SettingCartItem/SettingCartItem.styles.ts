import { StyleSheet } from "react-native";
import { Colors, FontSize, defalutSize } from "@/constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#Fff",
    paddingHorizontal: defalutSize * 1.5,
    paddingVertical: defalutSize * 2.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: Colors.light.background,
  },
  name: {
    fontSize: FontSize.m,
  },
  right: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  text: {
    fontSize: FontSize.m,
  },
});

export default styles;
