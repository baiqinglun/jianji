import { View, Image, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import styles from "./UserInformation.style";
import { Colors, Images } from "@/constants";
import useUserInformation from "./UserInformation.store";

const UserInformation = () => {
  const { tagRename } = useUserInformation();

  return (
    <View style={{ flex: 1 }}>
      {/* 顶部用户信息 */}
      <View style={styles.top}>
        <View style={styles.user}>
          {/* <Image style={styles.avater} source={require("../../../assets/images/avater.jpg")}/> */}
          <Image
            style={styles.avater}
            source={Images.avaterImage}
          />
          <Text style={styles.username}>用户名</Text>
        </View>
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
            4
          </Text>
          <Text style={styles.countText1}>简记</Text>
        </View>
        <View style={styles.count}>
          <Text style={styles.countText}>4</Text>
          <Text style={styles.countText1}>标签</Text>
        </View>
        <View style={styles.count}>
          <Text style={styles.countText}>4</Text>
          <Text style={styles.countText1}>天数</Text>
        </View>
      </View>
    </View>
  );
};

export default UserInformation;
