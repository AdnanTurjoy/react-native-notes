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
import Note from "./components/Note";

const getLocalStorage = () => {
  let noteItems = localStorage.getItem("noteItems");
  if (noteItems) {
    return JSON.parse(localStorage.getItem("noteItems"));
  } else {
    return [];
  }
};

export default function App() {
  const [note, setNote] = useState("");
  const [noteItems, setNoteItems] = useState(getLocalStorage());

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
    <View style={styles.container}>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* notes */}
        <View style={styles.notesWrapper}>
          <Text style={styles.sectionTitle}>Notes</Text>

          <View style={styles.items}>
            {noteItems.map((item, index) => {
              return <Note text={item} index={index} deleteNote={deleteNote} />;
            })}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writenoteWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a note"}
          value={note}
          onChangeText={(text) => setNote(text)}
        />
        <TouchableOpacity onPress={() => handleAddnote()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  notesWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  removeText: {
    fontSize: 15,
    color: "red",
    backgroundColor: "#f9cdc4",
    padding: 10,
    borderRadius: 15,
  },
  items: {
    marginTop: 30,
  },
  writenoteWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 35,
    paddingHorizontal: 25,
    backgroundColor: "#FFF",
    borderRadius: 30,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
