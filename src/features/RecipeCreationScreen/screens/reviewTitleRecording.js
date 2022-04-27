import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import styled from 'styled-components/native'

import * as AppStyles from '../../../components/appStyles';
import Header from '../../../components/AddRecipeHeader';


const app = ({ route, navigation }) => {
    const headerText = 'Fist you have to record a \n recipe title.';
    return (
        <Header htext={headerText} subText={'Press record when ready.'}>
            <MainView>
            </MainView>
        </Header>
    );
}


export default app;

const MainView = styled.View` 
flex: 1;
flex-direction: column;
align-items: center;
`

const styles = StyleSheet.create({

});