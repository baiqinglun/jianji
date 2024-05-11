import { View, Text, Modal, Alert ,StyleSheet, TextInput, Keyboard, Pressable} from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { FontSize, defalutSize } from '@/constants/Size';
import Colors from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { pasteFromClipboard } from '@/libs/Clipboard';
import * as Crypto from 'expo-crypto';
import dayjs from 'dayjs';
import { useSqlite } from '@/providers/SqliteProvider';
import { Button, Divider } from 'react-native-paper';
import { useData } from '@/providers/DataProvider';
import { windowHeight, windowWidth } from '@/constants/Dimensions';
import { Tooltip } from '@rneui/themed';


export default forwardRef(({props}:any,ref:any) => {
    const [textInput,setTextInput] = useState<string | undefined>("")
    const [tagInput,setTagInput] = useState<string | undefined>("")
    const {exeSql} = useSqlite()
    const [isShowTagsPop,setIsShowTagsPop] = useState<boolean>(false)
    const [selectedTag,setSelectedTag] = useState<string>("")
    // 获取父组件传递的值与方法
    const inputRef:any = useRef(null)
    const inputTagRef:any = useRef(null)
    const {toggleModal,isModalVisible,getData,id} = props
    const {myTags} = useData()

    useImperativeHandle(ref, () => ({
        inputOnFocus,
        setTextInput,
      }));

    const showTagsPop = () => {
        console.log("show");
        setIsShowTagsPop(true)
        
    }

    // 输入框变化
    const inputTagChange = (text:string) => {
      setTagInput(text);
      setIsShowTagsPop(true);
      inputTagRef?.current?.focus()
    }

    // 选择标签后
    const selectTag = (tagid:string,tagname:string) => {
      setSelectedTag(tagid)
      console.log(tagid);
      setIsShowTagsPop(false)
      setTagInput(tagname)
    }
    // 切换模态框
    const inputOnFocus = () => {
        console.log(111);
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
        
        exeSql("searchTagIdByName",[tagInput]).then((res)=>{
          if(res.length == 0){
              const newTagId = Crypto.randomUUID();
              exeSql("insertTag",[newTagId,tagInput,"null",create_time,updata_time]).then((res)=>{
                exeSql("insertNotion",[id,textInput,newTagId, create_time,updata_time]).then(()=>{
                  toggleModal();
                  getData()
                  setTextInput("")
                })
              })

            }
            exeSql("insertNotion",[id,textInput,res[0]?.id, create_time,updata_time]).then(()=>{
              toggleModal();
              getData()
              setTextInput("")
            })
        })
      }
        catch (error) {
          throw error
        } 
      }
    
    return (
    <>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* 上部标签 */}
              <View style={{flexDirection:'row',alignItems:'center'}}>
              <Pressable onPress={()=>{showTagsPop()}}>
                <Ionicons
                  color={Colors.light.tint}
                  name="pricetags-outline"
                  size={27}
                  style={{ }}
                  />
                    <TextInput
                      style={[styles.inputTags,{textAlign:'center'}]}
                      maxLength={20}
                      value={tagInput}
                      ref={inputTagRef}
                      onChangeText={text => {inputTagChange(text)}}
                      onBlur={()=>{setIsShowTagsPop(false)}}
                      />
              </Pressable>
              
              </View>
              {/* 分割线 */}
              <Divider />
              {/* 内容输入框 */}
              <View style={{backgroundColor:'red'}}>
                <TextInput
                multiline={true}
                style={styles.inputText}
                maxLength={1000}
                // autoFocus={true}
                value={textInput}
                ref={inputRef}
                onBlur={()=>{}}
                onChangeText={text => setTextInput(text)}>
                </TextInput>
                {/* 显示tags弹窗 */}
                <View style={styles.tagModal}>
                {isShowTagsPop &&
                  myTags?.current?.filter((tagItem:any)=>
                      tagItem.name.toLowerCase().includes(tagInput)
                    ).map((tagItem:any)=>{
                      const father_name:string = tagItem?.father ? myTags?.current.map(
                        (item:any)=>{
                          if((item.id) == tagItem?.father){
                            return item.name+"/"
                          }}) : ""
                      return <Text onPress={()=>{selectTag(tagItem.id,`#${father_name}${tagItem.name}`)}} style={styles.tagText} key={tagItem.id}>#{father_name}{tagItem.name}</Text>
                    })
                }
                </View>
              </View>
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
      height:windowHeight*0.5,
      width:windowWidth*0.8,
      elevation: 2
    },
    inputTags:{
      backgroundColor:"#fff",
      width:windowWidth*0.5,
      height:40,
      textAlignVertical: 'top',
      paddingHorizontal:defalutSize*0.5,
      paddingVertical:defalutSize,
      fontSize:FontSize.m,
    },
    inputText:{
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
    },
    tagModal:{
      position: 'absolute',
      top:0,
      left:windowWidth*0.2,
      width:windowWidth*0.4,
      backgroundColor:Colors.light.tagBg,
      gap:defalutSize*0.5
    },
    tagText:{
      fontSize:FontSize.m,
      color:Colors.light.tagText,
      paddingHorizontal:defalutSize*0.2
    }
  })