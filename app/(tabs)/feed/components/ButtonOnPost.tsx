import { BlurView } from "expo-blur";
import { Text, TouchableOpacity } from "react-native";

export const ButtonOnPost = ({ text, icon, onPress }: { text?: string | number; icon: React.ReactNode; onPress: () => void }) => {
    return (
        <TouchableOpacity onPress={onPress} className="rounded-[14px] overflow-hidden">
            <BlurView
                intensity={40}
                tint="light"
                className=" px-3 py-3.5 bg-neutral-50/40 rounded-2xl backdrop-blur-[1.50px] flex-row justify-start items-center gap-2.5 overflow-hidden"
            >
                {icon}
                {text && (
                    <Text className="text-center text-neutral-50 text-xs font-semibold font-['Montserrat']">
                        {text}
                    </Text>
                )}
            </BlurView>
        </TouchableOpacity>
    )
}