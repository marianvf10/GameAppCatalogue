import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, StackNavigator } from "@react-navigation/native";
import Home from "./screens/Home/Home";
import Add from "./screens/Add/Add";
import GameList from "./screens/GameList/GameList";
import GameDetails from "./screens/GameDetails/GameDetails";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
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
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
