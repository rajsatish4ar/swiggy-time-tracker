import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TaskList from '@screens/TaskList';
import TaskDetails from '@screens/TaskDetails';
import {screenAnim} from '@utils';
const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={screenAnim}>
      <Stack.Screen name="TaskList" component={TaskList} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} />
    </Stack.Navigator>
  );
};

export default Auth;
