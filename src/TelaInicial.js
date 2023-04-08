import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TelaInicial = ({ navigation }) => {
    return (
        <View style={styles.tela}>
            <Text style={styles.titulo}>
                Tela Inicial
            </Text>

            <TouchableOpacity style={styles.botaocadastro} onPress={()=>navigation.navigate('Cadastro')}>
                <Text style={styles.textobotao}>
                    Cadastrar Usuario
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaolistagem} onPress={()=>navigation.navigate('Listagem')}>
                <Text style={styles.textobotao}>
                    Listar Usuario
                </Text>
            </TouchableOpacity>
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
    botaocadastro: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        margin: 5
    },
    botaolistagem: {
        backgroundColor: '#0398fc',
        padding: 10,
        borderRadius: 10,
        margin: 5
    },
    textobotao: {
        fontSize: 22,
        color: 'white',
    },
})

export default TelaInicial