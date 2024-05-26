import { View, Image, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./UserInformation.style";
import { Colors } from "@/constants";
import useUserInformation from "./UserInformation.store";
import { Link } from "expo-router";

const UserInformation = () => {
  const { tagRename, userInformation, contentInformation } =
    useUserInformation();

  return (
    <View style={{ flex: 1 }}>
      {/* 顶部用户信息 */}
      <View style={styles.top}>
        <Link href={"/(drawer)/(setting)"}>
          <View style={styles.user}>
            <Image
              style={styles.avater}
              source={{ uri: userInformation.image }}
            />
            <Text style={styles.username}>{userInformation?.name}</Text>
          </View>
        </Link>

        <View style={styles.setting}>
          <MaterialIcons
            name="autorenew"
            size={28}
            color={Colors.light.other}
          />
        </View>
      </View>

      {/* 统计信息 */}
      <View style={styles.statistics}>
        <View style={styles.count}>
          <Text
            onPress={() => {
              tagRename();
            }}
            style={styles.countText}
          >
            {contentInformation?.notionCount}
          </Text>
          <Text style={styles.countText1}>简记</Text>
        </View>
        <View style={styles.count}>
          <Text style={styles.countText}>{contentInformation?.tagCount}</Text>
          <Text style={styles.countText1}>标签</Text>
        </View>
        <View style={styles.count}>
          <Text style={styles.countText}>{contentInformation?.dayCount}</Text>
          <Text style={styles.countText1}>天数</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInformation;
