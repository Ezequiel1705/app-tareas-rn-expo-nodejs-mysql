import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import Task from './components/Task';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import InputTask from './components/InputTask';
import { useFonts } from 'expo-font';

const background = require('../Client/assets/background.png')

export default function App() {

  /* const [loaded] = useFonts({
    Koulen: require('./assets/Fonts/Koulen/Koulen-Regular.ttf'),
    LatoRegular: require('./assets/Fonts/Lato/Lato-Regular.ttf')
  }); */
  
  /* if (!loaded) {
    return <ActivityIndicator/>;
  } */

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []) 

  async function fetchData (){
    const response = await fetch("http://192.168.1.113:8080/todos/1");
    const data = await response.json();
    setTodos(data);
  }

  function clearTodo(id){
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  function toggleTodo(id){
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {...todo, completed: todo.completed === 1 ? 0 : 1}
          : todo
      )
    )
  }

  return (
    <BottomSheetModalProvider>
        <Image source={background} style={styles.background}/>
        <SafeAreaView style={styles.container}>
          <FlatList 
            data={todos}
            keyExtractor={(todo) => todo.id}
            renderItem={({item}) => <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo}/>}
            ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
            contentContainerStyle={styles.contentContainerStyle}
          />
          <InputTask todos={todos} setTodos={setTodos}/>
        </SafeAreaView>
        {/* <Text>{JSON.stringify(todos, null, 1 )}</Text> */}
        <StatusBar hidden/>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  title:{ 
    fontWeight: "800",
    fontSize: 30,
    marginBottom: 15,
    /* fontFamily: 'Koulen' */
  },
  contentContainerStyle: {
    padding: 16
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    resizeMode: "cover",
    opacity: 0.2
},
});
