import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import {settings} from '@/constants/settings'
import SettingCartItem from '@/components/settingCartItem'
import { DrawerActions,useNavigation } from '@react-navigation/native';

const Index = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <Stack.Screen options={{
        title:"设置",
        headerTitleAlign:'center',
        headerLeft:()=>(
          <Pressable onPress={()=>{navigation.dispatch(DrawerActions.toggleDrawer())}}>
            <MaterialIcons name='chevron-left' size={28} color={Colors.light.other}/>
          </Pressable>
        )
      }}/>

      {/* 内容 */}
      <FlatList
        data={settings}
        renderItem={(item)=>(<SettingCartItem {...item}/>)}/>
    </View>
  )
}

export default Index