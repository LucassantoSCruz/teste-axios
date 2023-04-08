import React from "react";  
import { View, Text, StyleSheet } from 'react-native';

  // criação de um componente
  const Caixa = ({ campo }) => (
    <View style={styles.caixa}>
      <Text style={styles.textocampo}>{campo}</Text>
    </View>
  );

const styles = StyleSheet.create({
    caixa: {
        backgroundColor: '#f9c2ff',
        margin: 5,
        padding: 5,
      },
      textocampo: {
        fontSize: 20,
      },
})

export default Caixa