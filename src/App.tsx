import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './state/store';



function App(): React.JSX.Element {
  console.log('hel')
  return (
    <Provider store={store}>
       <AppNavigator />
    </Provider>
   
  )
  

}
export default App;
