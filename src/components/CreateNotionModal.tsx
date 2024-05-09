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
    const {exeSql} = useSqlite()
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

    // 更新数据
    const updata = async () => {
      try {
        exeSql("searchNotionById",[id]).then((res:any)=>{
          if(res[0]["content"] == textInput) {
            toggleModal();
            return;
          };
          const updata_time = dayjs().valueOf()
            exeSql("updateNotionById",[textInput,updata_time,id]).then(()=>{
              console.log("更新数据成功");
            })
          toggleModal();
        })
      } catch (error) {
        throw error
      }
    }

    // 创建灵感
    const create = async () => {
      try {
        const id = Crypto.randomUUID();
        const create_time:any = dayjs().valueOf()
        const updata_time:any = create_time
        console.log(id);
        
        exeSql("searchTagIdByName",["曹操传"]).then((res)=>{
          const tag_id = res[0].id
          exeSql("insertNotion",[id,textInput,tag_id, create_time,updata_time]).then(()=>{
            toggleModal();
            getData()
            setTextInput("")
          })
        })

        // exeSql("insertNotion",[id,textInput,"阅读/曹操传", create_time,updata_time]).then(()=>{
        //     toggleModal();
        //     getData()
        //     setTextInput("")
        //   })
        }catch (error) {
          throw error
        } 
      }
    
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
                <Pressable onPress={()=>{id ? updata() : create()}}>
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