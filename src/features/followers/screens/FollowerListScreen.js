import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Image, TouchableOpacity, View,Text, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import * as AppStyles from '../../../components/appStyles';
import CBHeader from '../../../components/Header';
import styled from 'styled-components/native';
import { useSelector,useDispatch } from 'react-redux';
import {followerService} from '../../../store/followers/services';
import FollowerTabs from './FollowerTabs';

const FollowerListScreen = ({navigation,route})=>{
    const userId = route?.params?.id;
    const selectedTab = route?.params?.tab;
    const getFollowerList = async ()=>{
        await followerService.getFollowerList(userId);
    }
    React.useEffect(()=>{
        //getFollowerList();
    },[]);

    const renderListItems = ()=>{
        
    }
    
    return <>
        <SafeAreaView style={AppStyles.styles.safeAreaDarkHeaderStyle}></SafeAreaView>
                <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
                    <View>
                        <CBHeader title="" navigation={navigation}/>
                    </View>
                    <View style={[AppStyles.styles.scrollHolderForHeaderScreen, {paddingTop:10}]}>
                        <View style={styles.addItemContainer}>
                            <FollowerTabs params={userId} selectedTab = {selectedTab}/>
                        </View>
                    </View>
                </SafeAreaView>
        <SafeAreaView style={AppStyles.styles.safeAreaWhiteFooterStyle}></SafeAreaView>
    </>
}

export default FollowerListScreen;

const styles = StyleSheet.create({
    addItemContainer:{
        flex:1,
        paddingTop:5
    },
});