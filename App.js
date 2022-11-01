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
import styled from "styled-components/native";
import Note from "./components/Note";

const getLocalStorage = () => {
  let noteItems = localStorage.getItem("noteItems");
  if (noteItems) {
    return JSON.parse(localStorage.getItem("noteItems"));
  } else {
    return [];
  }
};
// styled components

const Container = styled.View`
  flex: 1;
  background-color: #e8eaed;
`;
const NotesWrapper = styled.View`
  padding-top: 80px;
  padding-horizontal: 20px;
`;
const SectionTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
const Items = styled.View`
  margin-top: 30px;
`;

const Input = styled.TextInput`
  padding-vertical: 35px;
  padding-horizontal: 25px;
  background-color: #fff;
  border-radius: 30px;
  border-color: #c0c0c0;
  border-width: 1px;
  width: 250px;
`;

const AddWrapper = styled.View`
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  border-color: #c0c0c0;
  border-width: 1px;
`;

const AddText = styled.Text``;
const WritenoteWrapper = styled.KeyboardAvoidingView`
  position: absolute;
  bottom: 60px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
export default function App() {
  const [note, setNote] = useState("");
  const [noteItems, setNoteItems] = useState(getLocalStorage());
  const [isDark, setIsDark] = useState(false);
  console.log(isDark);
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
    <Container>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* notes */}
        <NotesWrapper>
          <SectionTitle>Notes</SectionTitle>
          {/* dark mode */}
          <TouchableOpacity>
            <CgDarkMode onPress={() => setIsDark(!isDark)} />
          </TouchableOpacity>

          <Items>
            {noteItems.map((item, index) => {
              return <Note text={item} index={index} deleteNote={deleteNote} />;
            })}
          </Items>
        </NotesWrapper>
      </ScrollView>

      <WritenoteWrapper>
        <Input
          placeholder={"Write a note"}
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <TouchableOpacity onPress={() => handleAddnote()}>
          <AddWrapper>
            <AddText>+</AddText>
          </AddWrapper>
        </TouchableOpacity>
      </WritenoteWrapper>
    </Container>
  );
}
