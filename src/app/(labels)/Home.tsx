import { useRef, useState} from 'react';
import {Pressable, View,StyleSheet, FlatList, Modal, Alert,  Keyboard } from 'react-native';
import { Stack,Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import notions from '@assets/data/notions';
import {FontSize,defalutSize} from '@/constants/Size';
import CartItem from '@/components/CartItem';
import CreateNotionModal from '@/components/CreateNotionModal';

function HomeScreen({ navigation }:any) {
  const notionModalRef:any = useRef(null)
  const [isModalVisible, setModalVisible] = useState(false);
  // 切换模态框
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  };

  // 添加灵感模态框
  const openModal = async () => {
    await toggleModal()
    notionModalRef?.current?.inputOnFocus()
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
        <Pressable onPress={()=>{openModal()} } style={styles.buttonIcon}>
          {({ pressed }) => (
            <Ionicons
              color={"#fff"}
              name="add"
              size={40}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </View>
      
      {/* 灵感记录弹窗 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <CreateNotionModal props={{toggleModal,isModalVisible}} ref={notionModalRef}/>
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
  }
})


export default HomeScreen