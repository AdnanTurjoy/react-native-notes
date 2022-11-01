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
} from "react-native";
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
// styled components

export default function App() {
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
      <Toaster position="top-center" reverseOrder={false} />
      <TouchableOpacity style={{alignContent:"center"}}>
            {/* <SectionTitle isEnabled={isEnabled}>Mode: </SectionTitle> */}
            <DarkModeSwitch
              style={{ marginBottom: "2rem" }}
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
