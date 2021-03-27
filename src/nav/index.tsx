import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import App from './App';
import {ScreenFlow} from '@utils/Enums';
import {screenAnim} from '@utils';
import Splash from '@screens/Splash';
import Offline from '@screens/Offline';
import {rootRef, loaderRef} from '@utils/Root';
import Loader from '@comps/AppLoader';
import AppToast from '@comps/AppToast';
import {ApolloProvider} from '@apollo/client';
import {graphql_client} from '../config/index';
import AppContext, {AppProvider} from '@comps/AppProvider';
import {DARK_THEME, LIGHT_THEME} from '@utils/Colors';
import {toastRef} from '../utils/Root';
const Stack = createStackNavigator();
const getScreen = (screen: ScreenFlow) => {
  if (screen == ScreenFlow.Splash)
    return <Stack.Screen name="Splash" component={Splash} />;
  if (screen === ScreenFlow.Offline)
    return <Stack.Screen name="Offline" component={Offline} />;
  if (screen === ScreenFlow.App)
    return <Stack.Screen name="App" component={App} />;
};
const Route = () => {
  const {dark, screen} = React.useContext(AppContext);
  return (
    <NavigationContainer ref={rootRef} theme={dark ? DARK_THEME : LIGHT_THEME}>
      <Stack.Navigator screenOptions={screenAnim}>
        {getScreen(screen)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const RouteHome = () => {
  return (
    <>
      <ApolloProvider client={graphql_client}>
        <AppProvider>
          <Route />
        </AppProvider>
      </ApolloProvider>
      <Loader ref={loaderRef as any} />
      <AppToast ref={toastRef as any} />
    </>
  );
};

export default RouteHome;
