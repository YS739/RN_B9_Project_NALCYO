import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import City from "./screen/Stacks/City";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* <Root /> */}
        <City />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
