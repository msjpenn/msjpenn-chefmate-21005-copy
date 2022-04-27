import React from "react";
import { View } from "react-native";

import { Picker } from '@react-native-picker/picker';
import styled from 'styled-components/native'


const CBPicker = ({label, selectedValue, onValueChange, items = []}) => {
    // const items = [
    //     {"id": 0, "value": "Java"},
    //     {"id": 1, "value": "Python"}
    // ]
    return (
      <View>
          <PickerContainerView>
              <Label>{label}</Label>
              <Picker
                    selectedValue={items[1]}
                    onValueChange={(itemValue, itemIndex) =>
                        onValueChange(itemValue)
            }>
                {items.map(data => (
                    <Picker.Item label={data.value} value={data.id} key={data.id}/>
                ))}
                </Picker>
          </PickerContainerView>
      </View>
    );
  }
  
  export default CBPicker;

  const PickerContainerView = styled.View
  `
background-color: white;
margin: 0px 20px;
height: 90px;
left: 0.17px;
border-radius: 14px;
padding-vertical: 8px;
  `

  const Label = styled.Text
  `
  color: #A9A9A9;
  left: 2.53%;
  top: 10%;
  `
