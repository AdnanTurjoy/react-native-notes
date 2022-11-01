import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AiFillDelete } from "react-icons/ai";
import styled from "styled-components/native";

const SingleItem = styled.View`
  background-color: #fff;
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
  background-color: #55bcf6;
  opacity: 0.4;
  border-radius: 5px;
  margin-right: 15px;
`;

const ItemText = styled.Text`
  max-width: 80%;
`;

// const AiFillDelete = styled.AiFillDelete`
//   width: 17px;
//   height: 17px;
//   color: red;
// `;
const Note = (props) => {
  return (
    <SingleItem>
      <ItemLeft>
        <Square></Square>
        <ItemText>{props.text}</ItemText>
      </ItemLeft>
      <TouchableOpacity onPress={() => props.deleteNote(props.index)}>
        <AiFillDelete style={{ width: 17, height: 17, color: "red" }} />
      </TouchableOpacity>
    </SingleItem>
  );
};


export default Note;