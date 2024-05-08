import { View, Text, Pressable,StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import { DrawerActions,useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { Checkbox } from 'react-native-paper';
import { FontSize, defalutSize } from '@/constants/Size';
import CartItem from '@/components/CartItem';
import notions from '@assetsdata/notions';
import MyDialog from '@/components/Dialog';

const Index = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [isDelete,setIsDelete] = useState(false)

  const deleteSelect = () => {
    toggleIsDelete()
  }
  const cancelDelete = () => {
    toggleIsDelete()
  }

  const toggleIsDelete = () =>{
    setIsDelete(!isDelete)
  }

  return (
    <>
      <Stack.Screen options={{
        title:"回收站",
        headerTitleAlign:'center',
        headerLeft:()=>(
          <Pressable onPress={()=>{navigation.dispatch(DrawerActions.toggleDrawer())}}>
            <MaterialIcons name='chevron-left' size={28} color={Colors.light.other}/>
          </Pressable>
        ),
        headerRight:()=>(
          <Pressable onPress={()=>{toggleIsDelete()}}>
            <MaterialIcons name='delete-forever' size={28} color={Colors.light.other}/>
          </Pressable>
        )
      }}/>

      {/* top */}
      <View style={styles.top}>
        <Text style={styles.topText}>全选</Text>
        <Checkbox
          color={Colors.light.tint}
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
      />
      </View>

      {/* 内容 */}
      <FlatList
        data={notions}
        renderItem={({item})=><CartItem cartType={'rubbish'} notion={item}/>}
        contentContainerStyle={{gap:defalutSize,padding:defalutSize*0.5}}/>

        {/* 弹窗 */}
        <MyDialog content="是否全部删除" visible={isDelete} onConfirmClick={deleteSelect} onCancelClick={cancelDelete} onDismiss={toggleIsDelete}/>
    </>
  )
}

const styles = StyleSheet.create({
  top:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    padding:defalutSize
  },
  topText:{
    fontSize:FontSize.m
  }
})

export default Index