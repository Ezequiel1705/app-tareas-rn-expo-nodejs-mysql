import { Button, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import React, { useRef, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import SharedTodoModalContent from './SharedTodoModalContent';
import TodoModalContect from './TodoModalContect';
//import { color } from 'react-native-reanimated';

function CheckMark ({id, completed, toggleTodo}){

  async function toggle() {
    const response = await fetch(`http://192.168.1.113:8080/todos/${id}`, {
      headers:{
        'x-api-key': 'abcdef123456',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({
        value: completed ? false : true,
      }),
    });
    const data = await response.json();
    toggleTodo(id);
    console.log(data)
  };

  return(
    <Pressable 
      onPress={toggle}
      style={[styles.checkMark, {backgroundColor: completed === 0 ? '#F0F0F0' : '#16FF00'}]}>
    </Pressable>
  ) 
}


export default function Task ({title, id, shared_with_id, completed, toggleTodo, clearTodo}) {

  const [ isDeleteActive, setIsDeleteActive ] = React.useState(false);
  const bottomSheetModalRef = useRef(null);
  const sharedBottomSheetRef = useRef(null);
  const snapPoints = ['25%', '48%', '75%'];
  const snapPointsShared = ['40%'];

  function handleCloseModal() {
    bottomSheetModalRef.current?.close();
    sharedBottomSheetRef.current?.close();
  }

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  };

  function handlePresentShared() {
    sharedBottomSheetRef.current?.present();
  };


  async function deleteTodo(){
    const response = await fetch(`http://192.168.1.113:8080/todos/${id}`, {
      headers: {
        "x-api-key": "abcdef123456",
      },
      method:"DELETE",
    });
    clearTodo(id);
    console.log(response.status)
  };

  return (
    
        <TouchableOpacity 
          style={[styles.container]}
          onLongPress={() => setIsDeleteActive(true)}
          onPress={() => setIsDeleteActive(false)}
          activeOpacity={0.8}
        >
          <View style={styles.containerTextChackBox}>
            <CheckMark  id={id} completed={completed} toggleTodo={toggleTodo}/>
            <Text style={styles.text}>{title}</Text>
          </View>
          {shared_with_id != null ? (
            <Feather 
              onPress={handlePresentShared}
              name='users'
              size={20}
              color='#383839'
            />
            ) : (
            <Feather 
              onPress={handlePresentModal}
              name='share'
              size={20}
              color='#383839'
            />
          )}
          {isDeleteActive && (
            <Pressable onPress={deleteTodo} style={styles.deleteButton}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
            </Pressable>
          )}
          <BottomSheetModal 
            ref={sharedBottomSheetRef}
            snapPoints={snapPointsShared}
            backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
            >
              <SharedTodoModalContent 
                id={id}
                title={title}
                shared_with_id={shared_with_id}
                completed={completed}
              />
              {/* <Button title='Close Modal' onPress={handleCloseModal} /> */}
              <TouchableOpacity style={styles.buttonModal} onPress={handleCloseModal}>
                <Text style={{fontSize: 25}}>X</Text>
              </TouchableOpacity>
          </BottomSheetModal>
          
          <BottomSheetModal 
            ref={bottomSheetModalRef}
            index={2}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
          >
            <TodoModalContect id={id} title={title}/>
            {/* <Button title='Close Modal' onPress={handleCloseModal} style={styles.buttonModal} color='green'>hola</Button> */}
            <TouchableOpacity style={styles.buttonModal} onPress={handleCloseModal}>
              <Text style={{fontSize: 25, color: '#fff'}}>X</Text>
            </TouchableOpacity>
          </BottomSheetModal>
  
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: '#fff' /* #F5F5F5 */,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 6,
  },
  shadowOpacity: 0.39,
  shadowRadius: 8.30,
  elevation: 13,
  },

  containerTextChackBox: {
    flix: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
  },

  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#564248',
    letterSpacing: -0.011 * 16, // 16 = baseFontSize
    flexShrink: 1,
    marginHorizontal: 8
  },

  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 7,
    /* backgroundColor: 'red' */
  },

  deleteButton: {
    right:0,
    top: -6,
    width: 20,
    backgroundColor: '#ef4444',
    height: 20,
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 10
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10
  },

  title: {
    fontWeight: '900',
    letterSpacing: 0.5,
    fontSize: 15
  },

  subtitle: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  },

  description:{
    color: 'violet',
    fontSize: 13,
    fontWeight: 'normal',
    width: '100%'
  },

  buttonModal:{
    width: 70,
    right: -100,
    width: 200,
    top: -15,
    backgroundColor: '#ef4444',
    height: 40,
   /*  position: 'relative', */
    alignItems: 'center',
    borderRadius: 20,
  }
})