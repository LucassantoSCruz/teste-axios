import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Image, Touchable, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';

import Caixa from './Caixa';
import CaixaServico from './CaixaServico';

const TelaListagem = () => {

    // constante da pesquisa
    const [pesquisa, setPesquisa] = useState([]);

    // constate do botão
    const [clicou, setClicou] = useState(false);

    // constante de nome e senha
    const [nome_login, setnome_login] = useState(null)
    const [senha_login, setsenha_login] = useState(null)

    // chamada da rota de listagem
    const requestResponse = () => {
        axios.get('http://192.168.10.242:3001/listarUsuario')

            .then(function (response) {
                setPesquisa(response.data)
                console.log("RESULTADO DA BUSCA: ", pesquisa)

            })

            .catch(function (error) {
                console.log(error)

            })
    }

    // chamada da rota de listagem de um nome especifico
    const Login = () => {
        axios.get(`http://192.168.10.242:3001/listarUsuarioNOME/${nome_login}`
            , {
                data: {
                    nome_login: nome_login,
                    senha_login: senha_login
                }
            }
        )
            .then(function (response) {
                console.log('Nome Encontrado: ', response.data.nome_login);

                if (response.data.nome_login == nome_login) {
                    Alert.alert("Login Efetuado")
                }
                else {
                    Alert.alert("Usuário não encontrado ")
                }
            })
            .catch(function (error) {
                console.error("Nome Não Encontrado: ", error)
            })
    }

    // controle da atualização da rota de listagem (preciso rever essa parte, pois qualquer alteração no código, a chamada já responde)
    // useEffect(() => {
    //   requestResponse()
    // }, [])

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
        <ScrollView horizontal={true}>
            <View style={styles.container}>
                <Text>
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

                <FlatList
                    data={pesquisa.data}
                    renderItem={({ item }) => <Caixa campo={item.nome_login} />}
                    keyExtractor={item => item.cod_login}
                />

                <TouchableOpacity onPress={() => setClicou(true)}>
                    <Text style={styles.botao}>
                        Listar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setClicou(Login)}>
                    <Text style={styles.botao}>
                        Buscar
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botao: {
        fontSize: 22
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
});


export default TelaListagem