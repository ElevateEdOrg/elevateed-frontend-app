import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './state/store';
import {StripeProvider} from '@stripe/stripe-react-native'

const STRIPE_KEY=""

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_KEY}>
      <AppNavigator />
      </StripeProvider>
      
    </Provider>
  )
  

}
export default App;
