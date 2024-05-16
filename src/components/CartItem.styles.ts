import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { FontSize, defalutSize } from "@/constants/Size";

export default StyleSheet.create({
  title: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: 150,
    padding: defalutSize,
    borderRadius: defalutSize * 0.5,
  },
  time: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: defalutSize,
  },
  timeText: {
    color: Colors.light.other,
    fontSize: FontSize.s,
    width: 310,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    gap: 5,
    padding: 5,
    color: Colors.light.tagText,
    marginBottom: defalutSize,
  },
  tagText: {
    backgroundColor: Colors.light.tagBg,
    color: Colors.light.tagText,
    padding: 2,
  },
  content: {
    marginTop: 2,
    color: Colors.light.defalutText,
    fontSize: FontSize.m,
    lineHeight: 32,
  },
});
