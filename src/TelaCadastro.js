import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Image, Touchable, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';

import Caixa from './Caixa';
import CaixaServico from './CaixaServico';

const TelaCadastro = () => {

    // constante da pesquisa
    const [pesquisa, setPesquisa] = useState([]);

    // constate do botão
    const [clicou, setClicou] = useState(false);

    // constante de nome e senha
    const [nome_login, setnome_login] = useState(null)
    const [senha_login, setsenha_login] = useState(null)

    // chamada da rota de cadastro
    const post = () => {
        axios.post('http://192.168.10.242:3001/cadastrarUsuario', {
            nome_login,
            senha_login
        })
            .then(function (response) {
                setPesquisa(response.data)
                console.log("INSERÇÃO DO DADO: ", response.data)

            })
    }

    // controle da mudança do estado do botão
    useEffect(() => {
        if (clicou == true) {
            requestResponse()
        }
        return () => {
            setClicou(false)
        }
    }, [clicou])

    return (

        <View style={styles.tela}>

            <Text style={styles.titulo}>
                Cadastro Axios
            </Text>

            <TextInput
                style={styles.campoinserir}
                onChangeText={value => setnome_login(value)}
                value={nome_login}
                placeholder='Nome/Usuário'
            />

            <TextInput
                style={styles.campoinserir}
                onChangeText={value => setsenha_login(value)}
                value={senha_login}
                placeholder='Senha'
            />

            <TouchableOpacity style={styles.botao} onPress={() => setClicou(post)}>
                <Text style={styles.textobotao}>
                    Cadastrar
                </Text>
            </TouchableOpacity>

        </View >

    );
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
    campoinserir: {
        width: '80%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    botao: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10
    },
    textobotao: {
        fontSize: 22,
        color: 'white'
    },
});


export default TelaCadastro