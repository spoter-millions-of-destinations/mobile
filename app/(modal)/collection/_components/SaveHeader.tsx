import { SaveFullFill } from '@/assets/images/Button'
import { Image } from 'expo-image'

import { Text, View } from 'react-native'

export const SaveHeader = ({ image }: { image: string }) => {
    return (
        <View className="flex-row items-center justify-between px-6 py-5 bg-neutral-200">
            <View className="flex-row items-center">
                <View className="shadow">
                    <Image
                        source={image}
                        className="w-20 h-20 rounded-[15px] mr-[25]"
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 15,
                            marginRight: 25,
                        }}
                    />
                </View>

                <View>
                    <Text className=" text-neutral-700 text-2xl font-semibold font-['Montserrat']">Saved to</Text>
                    <Text className="text-neutral-500 text-sm font-normal font-['Montserrat']">
                        Your private collection
                    </Text>
                </View>
            </View>
            <SaveFullFill />
        </View>
    )
}
