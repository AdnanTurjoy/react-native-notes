import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => (props.isEnabled ? "#494B4C " : "#e8eaed")};
`;
export const NotesWrapper = styled.View`
  padding-top: 5px;
  padding-horizontal: 10px;
`;
export const SectionTitle = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: ${(props) => (props.isEnabled ? "white" : "black")};
`;
export const Items = styled.View`
  margin-top: 5px;
`;

export const Input = styled.TextInput`
  padding-vertical: 35px;
  padding-horizontal: 25px;
  background-color: ${(props) => (props.isEnabled ? "#9E9897" : "#fff")};
  border-radius: 30px;
  border-color: #c0c0c0;
  border-width: 1px;
  width: 250px;
  color: ${(props) => (props.isEnabled ? "#fff" : "black")};
`;

export const AddWrapper = styled.View`
  width: 60px;
  height: 60px;
  background-color: ${(props) => (props.isEnabled ? "#9E9897" : "#fff")};
  border-radius: 60px;
  justify-content: center;
  align-items: center;
  border-color: #c0c0c0;
  border-width: 1px;
`;

export const AddText = styled.Text`
  color: ${(props) => (props.isEnabled ? "#fff" : "black")};
`;

export const DarkMode = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const WritenoteWrapper = styled.KeyboardAvoidingView`
  position: absolute;
  bottom: 60px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
