import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, AppState, SafeAreaView} from 'react-native';
import CBHeader from '../../../components/Header';
import * as AppStyles from '../../../components/appStyles'
import { useDispatch, useSelector } from 'react-redux';
import {SUCCESS} from '../../../store/constants';
import { DO_GET_TERMS } from '../../../store/auth/constants';

const TermsScreen = ({navigation,}) => {
    const dispatch = useDispatch();
    const terms = useSelector(state => state.authReducer.terms);

    const renderTerms = () => {
        const allTerms = [];
        if(terms.length>0){
            let termsJson = JSON.parse(terms);
            termsJson.map((oneTerm) => {
                allTerms.push(
                    <>
                    <Text style={[AppStyles.styles.content_h1_bold, {paddingVertical:10, textAlign:'left'}]}>
                        {oneTerm.header}
                    </Text>
                    <Text style={[AppStyles.styles.content_regular, {paddingVertical:10, textAlign:'left'}]}>
                        {oneTerm.data}
                    </Text>
                    </>
                )
            });
        }
        return allTerms;
    }

    React.useEffect(() => {
        if(terms.length <= 0){
            dispatch({type: DO_GET_TERMS});
        }
    }, [terms.length]);

    return(
        <>
        <SafeAreaView style={AppStyles.styles.safeAreaDarkHeaderStyle}></SafeAreaView>
        <SafeAreaView style={AppStyles.styles.safeAreaContentStyle}>
            <CBHeader title="Terms and conditions" navigation={navigation}/>    
            <View style={AppStyles.styles.scrollHolderForHeaderScreen}>
                <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                    {terms.length>0?
                        renderTerms()
                        :
                        <ActivityIndicator size="small" color={AppStyles.headerBackgroundColor}/>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
        <SafeAreaView style={AppStyles.styles.safeAreaLightFooterStyle}></SafeAreaView>
        </>
    );
}
export default TermsScreen;

const styles = StyleSheet.create({
    scrollContentContainer: {
        paddingHorizontal: 20,
    }
});