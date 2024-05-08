import {useState} from 'react';
import { View,StyleSheet } from 'react-native';
import { Button,Text, Card, Avatar } from 'react-native-paper';
import { Link } from 'expo-router';
import MyDialog from './Dialog';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';
import {FontSize,defalutSize} from '@/constants/Size';
import { Tooltip } from '@rneui/themed';

function CartItem( {notion} :any) {
    const [textWidth, setTextWidth] = useState(0);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [openList, setOpenList] = useState(false);
    const onTextLayout = (event:any) => {
      const { height } = event.nativeEvent.layout;
        setTextWidth(height)
    };

    const hideDialog = () => setDeleteVisible(false);

    const toggleDialog = () => {
      setDeleteVisible(!deleteVisible);
    }

    const shareNotion = () => {
      setOpenList(!openList)
      console.log("分享");
      
    }
    const copyNotionContent = () => {
      setOpenList(!openList)
      console.log("复制");
      
    }
    const editNotion = () => {
      setOpenList(!openList)
      console.log("编辑");
      
    }
    const deleteNotion = () => {
      console.log("删除");
      setOpenList(!openList)
      setDeleteVisible(!deleteVisible)
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.time}>
          <Text style={styles.timeText}>{notion.time}</Text>
          {/* 弹窗 */}
          <Tooltip
            visible={openList}
            onOpen={() => setOpenList(true)}
            onClose={() => setOpenList(false)}
            width={100}
            height={200}
            backgroundColor={Colors.light.background}
            popover={
              <View style={{flex:1,justifyContent:'space-between',paddingVertical:10}}>
                <Button style={{width:'100%'}} textColor={Colors.light.defalutText} onPress={() => copyNotionContent()}>复制</Button>
                <Button style={{width:'100%'}} textColor={Colors.light.defalutText} onPress={() => shareNotion()}>分享</Button>
                <Button style={{width:'100%'}} textColor={Colors.light.defalutText} onPress={() => editNotion()}>编辑</Button>
                <Button style={{width:'100%'}} textColor='red' onPress={() => deleteNotion()}>删除</Button>
              </View>
            }
          >
            <MaterialIcons
              name="more-horiz"
              color={Colors.light.other}
              size={20} />
          </Tooltip>
        </View>
        
        {/* 标签 */}
        <View style={[styles.tag]}>
          <MaterialIcons style={{}} name='sell' color={Colors.light.tagText} size={15}/>
          <Text style={styles.tagText} onLayout={onTextLayout}>{notion.tags}</Text>
        </View>
        
        {/* 内容 */}
        <Link href={`/${notion.id}`} asChild>
        <Text style={styles.content}>{notion.content}</Text>
        </Link>

      {/* 是否删除弹窗 */}
      <MyDialog 
        content = {notion.content}
        visible = {deleteVisible}
        onConfirmClick = {toggleDialog}
        onCancelClick = {toggleDialog}
        onDismiss = {hideDialog}/>

      </View>
    );
  }

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
container:{
    backgroundColor:"#fff",
    width:'100%',
    height:150,
    padding:defalutSize,
    borderRadius:defalutSize*0.5
},
time:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:defalutSize
},
timeText:{
    color:Colors.light.other,
    fontSize:FontSize.s,
    width:310
},
tag:{
    flexDirection:'row',
    alignItems:'center',
    width:'auto',
    gap:5,
    padding:5,
    color:Colors.light.tagText,
    marginBottom:defalutSize
},
tagText:{
  backgroundColor:Colors.light.tagBg,
  color:Colors.light.tagText,
  padding:2
},
content:{
    color:Colors.light.defalutText,
    fontSize:FontSize.m
}
})

export default CartItem