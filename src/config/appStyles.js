import { StyleSheet } from 'react-native';

export const appBackgroundColor = '#F5F5F5';
export const headerBackgroundColor = '#61BAAC';
export const appFontFamily = "Nunito";
export const FONT_FAMILY = "Nunito";
export const COLOR_GRAY_1 = "#4C4C4C";
export const COLOR_GRAY_2 = "#999999";
export const COLOR_GRAY_3 = "#A9A9A9";
export const COLOR_GRAY_5 = "#E6E6E6";
export const COLOR_RED = "#F04D4D";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: appBackgroundColor,
  },
  safeAreaStyle: {
    flex: 0, 
    backgroundColor: appBackgroundColor
  },
  safeAreaDarkHeaderStyle: {
    flex: 0, 
    backgroundColor: headerBackgroundColor
  },
  safeAreaContentStyle: {
    flex: 1, 
    backgroundColor: headerBackgroundColor
  },
  safeAreaLightFooterStyle: {
    flex: 0, 
    backgroundColor: appBackgroundColor
  },
  content_h1_bold: {
    color: "black",
    fontSize: 25,
    fontFamily: FONT_FAMILY,
    fontWeight: "900",
    lineHeight:25,
    textAlign:'center',
  },
  content_h1: {
    color: "black",
    fontSize: 19,
    fontFamily: FONT_FAMILY,
    fontFamily: FONT_FAMILY,
    fontWeight: "700",
    lineHeight:25,
    textAlign:'center',
  },
  content_h2_bold: {
    color: "black",
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    fontWeight: "700",
    lineHeight:21,
  },
  content_p_bold:{
    color: "black",
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    fontWeight: "700",
    lineHeight:20,
  },
  content_semi: {
    color: "black",
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    fontWeight: "600",
    lineHeight: 20,
  },
  content_regular: {
    color: "black",
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: 'center'
  },
  content_smallprint:{
    color: COLOR_GRAY_3,
    fontSize: 12,
    fontFamily: FONT_FAMILY,
    lineHeight: 18,
    fontWeight: "600",
    textAlign:'center'
  },
  content_listdescription:{
    color: COLOR_GRAY_1,
    fontSize: 14,
    fontFamily: FONT_FAMILY,
    lineHeight: 19,
    fontWeight: "600",
    textAlign:'center'
  },
  buttonPrimary: {
    height:50,
    color: "white",
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    lineHeight: 20,
    alignItems: "center", 
    borderColor: "#61BAAC",
    borderWidth:1,
    width:'100%',
    borderRadius: 14,
    alignItems:"center",
    justifyContent: 'center',
    alignItems: "center",
    paddingVertical: '3%',
    backgroundColor: "#61BAAC",
  },
  buttonPrimaryText: {
    color:"white",
    fontSize:17,
    fontFamily: FONT_FAMILY,
    fontWeight:"600"
  },
  buttonSecondary: {
    height:50,
    color: "black",
    fontSize: 16,
    fontFamily: FONT_FAMILY,
    lineHeight: 20,
    alignItems: "center", 
    borderColor: "#61BAAC",
    borderWidth:1,
    width:'100%',
    borderRadius: 14,
    alignItems:"center",
    justifyContent: 'center'
  },
  buttonSecondaryText: {
    color: headerBackgroundColor,
    fontSize:17,
    fontFamily: FONT_FAMILY,
    fontWeight:"600"
  },
  filler: {
    flex:1,
  },
  scrollHolderForHeaderScreen: {
    flex:1,
    backgroundColor: appBackgroundColor,
    marginTop: 50,
    borderTopStartRadius: 20,
    borderTopEndRadius:20,
    paddingTop: 20,
  },
  scrollContentContainerOfHeaderScreen: {
    paddingHorizontal: 25,
    flex:1
  },
  

});




