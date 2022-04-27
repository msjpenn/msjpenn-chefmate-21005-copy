import React from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import * as AppStyles from '../appStyles';
import styled from 'styled-components/native'

const GroceryListItem = ({data,onInfoClick})=>{
    return <>
            <View style={styles.mainContainer}>
                <HText>{data.name}</HText>
                <Icon size={20} name="infocirlceo"  color={AppStyles.COLOR_GRAY_1} onPress={onInfoClick}/>
            </View>
        </>
}

export default GroceryListItem;

const HText = styled.Text`
/* Content P SEMI */

font-family: Nunito;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */


/* Black */

color: #000000;
`;

const styles = StyleSheet.create({
    mainContainer:{
        borderTopColor:AppStyles.COLOR_GRAY_5,
        borderTopWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:50,
        paddingHorizontal:5
    }
});