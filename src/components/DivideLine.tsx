import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { defalutSize } from '@/constants/Size'
import Colors from '@/constants/Colors'

const DivideLine = ({width,color}:any) => {
  return (
    <View style={styles.container}>
      <View style={[styles.box,{width:width ? width : 100,borderColor:color}]}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        margin:defalutSize*2,
    },
    box:{
        borderBottomWidth:0.5,
        alignSelf:'center',
        marginHorizontal:'auto',
        borderColor:Colors.light.other,
        opacity:.5
    }
})

export default DivideLine