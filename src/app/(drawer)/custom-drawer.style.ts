import { StyleSheet } from "react-native";
import { FontSize, defalutSize, Colors } from "@/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    margin: defalutSize,
  },
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
  navigateContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: defalutSize,
    padding: defalutSize,
    gap: defalutSize * 3,
  },
  navigate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navigateLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  navigateLeftText: {
    marginLeft: defalutSize,
    fontSize: FontSize.m,
  },
  navigaterRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  navigateRightText: {
    marginRight: defalutSize,
    fontSize: FontSize.m,
  },
  allTagText: {
    margin: defalutSize,
    // marginTop:defalutSize*5,
    fontSize: FontSize.ml,
  },
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
