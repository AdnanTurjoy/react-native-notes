import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  ScrollView,
  Platform,
  Keyboard,
  Button,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CgDarkMode } from "react-icons/cg";
// import styled from "styled-components/native";
import Note from "./components/Note";
import {
  AddText,
  AddWrapper,
  Container,
  Input,
  Items,
  NotesWrapper,
  SectionTitle,
  WritenoteWrapper,
} from "./style/Style";
import { DarkModeSwitch } from "react-toggle-dark-mode";
const getLocalStorage = () => {
  let noteItems = localStorage.getItem("noteItems");
  if (noteItems) {
    return JSON.parse(localStorage.getItem("noteItems"));
  } else {
    return [];
  }
};

function NotesScreen() {
  const [note, setNote] = useState("");
  const [noteItems, setNoteItems] = useState(getLocalStorage());
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    console.log(isEnabled);

    setIsEnabled((previousState) => !previousState);
  };
  // Add Note
  const handleAddnote = () => {
    Keyboard.dismiss();
    setNoteItems([...noteItems, note]);
    setNote("");
  };
  // delete note
  const deleteNote = (index) => {
    setNoteItems(noteItems.filter((data, id) => id !== index));
    // Modal
    toast.success("Successfully Deleted!");
  };
  useEffect(() => {
    localStorage.setItem("noteItems", JSON.stringify(noteItems));
  }, [noteItems]);
  return (
    <Container isEnabled={isEnabled}>
      <TouchableOpacity style={{ flex:1, alignItems:"center", justifyContent:"center", }}>
        {/* <SectionTitle isEnabled={isEnabled}>Mode: </SectionTitle> */}
        <DarkModeSwitch
          // style={{ marginBottom: "1rem" }}
          checked={isEnabled}
          onClick={toggleSwitch}
          size={40}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* notes */}
        <NotesWrapper>
          <SectionTitle isEnabled={isEnabled}>Notes</SectionTitle>
          {/* dark mode */}

          <Items>
            {noteItems.map((item, index) => {
              return (
                <Note
                  isEnabled={isEnabled}
                  text={item}
                  index={index}
                  deleteNote={deleteNote}
                />
              );
            })}
          </Items>
        </NotesWrapper>
      </ScrollView>

      <WritenoteWrapper>
        <Input
          placeholder={"Write a note..."}
          value={note}
          onChangeText={(text) => setNote(text)}
          isEnabled={isEnabled}
        />
        <TouchableOpacity onPress={() => handleAddnote()}>
          <AddWrapper isEnabled={isEnabled}>
            <AddText isEnabled={isEnabled}>+</AddText>
          </AddWrapper>
        </TouchableOpacity>
      </WritenoteWrapper>
    </Container>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
      <Image
        source={{
          uri: "https://img.freepik.com/premium-vector/notepad-spring-note-book-doodle-line-cartoon_253359-2047.jpg",
        }}
        style={{ width: 200, height: 200 }}
      />
      <Button
        title="Enter"
        onPress={() => navigation.navigate("NotesScreen")}
      />
    </View>
  );
}

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Toaster position="top-right" reverseOrder={false} />
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Wellcome"
          component={App}
          options={{ title: "Welcome" }}
        /> */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="NotesScreen"
          component={NotesScreen}
          options={{ title: "Adnan Native Notes" }}
        />
        {/* <Button title="Enter" onPress={()=>navigation.navigate('Home')} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
