import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {

  const [pesquisa, setPesquisa] = useState([]);

  const requestResponse = () => {
    axios.get('http://10.0.2.2:3001/listarCategoria')

      .then(function (response) {
        setPesquisa(response.data)
        console.log("RESULTADO DA BUSCA: ", pesquisa)

      })

      .catch(function (error) {
        console.log(error)

      })
  }

  useEffect(() => {
    requestResponse()
  },[])

  const Caixa = ({campo}) => (
    <View style={styles.Caixa}>
      <Text style={styles.title}>{campo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text>
        Listagem Axios
      </Text>

      <FlatList
        data={pesquisa.data}
        renderItem={({ item }) => <Caixa campo={item.nome_login}/>}
        keyExtractor={item => item.cod_login} 
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Caixa: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
