import {useEffect, useState,useMemo} from 'react';
import {TextInput,  Pressable, View,Text,StyleSheet, FlatList, Modal, Alert, TouchableHighlight } from 'react-native';
import { Stack,Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import notions from '@assets/data/notions';
import {FontSize,defalutSize} from '@/constants/Size';
import CartItem from '@/components/CartItem';
import { Button } from '@rneui/themed';

function HomeScreen({ navigation }:any) {
  const [textInput,setTextInput] = useState("")
  const [isModalVisible, setModalVisible] = useState(false);
  const [id,setId] = useState(null)

  // 切换模态框
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 创建灵感
  const create = () => {
    setModalVisible(!isModalVisible);

    setTextInput("")
  };

  return (
    <View style={styles.container}>
      {/* 头 */}
      <Stack.Screen
        options={{
          title:'简记',
          headerTitleAlign:'center',
          headerRight: () => (
            <Link href="/search" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    color={Colors.light.other}
                    name="search"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerTintColor:Colors.light.other
        }}
        />
      
      {/* 卡片展示 */}
      <FlatList
        data={notions}
        renderItem={({item})=><CartItem notion={item}/>}
        contentContainerStyle={{gap:defalutSize,padding:defalutSize*0.5}}/>

      {/* 新增按钮 */}
      <View style={styles.button}>
        {/* <Link href="/create" asChild> */}
            <Pressable onPress={toggleModal } style={styles.buttonIcon}>
              {({ pressed }) => (
                <Ionicons
                  color={"#fff"}
                  name="add"
                  size={40}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          {/* </Link> */}
      </View>
      
      {/* 模态框 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              multiline={true}
              style={styles.input}
              maxLength={1000}
              editable
              value={textInput}
              onChangeText={text => setTextInput(text)}/>

            <View style={styles.modalBtn}>
              <Pressable onPress={toggleModal }>
                {({ pressed }) => (
                  <Text style={styles.cancel}>取消</Text>
                )}
              </Pressable>
              <Pressable onPress={create }>
                {({ pressed }) => (
                  <Ionicons
                    color={Colors.light.tint}
                    name="send"
                    size={30}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </View>
      
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  button:{
    position: 'absolute',
    justifyContent:'center',
    bottom:30,
    right:30,
    backgroundColor:Colors.light.tint,
    width:70,
    height:70,
    borderRadius:70
  },
  buttonIcon:{
    position: 'absolute',
    bottom:15,
    right:0,
  },
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


export default HomeScreen