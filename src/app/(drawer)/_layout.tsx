import Drawer from "expo-router/drawer";
import MainDrawerScreen from "./MainDrawerScreen";
import Colors from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        initialRouteName="Home"
        drawerContent={() => <MainDrawerScreen />}
        screenOptions={{
          // 抽屉全部字体
          drawerLabelStyle: {
            // backgroundColor:'red',
            color: Colors.light.tagText,
            // backgroundColor:Colors.light.tagBg
          },
          // 抽屉全部item
          drawerItemStyle: {
            // backgroundColor:'red',
            borderWidth: 1,
            borderColor: "#fff",
            borderBottomColor: "red",
          },
          // 整个抽屉区域
          drawerStyle: {
            // backgroundColor:'red',
            // backgroundColor:Colors.light.tagBg
            borderBottomColor: Colors.light.tagBg,
          },
          sceneContainerStyle: {
            backgroundColor: Colors.light.background,
          },
          // 有内容的区域
          drawerContentContainerStyle: {
            // backgroundColor:'red'
          },
          // 全部内容区域
          drawerContentStyle: {
            // backgroundColor:'red'
          },
          headerBackgroundContainerStyle: {
            // backgroundColor:'red'
          },
          // 页面顶部区域
          headerStyle: {
            backgroundColor: Colors.light.background,
          },
          // 页面顶部区域文字
          headerTitleStyle: {},
          // 页面顶部左边区域，以字体区域为分界线
          headerLeftContainerStyle: {
            // backgroundColor:'red'
          },
          // 页面顶部右边区域，以字体区域为分界线
          headerRightContainerStyle: {
            // backgroundColor:'red'
          },
          // 页面顶部字体区域
          headerTitleContainerStyle: {
            // backgroundColor:'red'
          },
        }}
      >
        <Drawer.Screen
          name="(home)"
          options={{ headerShown: false }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="(rubbish)"
          options={{ headerShown: false }}
        ></Drawer.Screen>
        <Drawer.Screen
          name="(setting)"
          options={{ headerShown: false }}
        ></Drawer.Screen>
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default Layout;
