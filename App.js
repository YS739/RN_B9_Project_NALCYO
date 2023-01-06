import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./screen/Stacks/Login";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* <Root /> */}
        <Login />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
