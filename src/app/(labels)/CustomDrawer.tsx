import DivideLine from '@/components/DivideLine';
import Colors from '@/constants/Colors';
import { avaterImage } from '@/constants/Images';
import { FontSize, defalutSize } from '@/constants/Size';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View ,Text,StyleSheet,Image} from 'react-native';

const CustomDrawer = () => {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
            <View style={styles.user}>
                <Image style={styles.avater} source={require("../../../assets/images/avater.jpg")}/>
                <Text style={styles.username}>用户名</Text>
            </View>
            <View style={styles.setting}>
                <Ionicons name='settings-outline' size={28} color={Colors.light.other}/>
            </View>
        </View>

        <View style={styles.statistics}>
            <View style={styles.count}>
                <Text style={styles.countText}>4</Text>
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
        <DivideLine color={Colors.light.other} width={250}/>

        <View style={styles.navigateContainer}>
            <View style={styles.navigate}>
                <View style={styles.navigateLeft}>
                    <Ionicons name='book-outline' size={20}/>
                    <Text style={styles.navigateLeftText}>全部简记</Text>
                </View>
                <View style={styles.navigaterRight}>
                    <Text style={styles.navigateRightText}>4</Text>
                    <Ionicons name='chevron-forward-outline' size={20} color={Colors.light.defalutText}/>
                </View>
            </View>
            <View style={styles.navigate}>
                <View style={styles.navigateLeft}>
                    <Ionicons name='book-outline' size={20}/>
                    <Text style={styles.navigateLeftText}>全部简记</Text>
                </View>
                <View style={styles.navigaterRight}>
                    <Text style={styles.navigateRightText}>4</Text>
                    <Ionicons name='chevron-forward-outline' size={20} color={Colors.light.defalutText}/>
                </View>
            </View>
 
        </View>

        <DivideLine color={Colors.light.other} width={250}/>

        <Text style={styles.allTagText}>全部标签</Text>
        <View style={styles.tagContainer}>
            <View style={styles.tag}>
                <View style={styles.tagLeft}>
                    <Ionicons style={styles.tagRight} name="pricetag-outline" size={20} color={Colors.light.defalutText}/>
                    <Text style={styles.tagLeftText}>编程</Text>
                </View>
                <Ionicons style={styles.tagRight} name='chevron-up-outline' size={20} color={Colors.light.defalutText}/>
            </View>
            <View style={styles.tag}>
                <View style={styles.tagLeft}>
                    <Ionicons style={styles.tagRight} name="pricetag-outline" size={20} color={Colors.light.defalutText}/>
                    <Text style={styles.tagLeftText}>编程</Text>
                </View>
                <Ionicons style={styles.tagRight} name='chevron-up-outline' size={20} color={Colors.light.defalutText}/>
            </View>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:40,
        margin:defalutSize
    },
    top:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin:defalutSize
    },
    user:{
        flexDirection:'row',
        alignItems:'center'
    },
    avater:{
        width:50,
        height:50,
        borderRadius:50
    },
    username:{
        fontSize:FontSize.l,
        color:Colors.light.defalutText,
        marginLeft:defalutSize
    },
    setting:{

    },
    statistics:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:defalutSize,
        alignItems:'center'
    },
    count:{
        flexDirection:'column',
        alignItems:'center'
    },
    countText:{
        color:Colors.light.other,
        fontSize:FontSize.l,
        fontWeight:'600'
    },
    countText1:{
        color:Colors.light.other,
        fontSize:FontSize.ml
    },
    navigateContainer:{
        flexDirection:'column',
        justifyContent:'center',
        marginTop:defalutSize,
        padding:defalutSize,
        gap:defalutSize*3
    },
    navigate:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    navigateLeft:{
        flexDirection:'row',
        alignItems:'center'
    },
    navigateLeftText:{
        marginLeft:defalutSize,
        fontSize:FontSize.m
    },
    navigaterRight:{
        flexDirection:'row',
        alignItems:'center'
    },
    navigateRightText:{
        marginRight:defalutSize,
        fontSize:FontSize.m
    },
    allTagText:{
        margin:defalutSize,
        // marginTop:defalutSize*5,
        fontSize:FontSize.ml,
    },
    tagContainer:{
        flexDirection:'column',
        margin:defalutSize,
        gap:defalutSize*2
    },
    tag:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    tagLeft:{
        flexDirection:'row',
        alignItems:'center'
    },
    tagLeftText:{
        marginLeft:defalutSize,
        color:Colors.light.defalutText,
        fontSize:FontSize.ml
    },
    tagRight:{

    }
})

export default CustomDrawer