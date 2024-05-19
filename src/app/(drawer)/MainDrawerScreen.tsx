import { View, Text, ScrollView } from "react-native";
import { Link } from "expo-router";
import { DivideLine, TagList, UserInformation } from "@/components";
import { Colors, defalutSize } from "@/constants";
import { List } from "react-native-paper";

const MainDrawerScreen = () => {
  return (
    <ScrollView>
      <View style={{ flex: 1, marginTop: 40, margin: defalutSize }}>
        {/* 用户信息 */}
        <UserInformation />

        <DivideLine
          color={Colors.light.other}
          width={250}
        />

        {/* 导航栏 */}
        <List.Section
          title=""
          style={{ backgroundColor: "#fff" }}
        >
          <Link
            href={"/(drawer)/(home)/"}
            asChild
          >
            <List.Item
              descriptionStyle={{ backgroundColor: "red" }}
              rippleColor={Colors.light.tagBg}
              titleStyle={{ color: Colors.light.defalutText }}
              style={{ backgroundColor: "#fff" }}
              title={"全部简记"}
              left={props => (
                <List.Icon
                  {...props}
                  icon="book-outline"
                />
              )}
              right={props => (
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Text>{4}</Text>
                  <List.Icon
                    {...props}
                    icon="chevron-right"
                  />
                </View>
              )}
            ></List.Item>
          </Link>
        </List.Section>

        <DivideLine
          color={Colors.light.other}
          width={250}
        />

        {/* 标签 */}
        <TagList />

        {/* 回收站及设置 */}
        <List.Section
          title=""
          style={{ backgroundColor: "#fff" }}
        >
          <Link href={"/(drawer)/(rubbish)/"}>
            <List.Item
              descriptionStyle={{ backgroundColor: "red" }}
              rippleColor={Colors.light.tagBg}
              titleStyle={{ color: Colors.light.defalutText }}
              style={{ backgroundColor: "#fff" }}
              title={"回收站"}
              left={props => (
                <List.Icon
                  {...props}
                  icon="trash-can-outline"
                />
              )}
            ></List.Item>
          </Link>
          <Link href={"/(drawer)/(setting)/"}>
            <List.Item
              descriptionStyle={{ backgroundColor: "red" }}
              rippleColor={Colors.light.tagBg}
              titleStyle={{ color: Colors.light.defalutText }}
              style={{ backgroundColor: "#fff" }}
              title={"设置"}
              left={props => (
                <List.Icon
                  {...props}
                  icon="cog-outline"
                />
              )}
            ></List.Item>
          </Link>
        </List.Section>
      </View>
    </ScrollView>
  );
};

export default MainDrawerScreen;
