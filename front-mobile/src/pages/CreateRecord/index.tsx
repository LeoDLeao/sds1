import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Header from '../../components/Header'


const CreateReacord = () => {

    return (
       <>
       <Header/>
        <Text style={styles.text}> Hello  </Text>

       </>

    );
}

const styles = StyleSheet.create({
    text: {
      color: '#fff',
      fontSize: 50
    }
    
  });

export default CreateReacord;
