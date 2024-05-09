import { useCallback, useEffect, useRef, useState} from 'react';
import {Pressable, View,StyleSheet, FlatList, Modal, Alert,  Keyboard } from 'react-native';
import { Stack,Link,Navigator, useFocusEffect } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import {FontSize,defalutSize} from '@/constants/Size';
import CartItem from '@/components/CartItem';
import CreateNotionModal from '@/components/CreateNotionModal';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerActions,useNavigation } from '@react-navigation/native';
import { useSqlite } from '@/providers/SqliteProvider';

function HomeScreen() {
  const notionModalRef:any = useRef(null)
  const [mynotions,setNotions] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation()
  
  const {db,getDbFile,exeSelectAll} = useSqlite()
  // getDbFile()
  // useEffect(() => {
  //   exeSelectAll(setNotions)
  //   console.log("15");
  // }, [db]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', async() => {
  //     await getData()
  //     console.log(1);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      exeSelectAll(setNotions)
      return () => {
        // 离开时发生的事件
      }
    }, [])
  );

  // 切换模态框
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  };

  // 添加灵感模态框
  const openModal = async () => {
    toggleModal()
    notionModalRef?.current?.inputOnFocus()
  };

  // 获取数据并添加至列表
  const getData = async () =>{
    await exeSelectAll(setNotions)
  }

  return (
    <View style={styles.container}>
      {/* 头 */}
      <Stack.Screen
        options={{
          title:'简记',
          headerTitleAlign:'center',
          headerLeft:()=>(
            <Pressable onPress={()=>{navigation.dispatch(DrawerActions.toggleDrawer())}}>
                {({ pressed }) => (
                  <MaterialIcons
                    color={Colors.light.other}
                    name="density-medium"
                    size={25}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          ),
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
      ></Stack.Screen>

      {/* 卡片展示 */}
      <FlatList
        data={mynotions}
        renderItem={({item})=><CartItem cartType="show" notion={item} func={getData}/>}
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
          setModalVisible(!isModalVisible)
        }}
      >
        {/* 传递给子组件一些数值及函数 */}
        <CreateNotionModal props={{toggleModal,isModalVisible,getData}} ref={notionModalRef}/>
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