import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import Root from "./navigation/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "react-native";

const queryClient = new QueryClient();

const App = () => {
  const isDark = useColorScheme() === "dark";
  console.log(isDark);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Root />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
