import { useState } from 'react';
import {  View ,Text,StyleSheet,Image} from 'react-native';
import { Link } from 'expo-router';
import {  List } from 'react-native-paper';
import {  MaterialIcons } from '@expo/vector-icons';
import DivideLine from '@/components/DivideLine';
import Colors from '@/constants/Colors';
import { avaterImage } from '@/constants/Images';
import { FontSize, defalutSize } from '@/constants/Size';
import {tags} from '@assets/data/tags'
import { noteList } from '@assetsdata/noteList';

const CustomDrawer = () => {
    const [renameModal,setRenameModal] = useState<boolean>(false)
    const tagRename = () => {
    }
    return (
      <View style={styles.container}>
        {/* 顶部用户信息 */}
        <View style={styles.top}>
            <View style={styles.user}>
                {/* <Image style={styles.avater} source={require("../../../assets/images/avater.jpg")}/> */}
                <Image style={styles.avater} source={avaterImage}/>
                <Text style={styles.username}>用户名</Text>
            </View>
            <View style={styles.setting}>
                <Link href={"/(drawer)/(setting)"}>
                    <MaterialIcons name='autorenew' size={28} color={Colors.light.other}/>
                </Link>
            </View>
        </View>

        {/* 统计信息 */}
        <View style={styles.statistics}>
            <View style={styles.count}>
                <Text onPress={()=>{tagRename()}} style={styles.countText}>4</Text>
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

        {/* 导航栏 */}
        <List.Section title="" style={{backgroundColor:"#fff"}}>
            {noteList.map((item)=>(
                <Link href={"/(drawer)/(home)/"} asChild>
                    <List.Item
                    descriptionStyle={{backgroundColor:'red'}}
                    rippleColor={Colors.light.tagBg}
                    titleStyle={{color:Colors.light.defalutText}}
                    style={{backgroundColor:"#fff"}}
                    title={item.name}
                    left={props => <List.Icon {...props} icon="book-outline"/>}
                    right={props => (
                        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                            <Text>{item.count}</Text>
                            <List.Icon {...props} icon="chevron-right"/>
                        </View>
                    )}
                >
                </List.Item>
                </Link>
            ))}
        </List.Section>

        <DivideLine color={Colors.light.other} width={250}/>
        {/* 标签栏 */}
        <List.Section title="" style={{backgroundColor:"#fff"}}>
            {tags.map((item)=>(
                <List.Accordion
                onPress={()=>{tagRename()}}
                    onLongPress={()=>{console.log(1);}}
                    descriptionStyle={{backgroundColor:'red'}}
                    rippleColor={Colors.light.tagBg}
                    titleStyle={{color:Colors.light.defalutText}}
                    style={{backgroundColor:"#fff"}}
                    title={item.name}
                    left={props => <List.Icon {...props} icon="tag-outline" />}>
                    {item.children.map((child)=>(
                        <List.Item title={child} />
                    ))}
                </List.Accordion>
            ))}
        </List.Section>

        <DivideLine color={Colors.light.other} width={250}/>
        {/* 回收站 */}
        <List.Section title="" style={{backgroundColor:"#fff"}}>
            <Link href={"/(drawer)/(rubbish)/"}>
                <List.Item
                    descriptionStyle={{backgroundColor:'red'}}
                    rippleColor={Colors.light.tagBg}
                    titleStyle={{color:Colors.light.defalutText}}
                    style={{backgroundColor:"#fff"}}
                    title={"回收站"}
                    left={props => <List.Icon {...props} icon="trash-can-outline"/>}
                >
                </List.Item>
            </Link>
            <Link href={"/(drawer)/(setting)/"}>
                <List.Item
                    descriptionStyle={{backgroundColor:'red'}}
                    rippleColor={Colors.light.tagBg}
                    titleStyle={{color:Colors.light.defalutText}}
                    style={{backgroundColor:"#fff"}}
                    title={"设置"}
                    left={props => <List.Icon {...props} icon="cog-outline"/>}
                >
                </List.Item>
            </Link>
        </List.Section>
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
        color:Colors.light.defalutText,
        fontSize:FontSize.l,
        fontWeight:'600'
    },
    countText1:{
        color:Colors.light.defalutText,
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