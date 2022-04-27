import React from "react";
import { StyleSheet, View, Text, TextInput, ActivityIndicator } from "react-native";
import * as AppStyles from '../appStyles'
import {LOADING, FAILED, SUCCESS} from '../../store/constants';

const CBActionStatus = ({status, errorMessage, successMessage}) => {
  return (
    <>
        {status==LOADING?
            <ActivityIndicator size="small" color={AppStyles.headerBackgroundColor}/>
            :null
        }
        {status==FAILED ?
            <Text style={{color:AppStyles.COLOR_RED}}>Unable to process your request.</Text>
        :null
        }
        {status==SUCCESS && successMessage != null && successMessage.length>0?
            <Text style={{color:AppStyles.headerBackgroundColor}}>{successMessage}</Text>
        :null
        }
    </>
  );
}
export default CBActionStatus;

const styles = StyleSheet.create({

});
