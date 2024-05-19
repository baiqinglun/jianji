import { Colors, FontSize, defalutSize } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: defalutSize,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
  },
  avater: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  username: {
    fontSize: FontSize.l,
    color: Colors.light.defalutText,
    marginLeft: defalutSize,
  },
  setting: {},
  statistics: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: defalutSize,
    alignItems: "center",
  },
  count: {
    flexDirection: "column",
    alignItems: "center",
  },
  countText: {
    color: Colors.light.defalutText,
    fontSize: FontSize.l,
    fontWeight: "600",
  },
  countText1: {
    color: Colors.light.defalutText,
    fontSize: FontSize.ml,
  },
});

export default styles;
