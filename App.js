import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { firestore, collection, addDoc, MESSAGES, serverTimestamp, query, onSnapshot } from './firebase/config';
import { useEffect, useState } from 'react';
import { QuerySnapshot, orderBy } from 'firebase/firestore';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';

export default function App() {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([])

  const save = async() => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error))
    setNewMessage('')
    console.log('message saved')
  }

useEffect(() => {
  const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'))

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tempMessages = []

    querySnapshot.forEach((doc) => {
      const messageObject = {
        id: doc.id,
        text: doc.data().text,
        created: convertFirebaseTimeStampToJS(doc.data().created)
      }

      tempMessages.push(messageObject)
    })
    setMessages(tempMessages)
  })

  return () => {
    unsubscribe()
  }
}, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message) => (
            <View style={styles.message}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      <TextInput placeholder='Send message...' value={newMessage} onChangeText={text => setNewMessage(text)} />
      <Button title='Send' type='button' onPress={save} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  message: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10
  },
  messageInfo: {
    fontSize: 12
  }
});
