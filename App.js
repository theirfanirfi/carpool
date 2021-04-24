
import 'react-native-gesture-handler';
import React, {useState, useContext, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { RootNavigator } from './src/navigators/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
    //initial state while firebase is loading
    const [initializing, setInitializing] = useState(true);
    const authContext = useContext(AuthContext)
    const { currentUser } = authContext
  
    useEffect(() => {
      // RNBootSplash.hide({fade: true})
    }, []);
  
    useEffect(() => {
      // console.log('App.js CurrentAuthChanged',currentUser)
      if (initializing) setInitializing(false);
    },[currentUser])
  
    if (initializing) return null;


  return (
    <SafeAreaProvider >
      <NavigationContainer>
          <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default () => {
  return (
      <AuthProvider>
          <App />
      </AuthProvider>
  );
};