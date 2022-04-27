/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';

import styled from 'styled-components/native'


const app = ({showModal}) => {

    return (
        <>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={showModal}
            >

                <CenterView>
                    
                </CenterView>
                
            </Modal>
        </>
    );
}

const CenterView = styled.View ` 
flex: 1;
justify-content: center;
align-items: center;
margin-top: 22px;
background: black;
opacity: 0.4;
`

export default app;