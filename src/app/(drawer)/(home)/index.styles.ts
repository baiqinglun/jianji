import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: "absolute",
    justifyContent: "center",
    bottom: 30,
    right: 30,
    backgroundColor: Colors.light.tint,
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  buttonIcon: {
    position: "absolute",
    bottom: 15,
    right: 0,
  },
});

export default styles;
