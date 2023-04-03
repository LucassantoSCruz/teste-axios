import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {

  // constante da pesquisa
  const [pesquisa, setPesquisa] = useState([]);

  // constate do botão
  const [clicou, setClicou] = useState(false);

  // chamada da rota de listagem
  const requestResponse = () => {
    axios.get('http://192.168.10.242:3001/listarCategoria')

      .then(function (response) {
        setPesquisa(response.data)
        console.log("RESULTADO DA BUSCA: ", pesquisa)

      })

      .catch(function (error) {
        console.log(error)

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

  // chamada da rota de cadastro
  const post = () => {
    const data = {
      nome_login: 'Harmonização Facial',
      senha_login: '123456'
    };
    axios.post('http://192.168.10.242:3001/cadastrarCategoria', data)
      .then(function (response) {
        setPesquisa(response.data)
        console.log("INSERÇÃO DO DADO: ", response) 

      })
  }

  // criação de um componente
  const Caixa = ({ campo }) => (
    <View style={styles.caixa}>
      <Text style={styles.title}>{campo}</Text>
    </View>
  );

  // criação de um componente com base no projeto tcc
  CaixaServico = ({ campo }) => {
    return (
      <View style={styles.fundo}>
        <View style={styles.fundoimagem}>
          <Image
            source={require('./assets/imagem1.png')}
            style={styles.imagem} />
        </View>
        <View style={styles.fundonome}>
          <Text style={styles.texto}>
            {campo}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        <Text>
          Listagem Axios
        </Text>
        <FlatList
          data={pesquisa.data}
          renderItem={({ item }) => <CaixaServico campo={item.nome_login} />}
          keyExtractor={item => item.cod_login}
        />
        <TouchableOpacity onPress={() => setClicou(true)}>
          <Text style={styles.botao}>
            Listar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setClicou(post)}>
          <Text style={styles.botao}>
            Cadastrar
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
  },
  caixa: {
    backgroundColor: '#f9c2ff',
    margin: 15,
    padding: 15,
  },
  title: {
    fontSize: 32,
  },
  fundonome: {
    height: 75,
    borderRadius: 14,
    backgroundColor: '#9a6b99',
  },
  fundo: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    flex: 1,
    marginLeft: 7.5,
    marginRight: 7.5,
    marginBottom: 15,
  },
  imagem: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  fundoimagem: {
    alignItems: 'center'
  },
  texto: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  botao: {
    fontSize: 22
  }
});
