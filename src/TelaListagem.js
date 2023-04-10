import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Image, Touchable, TouchableOpacity, TextInput, Alert } from 'react-native';

import axios from 'axios';

import { useForm } from 'react-hook-form'

import Caixa from './Caixa';
import CaixaServico from './CaixaServico';

const TelaListagem = ({ navigation }) => {

    const { } = useForm();

    // constante da pesquisa
    const [pesquisa, setPesquisa] = useState([]);

    // constate do botão
    const [clicou, setClicou] = useState(false);

    // constante do botão pesquisa
    const [busca, setBusca] = useState(false);

    // constante de nome e senha
    const [nome_login, setnome_login] = useState(null)
    const [senha_login, setsenha_login] = useState(null)

    // constande de dados
    const [dados, setDados] = useState([])



    // chamada da rota de listagem
    const requestResponse = () => {

        axios.get('http://192.168.10.242:3001/listarUsuario')

            .then(function (response) {
                setPesquisa(response.data)
                console.log("RESULTADO DA BUSCA: ", pesquisa.data)
            })

            .catch(function (error) {
                console.log(error)
            })

    }



    // chamada da rota de listagem de um nome especifico
    const Login = () => {

        axios.get(`http://192.168.10.242:3001/listarUsuarioNOME/${nome_login}`, {
            dados: {
                nome_login: nome_login,
                senha_login: senha_login
            }
        })
            .then(function (response) {
                setDados(response.data)
                console.log('Usuário Encontrado: ', dados.data.nome_login);

            })
            .catch(function (error) {
                Alert.alert("Usuario não encontrado ou senha errada")
                // console.error("Erro: ", error)
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



    useEffect(() => {
        if (busca == true) {
            if (nome_login != null) {
                if (senha_login != null) {
                    Login()
                }
                else {
                    Alert.alert('Digite sua senha.')
                }
            }
            else {
                Alert.alert("Digite seu Nome")
            }
        }
        return () => {
            setBusca(false)
        }
    }, [busca])



    useEffect(() => {
        if (dados.data != null) {
            if (dados.data.nome_login == nome_login, dados.data.senha_login == senha_login) {
                Alert.alert(
                    "Login Realizado",
                    "Entre no Aplicativo",
                    [{
                        text: "Entrar",
                        onPress: () => navigation.navigate('Principal'),
                    },]
                )
            }
        }
    }, [dados])



    return (

        <View style={styles.container}>
            <Text style={styles.titulo}>
                Listagem Axios
            </Text>

            <TextInput
                style={styles.campoinserir}
                onChangeText={value => setnome_login(value)}
                value={nome_login}
            />

            <TextInput
                style={styles.campoinserir}
                onChangeText={value => setsenha_login(value)}
                value={senha_login}
            />

            <Text>
                Nome: {nome_login}
            </Text>

            <Text>
                Senha: {senha_login}
            </Text>

            <ScrollView horizontal={true}>
                <FlatList
                    data={pesquisa.data}
                    renderItem={({ item }) => <Caixa campo={item.nome_login} />}
                    keyExtractor={item => item.cod_login}
                />
            </ScrollView>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setClicou(true)}>
                    <Text style={styles.botao}>
                        Listar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setBusca(true)}>
                    <Text style={styles.botao}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 22,
        margin: 15
    },
    botao: {
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
        backgroundColor: 'white',
    },
});


export default TelaListagem