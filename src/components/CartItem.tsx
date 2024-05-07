import {useState} from 'react';
import {  Pressable, View,Text,StyleSheet } from 'react-native';
import { Stack,Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import {FontSize,defalutSize} from '@/constants/Size';

function CartItem( {notion} :any) {
    const [textWidth, setTextWidth] = useState(0);
    const onTextLayout = (event) => {
      const { height } = event.nativeEvent.layout;
        setTextWidth(height)
    };
  
    return (
      <View>
        <Pressable>
          <View style={styles.container}>
            <View style={styles.time}>
              <Text style={styles.timeText}>{notion.time}</Text>
              <Link href="/cart" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Ionicons
                      color={Colors.light.other}
                      name="ellipsis-horizontal"
                      size={FontSize.m}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            </View>
            <View style={[styles.tag,{width:textWidth*6}]}>
              <Text style={{color:Colors.light.tagText}} onLayout={onTextLayout}>#{notion.tags}</Text>
            </View>
            <Text style={styles.content}>{notion.content}</Text>
          </View>
        </Pressable>
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