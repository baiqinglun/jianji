import React from 'react';
import { Drawer } from 'expo-router/drawer';

export default function TabLayout() {
  return (
    <Drawer initialRouteName="Home">
      <Drawer.Screen name="Home"/>
      <Drawer.Screen name="Notification"/>
    </Drawer>
  );
}
