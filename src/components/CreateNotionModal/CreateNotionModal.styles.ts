import { StyleSheet } from "react-native";
import { Colors, FontSize, defalutSize, Dimensions } from "@/constants";

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingLeft: 5,
    height: Dimensions.windowHeight * 0.5,
    width: Dimensions.windowWidth * 0.8,
    elevation: 2,
  },
  tagInputContainer: {
    height: 40,
  },
  tagIcon: {
    position: "absolute",
    height: 30,
    width: 30,
    left: 5,
    bottom: 5,
  },
  inputTags: {
    flex: 1,
    textAlign: "center",
    paddingVertical: defalutSize,
    fontSize: FontSize.m,
  },
  inputText: {
    backgroundColor: "#fff",
    height: 300,
    textAlignVertical: "top",
    padding: defalutSize,
    fontSize: FontSize.m,
  },
  modalBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: defalutSize,
    marginTop: "auto",
  },
  cancel: {
    color: Colors.light.tagText,
    marginLeft: 10,
    fontSize: FontSize.m,
  },
  tagModal: {
    position: "absolute",
    top: 0,
    left: Dimensions.windowWidth * 0.2,
    width: Dimensions.windowWidth * 0.4,
    backgroundColor: Colors.light.tagBg,
    gap: defalutSize * 0.5,
  },
  tagText: {
    fontSize: FontSize.m,
    color: Colors.light.tagText,
    paddingVertical: defalutSize * 0.1,
    paddingHorizontal: defalutSize * 0.4,
  },
});

export default styles;
