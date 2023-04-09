import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TelaPrincipal = () => {
    return (
        <View style={styles.tela}>
            <Text style={styles.titulo}>
                Tela Principal
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 22,
        margin: 15
    },
})

export default TelaPrincipal