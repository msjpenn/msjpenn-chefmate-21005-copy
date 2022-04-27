import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import * as AppStyles from '../../../components/appStyles';
import { useDispatch, useSelector } from 'react-redux';


const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  performLogout = () => {
    dispatch({type: "DO_LOGOUT"});
  }

  return (
    <>
    <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
    <View style={styles.scrollContainer}>
        <View style={styles.logoAndNameContainer}>
          <Image source={require('../../../assets/images/chefmate-logo.png')} />
        </View>
        <View style={styles.headingBox}>
          <View>
            <Text style={AppStyles.styles.content_h1_bold}>Welcome</Text>
          </View>
          <View>
            <Text style={[AppStyles.styles.content_regular, styles.headingSubText]}>This is default home screen after login. {'\n'} Features yet to be implemented.</Text>
          </View>
          <View style={styles.addSectionBox}>
                <TouchableOpacity style={styles.addSectionTouchableOpacity} onPress={()=>{navigation.navigate('AddRecipeSet')}}>
                    <View style={{paddingHorizontal:'3%'}}>
                        <Image source={require('../../../assets/images/snack.png')} style={styles.loginOptionIcon}/>
                    </View>
                    <Text style={[styles.loginOptionText, AppStyles.styles.content_semi]} >Add  recipe</Text>
                </TouchableOpacity>
          </View>
        </View>
    </View>
    <SafeAreaView style={AppStyles.styles.safeAreaStyle}></SafeAreaView>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems:'center',
  },
  headingSubText: {
    paddingVertical: '4%',
  },
  headingBox: {
    marginTop: '3%',
    alignItems: "center",
  },
  addSectionBox: {
    alignItems: "center",
    marginTop:20,
    height: 50,
  },
  addSectionTouchableOpacity: {
      flex:1,
        alignItems: "center",
        flexDirection:"row",
        backgroundColor: "white",
        width:'100%',
        borderRadius: 14,
        paddingHorizontal:5,
  }

})
