import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

const randomNumber = ({ id, number, isDisabled, onPress }) => {
  function handleBtnPress(event: GestureResponderEvent): void {
    if (isDisabled) return;
    console.log(`Button with index ${id} number ${number} pressed!`);
    onPress(id);
  }

  return (
    <TouchableOpacity disabled={isDisabled} onPress={handleBtnPress}>
      <Text style={[style.random, isDisabled ? style.selectedStyle : null]}>
        {number}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  random: {
    fontSize: 20,
    color: "#000",
    backgroundColor: "#ddd",
    width: 150,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 25,
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#075a2aff",
    textAlign: "center",
  },
  selectedStyle: {
    opacity: 0.7,
  },
});
export default randomNumber;
