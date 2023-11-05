import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function SharedTodoModalContent({id, title, shared_with_id, completed}) {

    const [author, setAuthor] = useState({});
    const [sharedWith, setSharedWith] = useState({});
    const [ todoShared, setTodoShared ] = useState({})

    useEffect(() => {
        fetchInfo
    }, []);

    async function fetchInfo() {
        const response = await fetch(`http://192.168.1.113:8080/todos/shared_todos/${id}`, 
        /* {
          headers: {
            "x-api-key": "abcdef123456",
          },
        }, */
        {
            method: "GET"
        }
        );
        const { author, shared_with, todoShared } = await response.json();
        setAuthor(author);
        setSharedWith(shared_with);
        setTodoShared(todoShared);
    }

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>SharedTodoModalContent</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={[styles.title]}>Status</Text>
      <View style={[styles.status, { backgroundColor: completed === 1 ? "#4ade80" : "#f87171" }]}>
        <Text style={[styles.title, { color: "#fff"}]}>
            {completed === 1 ? "Completed" : "Incompleted"}
        </Text>
      </View>
      <Text style={[styles.description]}>PARTICIPANTS</Text>
      <View style={{flexDirection: "row"}}>
        <View style={styles.participant}> 
            <Text style={[styles.description, { color: "#fff" }]}>
                {author.name}
            </Text>
        </View>
        <View style={styles.participant}>
            <Text style={[styles.description, { color: "#fff" }]}>
                {sharedWith.name}
            </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 15,

      },
      title: {
        fontWeight: "900",
        letterSpacing: 0.5,
        fontSize: 16,
        textAlign: "center",
      },
      description: {
        color: "#56636F",
        fontSize: 12,
        fontWeight: "900",
        color: "black",
      },
      participant: {
        fontSize: 30,
        backgroundColor: "#8b5cf6",
        padding: 5,
        paddingHorizontal: 10,
        margin: 5,
        borderRadius: 20,
        fontWeight: "900",
        color: "white",
      },
      input: {
        borderWidth: 2,
        borderColor: "#00000020",
        padding: 15,
        borderRadius: 15,
        marginVertical: 15,
      },
      status: {
        padding: 5,
        paddingHorizontal: 10,
        marginTop: 5,
        marginBottom: 20,
        borderRadius: 20,
        fontWeight: "900",
        color: "white",
      },
})