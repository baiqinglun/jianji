import { Colors, FontSize, defalutSize } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "column",
    margin: defalutSize,
    gap: defalutSize * 2,
  },
  tag: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tagLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  tagLeftText: {
    marginLeft: defalutSize,
    color: Colors.light.defalutText,
    fontSize: FontSize.ml,
  },
  tagRight: {},
  tagDealDialog: {
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 5,
    width: 200,
    alignSelf: "center",
  },
  tagDeal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
