/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import styled from 'styled-components/native'


const app = ({ badgeNumber, clearSeletctedImage, onChangeText, handleAddStep, value,addPhotos }) => {

    const [disable, setDisable] = React.useState(false);
    React.useEffect(()=>{
        console.log("image====>",value);
    },[value]);
    return (
        <MainView>
            <TextAreaView>
                <BadgeView><BadgeText>{ badgeNumber }</BadgeText></BadgeView>
                <Description
                    value={!value.description ? null : value.description}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical = "top"
                    onChangeText={(val) => {
                        onChangeText(val);
                    }
                    }
                />
                
            </TextAreaView>
            {value.image?.base64 != undefined && 
            <View style={{margin:10,width:100,height:100}}>
                <ImageV source={{uri:`data:${value.image.type};base64,${value.image.base64}`}}/>
                <Text onPress={()=>{clearSeletctedImage()}} style={{position:'absolute',top:2,right:6,color:'#fff',fontWeight:'bold',fontSize:20}}>x</Text>
            </View>
            }
            
            <AddPhotoView onPress={()=>{addPhotos()}}>
                <Image source={require('../../assets/images/add_photos.png')}/>
                <AddPhotosText>Add Photo(s) or Video(s)</AddPhotosText>
            </AddPhotoView>
            <AddStepView>
                <AddStepText onPress={() => handleAddStep()}>
                    + Add Step
                </AddStepText>
            </AddStepView>
        </MainView>
    );
}

const PhotoView = styled.View `
background: red;
height: 150px;
width: 365px;
`

const AddStepText = styled.Text ` 
font-family: Nunito;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 22px;
/* identical to box height */


/* Seconday */
margin:5px 0px;
color: #61BAAC;

`

const AddStepView = styled.View ` 
width: 345px;
height: 46px;


/* Inside Auto Layout */

flex: none;
/* order: 3; */
flex-grow: 0;
border-bottom-color: #ECECEC;
border-bottom-width: 1px;
`

const AddPhotosText = styled.Text ` 
margin-left: 5%;
font-family: Nunito;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 22px;
/* identical to box height */


/* Gray - 2 */

color: #999999;
`

const ImageV = styled.Image`
border-radius: 10px;
width:100px;
height:100px;
`;
const AddPhotoView = styled.TouchableOpacity `
flex: 1;
flex-direction: row;
align-items: center; 
margin-top: 5%;
margin-bottom: 5%;

background: #F2F2F2;
/* Gray - 4 */
padding:10px 0px;
border: 1px dashed #DDDDDD;
border-radius: 10px;
padding-left: 15%;
width:100%;
`
const Description = styled.TextInput`
width: 100%;
height: 177px;
background: white;
border-radius: 14px;
`
const BadgeText = styled.Text `
color: white;
margin:auto;
`

const BadgeView = styled.View ` 
background: #000;
border-radius: 20px;
height:40px;
width:40px;
align-items:center;
justify-content:center;
margin:10px
`

const TextAreaView = styled.View ` 
/* position: absolute; */
width: 345px;
min-height: 196px;
height:auto;
margin: 0px 0px;
`

const MainView = styled.View ` 
flex: 1;
flex-direction: column;
align-items: flex-start;
width: 345px;
`
export default app;