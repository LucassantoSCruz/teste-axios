import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaListagem from './src/TelaListagem';
import TelaCadastro from './src/TelaCadastro';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Listagem'>
        <Stack.Screen name="Listagem" component={TelaListagem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;