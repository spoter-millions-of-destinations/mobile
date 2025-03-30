
import LoginScreen from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import SuccessScreen from "@/pages/Auth/Register/SuccessScreen";
import StartScreen from "@/pages/Auth/StartScreen";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const AuthNavgation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        </Stack.Navigator>
    );
};
export default AuthNavgation;
