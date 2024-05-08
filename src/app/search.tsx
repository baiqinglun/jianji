import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState,useRef } from 'react'
import { Stack, router } from 'expo-router'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontSize, defalutSize } from '@/constants/Size';
import Colors from '@/constants/Colors';
import { ButtonGroup } from '@rneui/base';
import { windowWidth } from '@/constants/Dimensions';
import { Checkbox } from 'react-native-paper';

export default function SearchScreen (){
  const insets = useSafeAreaInsets();
  const [searchText,setSearchText] = useState("")
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [selectTag, setSelectTag] = useState<'checked' | 'unchecked'>('unchecked');
  const [selectedContent, setSelectedContent] = useState<'checked' | 'unchecked'>("checked");

  const getStatus = (status:string) => {
    switch (status) {
      case 'checked':
        return true
      case 'unchecked':
        return true
      default:
        break;
    }
  }

  const toggleSelectTag = () => {
    if(selectTag == 'unchecked'){
      setSelectTag("checked")
    }else{
      setSelectTag("unchecked")
    }
  }
  const toggleSelectedContent = () => {
    if(selectedContent == 'unchecked'){
      setSelectedContent("checked")
    }else{
      setSelectedContent("unchecked")
    }
  }

  const textInput:any = useRef(null);

  const inputLose = () => {
    textInput?.current?.blur();
    router.back()
  }

  // 搜索
  const search = () => {
    console.log(searchText);
    setSearchText("")
  }

  return (
      <SafeAreaProvider style={[styles.container,{ paddingTop: insets.top}]}>
        <Stack.Screen
        options={{headerTitleStyle:false}}/>

      {/* 搜索 */}
      <View style={styles.top}>
        <View style={styles.inputContainer}>
          <Ionicons
              color={Colors.light.other}
              name="search"
              size={20}
                  />
          <TextInput
            ref={textInput}
            value={searchText}
            multiline={true}
            maxLength={1000}
            style={styles.input}
            editable
            blurOnSubmit={true}
            onSubmitEditing={search}
            onChangeText={text => setSearchText(text)}
          />
        </View>
        <Text onPress={inputLose} style={styles.cancel}>取消</Text>
      </View>

      {/* 内容 */}
      <View style={styles.selectContainer}>
        <Text style={styles.selectTip}>搜索指定内容</Text>
        <Checkbox.Item color={Colors.light.tint} label="标签" status={selectTag} onPress={()=>{toggleSelectTag()}}/>
        <Checkbox.Item color={Colors.light.tint} label="内容" status={selectedContent} onPress={()=>{toggleSelectedContent()}}/>
      </View>
      </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff'
  },
  top:{
    flexDirection:"row",
    justifyContent:'space-between',
    margin:defalutSize,
    alignItems:'center'
  },
  inputContainer:{
    flexDirection:"row",
    backgroundColor:"#f2f4f3",
    alignItems:'center',
    width:windowWidth-80,
    paddingHorizontal:defalutSize,
    paddingVertical:defalutSize*0.7,
    borderRadius:defalutSize*2
  },
  cancel:{
    marginLeft:'auto',
    marginRight:defalutSize,
    fontSize:FontSize.m,
    color:Colors.light.other
  },
  input:{
    width:windowWidth-80,
    fontSize:FontSize.s,
    marginLeft:defalutSize*0.5,
    color:Colors.light.other
  },
  selectContainer:{
    marginTop:100,
    marginHorizontal:defalutSize*2
  },
  selectTip:{
    marginVertical:defalutSize,
    color:Colors.light.other,
    fontSize:FontSize.m,
    marginLeft:defalutSize,
    marginBottom:defalutSize*2
  }
})