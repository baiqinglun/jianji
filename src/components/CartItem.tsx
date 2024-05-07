import {useState} from 'react';
import {  Pressable, View,Text,StyleSheet } from 'react-native';
import { Stack,Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import {FontSize,defalutSize} from '@/constants/Size';
import { Box,Button, Icon, Modal, NativeBaseProvider, Popover, ScrollView } from 'native-base';

function CartItem( {notion} :any) {
    const [textWidth, setTextWidth] = useState(0);

    const onTextLayout = (event:any) => {
      const { height } = event.nativeEvent.layout;
        setTextWidth(height)
    };

    const shareNotion = () => {
      console.log("分享");
      
    }
    const copyNotionContent = () => {
      console.log("复制");
      
    }
    const editNotion = () => {
      console.log("编辑");
      
    }
    const deleteNotion = () => {
      console.log("删除");
      
    }
  
    return (
      <View style={styles.container}>
        <View style={styles.time}>
          <Text style={styles.timeText}>{notion.time}</Text>
          <NativeBaseProvider>
            <View style={{width:50,height:20}}>
              <Popover trigger={triggerProps => {
              return (
                <Button
                  style={{width:30,padding:30}}
                  {...triggerProps} 
                  variant="unstyled"
                  leftIcon={
                    <Icon
                      as={Ionicons}
                      name="ellipsis-horizontal"
                      size="sm" />}>
                </Button>
              )
            }}>
              <Popover.Content accessibilityLabel="Delete Customerd" w="100">
                <Popover.Arrow />
                  <Popover.Body>
                  <Button variant="unstyled" onPress={() => shareNotion()}>分享</Button>
                  <Button variant="unstyled" onPress={() => copyNotionContent()}>复制</Button>
                  <Button variant="unstyled" onPress={() => editNotion()}>编辑</Button>
                  <Button variant="ghost" onPress={() => deleteNotion()}>删除</Button>
                  </Popover.Body>
                </Popover.Content>
              </Popover>
            </View>
          </NativeBaseProvider>
        </View>
        <View style={[styles.tag,{width:textWidth*6}]}>
          <Text style={{color:Colors.light.tagText}} onLayout={onTextLayout}>#{notion.tags}</Text>
        </View>
        <Link href={`/${notion.id}`} asChild>
        <Text style={styles.content}>{notion.content}</Text>
        </Link>

      </View>
    );
  }

const styles = StyleSheet.create({
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
    padding:5,
    backgroundColor:Colors.light.tagBg,
    color:Colors.light.tagText,
    marginBottom:defalutSize
},
content:{
    color:Colors.light.defalutText,
    fontSize:FontSize.m
}
})

export default CartItem