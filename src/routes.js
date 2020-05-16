import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Main from './pages/Main';
import User from './pages/User';
import GitHub from './pages/GitHub';

const Stack = createStackNavigator();

const routes = [
  { name: 'Main', component: Main },
  { name: 'User', component: User },
  { name: 'GitHub', component: GitHub },
];

const globalOptions = {
  headerTitleAlign: 'center',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#7159c1',
  },
};

const Routes = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <NavigationContainer>
        <Stack.Navigator>
          {routes.map(({ name, component }) => (
            <Stack.Screen
              key={name}
              name={name}
              component={component}
              options={{ ...globalOptions, ...component.routeOptions }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Routes;
