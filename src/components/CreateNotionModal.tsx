import { View, Text, Modal, Alert ,StyleSheet, TextInput, Keyboard, Pressable} from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { FontSize, defalutSize } from '@/constants/Size';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { pasteFromClipboard } from '@/libs/Clipboard';
import * as Crypto from 'expo-crypto';
import dayjs from 'dayjs';
import { useSqlite } from '@/providers/SqliteProvider';

export default forwardRef(({props}:any,ref:any) => {
    const [textInput,setTextInput] = useState<string | undefined>("")
    const {exeInsert,exeUpdate} = useSqlite()
    // 获取父组件传递的值与方法
    const inputRef:any = useRef(null)
    const {toggleModal,isModalVisible,getData,id} = props

    useImperativeHandle(ref, () => ({
        inputOnFocus,
        setTextInput,
      }));

    // 切换模态框
    const inputOnFocus = () => {
        if(isModalVisible){
            inputRef?.current?.focus();
            setTimeout(() => {
                Keyboard.dismiss()
            }, 10);
        }
    };

    const send = async () => {
      if(id){
        console.log("update");
        await updata()
      }else{
        console.log("create");
        await create()
        console.log("create2");
      }
    }

    // 更新数据
    const updata = async () => {
      console.log(textInput);
      exeUpdate([textInput,id]).then(()=>{
        toggleModal();
        console.log("更新数据成功");
      })
    }

    // 创建灵感
    const create = async () => {
        toggleModal();
        const UUID = Crypto.randomUUID();
        const day = dayjs().valueOf()
        console.log(UUID);
        exeInsert([textInput,UUID,"阅读/曹操传", day],getData)
        console.log(day);
        setTextInput("")
      };
    
    return (
    <>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TextInput
                multiline={true}
                style={styles.input}
                maxLength={1000}
                autoFocus={true}
                value={textInput}
                ref={inputRef}
                onBlur={()=>{inputRef?.current?.focus()}}
                onChangeText={text => setTextInput(text)}/>

                <View style={styles.modalBtn}>
                <Pressable onPress={()=>{toggleModal()} }>
                {/* <Pressable onPress={()=>{} }> */}
                    {({ pressed }) => (
                    <Text style={styles.cancel}>取消</Text>
                    )}
                </Pressable>
                <Pressable onPress={async()=>{setTextInput(await pasteFromClipboard(textInput))} }>
                    {({ pressed }) => (
                    <Ionicons
                        color={Colors.light.tint}
                        name="clipboard-outline"
                        size={30}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                    )}
                </Pressable>
                <Pressable onPress={send}>
                    {({ pressed }) => (
                    <Ionicons
                        color={Colors.light.tint}
                        name="send-outline"
                        size={30}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                    )}
                </Pressable>
                </View>
            </View>
        </View>
    </>
    )
})

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignSelf:'center',
    },
    modalView: {
      backgroundColor: "#fff",
      borderRadius: 5,
      paddingLeft: 5,
      height:350,
      width:300,
      elevation: 2
    },
    input:{
      backgroundColor:"#fff",
      height:300,
      textAlignVertical: 'top',
      padding:defalutSize,
      fontSize:FontSize.m
    },
    modalBtn:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    cancel:{
      color:Colors.light.tagText,
      marginLeft:10,
      marginTop:10,
      fontSize:FontSize.m
    }
  })