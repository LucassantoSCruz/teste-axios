import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaListagem from './src/TelaListagem';
import TelaCadastro from './src/TelaCadastro';
import TelaInicial from './src/TelaInicial';
import TelaPrincipal from './src/TelaPrincipal';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Inicio'>
        <Stack.Screen name="Inicio" component={TelaInicial} />
        <Stack.Screen name="Principal" component={TelaPrincipal} />
        <Stack.Screen name="Listagem" component={TelaListagem} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;