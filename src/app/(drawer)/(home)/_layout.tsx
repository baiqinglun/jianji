import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen name="search"></Stack.Screen>
    </Stack>
  );
};

export default Layout;
