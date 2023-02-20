import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, StackNavigator } from "@react-navigation/native";
import Home from "./screens/Home";
import Add from "./screens/Add";
import GameList from "./screens/GameList";
import GameDetails from "./screens/GameDetails";
import { PracticeProvider, PracticeContext } from "../context/PracticeContext";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <PracticeProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Add"
          component={Add}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="GameList"
          component={GameList}
          options={{ presentation: "modal" }}
        />
        <Stack.Screen
          name="GameDetails"
          component={GameDetails}
          options={{ presentation: "modal" }}
        />
      </Stack.Navigator>
    </PracticeProvider>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
