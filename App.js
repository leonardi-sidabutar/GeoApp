// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router';
// Context
import {KebunProvider } from './src/context/context';


function App() {
  return (
    <NavigationContainer>
      <KebunProvider >
        <Router/>
      </KebunProvider >
    </NavigationContainer>
  );
}

export default App;