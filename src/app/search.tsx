import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import React, { useState,useRef } from 'react'
import { Stack } from 'expo-router'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { FontSize, defalutSize } from '@/constants/Size';
import Colors from '@/constants/Colors';
import { ButtonGroup } from '@rneui/base';

export default function SearchScreen (){
  const insets = useSafeAreaInsets();
  const [searchText,setSearchText] = useState("")
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const textInput = useRef(null);

  const inputLose = () => {
    textInput?.current?.blur();
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
        <ButtonGroup
          // selectedButtonStyle={{borderColor:Colors.light.tagBg,borderWidth:1,backgroundColor:'#fff'}}
          selectedButtonStyle={{backgroundColor:Colors.light.tagBg}}
          selectedTextStyle={{color:Colors.light.tagText,fontWeight:'900'}}
          buttons={['标签']}
          selectMultiple
          selectedIndexes={selectedIndexes}
          onPress={(value) => {
            setSelectedIndexes(value);
          }}
          containerStyle={{ marginBottom: 20 }}
        />
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
    width:Dimensions.get('window').width-80,
    padding:defalutSize*0.7,
    borderRadius:defalutSize*2
  },
  cancel:{
    width:50,
    fontSize:FontSize.m,
    color:Colors.light.other
  },
  input:{
    width:Dimensions.get('window').width-100,
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
    fontSize:FontSize.l,
    marginLeft:defalutSize,
    marginBottom:defalutSize*2
  }
})