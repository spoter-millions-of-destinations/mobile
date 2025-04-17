
import LoginScreen from "@/app/(tabs)/Auth/Login";
import StartScreen from "@/app/auth/StartScreen";
import SuccessScreen from "@/app/auth/SuccessScreen";
import Register from "@/pages/InApp/Register/Register";
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
