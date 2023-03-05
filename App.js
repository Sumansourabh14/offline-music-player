import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import AudioProviderContext from "./src/context/AudioProviderContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AudioProviderContext>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AudioProviderContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
