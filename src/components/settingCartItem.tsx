import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'
import { FontSize, defalutSize } from '@/constants/Size'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const SettingCartItem = ({item}:any) => {
    const {image,name,text} = item
    
  return (
    <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.right}>
            {image && <Image style={styles.img} source={image}/>}
            {text && <Text style={styles.text}>{text}</Text>}
            <MaterialIcons name='chevron-right' size={28} color={Colors.light.other}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#Fff",
        paddingHorizontal:defalutSize*1.5,
        paddingVertical:defalutSize*2.5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:Colors.light.background
    },
    name:{
        fontSize:FontSize.m
    },
    right:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    img:{
        width:40,
        height:40,
        borderRadius:40,
    },
    text:{
        fontSize:FontSize.m
    }

})

export default SettingCartItem