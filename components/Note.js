import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AiFillDelete } from "react-icons/ai";
import styled from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const SingleItem = styled.View`
  background-color: ${(props) => (props.isEnabled ? "#9E9897" : "#fff")};
  padding: 15px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const Square = styled.View`
  width: 24px;
  height: 24px;
  background-color: ${(props) => (props.isEnabled ? "#0698F7" : "#55bcf6")};
  opacity: 0.4;
  border-radius: 5px;
  margin-right: 15px;
`;

const ItemText = styled.Text`
  max-width: 80%;
  font-weight: bold;
  color: ${(props) => (props.isEnabled ? "white" : "black")};
`;

// const AiFillDelete = styled.AiFillDelete`
//   width: 17px;
//   height: 17px;
//   color: red;
// `;
const Note = (props) => {
  return (
    <SingleItem isEnabled={props.isEnabled}>
      <ItemLeft>
        <Square isEnabled={props.isEnabled}></Square>
        <ItemText isEnabled={props.isEnabled}>{props.text}</ItemText>
      </ItemLeft>
      <TouchableOpacity onPress={() => props.deleteNote(props.index)}>
        <AiFillDelete style={{ width: 18, height: 18, color: "#F73B28" }} />
      </TouchableOpacity>
    </SingleItem>
  );
};

export default Note;
