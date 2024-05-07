import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View ,Text,StyleSheet,Image} from 'react-native';

const CustomDrawer = () => {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
            <View style={styles.user}>
                <Image/>
                <Text>用户名</Text>
            </View>
            <View style={styles.setting}>
                <Ionicons/>
            </View>
        </View>

        <View style={styles.statistics}>
            <View>
                <Text>4</Text>
                <Text>简记</Text>
            </View>
            <View>
                <Text>4</Text>
                <Text>简记</Text>
            </View>
            <View>
                <Text>4</Text>
                <Text>简记</Text>
            </View>
            <View>
                <Text>4</Text>
                <Text>简记</Text>
            </View>
            <View>
                <Text>4</Text>
                <Text>简记</Text>
            </View>
            <View>
                <Text>4</Text>
                <Text>简记</Text>
            </View>
            <View>
                <Text>4</Text>
                <Text>简记</Text>
            </View>
        </View>

        <View>
            <View>
                <View>
                    <Ionicons/>
                    <Text>全部简记</Text>
                </View>
                <Text>4</Text>
            </View>
        </View>

        <View style={styles.tagContainer}>
            <View>
                <View>
                    <Text>#</Text>
                    <Text>编程</Text>
                </View>
                <Ionicons/>
            </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    container:{

    },
    top:{

    },
    user:{

    },
    setting:{

    },
    statistics:{

    },
    tagContainer:{

    }
})

export default CustomDrawer