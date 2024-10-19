import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, FlatList, TouchableOpacity,  View } from 'react-native';
import { addDoc, collection, firestore, serverTimestamp, onSnapshot, query, deleteDoc, MESSAGES } from './firebase/Config';
import { useState, useEffect } from 'react';
import { doc, orderBy } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons'


export default function App() {
  
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessage] = useState([])

  useEffect(() => {
    const kysely = query(collection(firestore, MESSAGES), orderBy('created', 'desc'))

    const unsubscribe = onSnapshot(kysely, (querySnapshot) => {
      const tempMessages = []
      querySnapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id })
      })
      setMessage(tempMessages)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const Save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch (error => console.log(error))

    setNewMessage('')
    console.log('Message saved.')
  }

  const deleteMessage = async (id) => {
    const messageDocRef = doc(firestore, MESSAGES, id)
    await deleteDoc(messageDocRef)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder='Send message...'
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          />
          <Button title="Save" onPress={Save}/>
      </View>
      <ScrollView>
        {messages.map((message) => (
            <View key={message.id} style={styles.form}>
              {}
              <Text multiline >{message.text}</Text>
              <TouchableOpacity onPress={() => deleteMessage(message.id)}>
                <Ionicons name="trash" size={30} color="black" />
          
              </TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    marginTop: 24,
  },form:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
});
