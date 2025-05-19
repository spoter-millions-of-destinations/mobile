import { View, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
interface PackageFormProps {
    idPackage: number
    handleSelectPackage: (id: number) => void
}
export interface PackageItem {
    id: number
    image: any
}
export const PackageForm: React.FC<PackageFormProps> = ({ idPackage, handleSelectPackage }) => {
    const data: PackageItem[] = [
        { id: 1, image: require('@/assets/images/ruby.jpg') },
        { id: 2, image: require('@/assets/images/diamond.jpg') },
        { id: 3, image: require('@/assets/images/gold.jpg') },
    ]

    return (
        <View className="flex-col items-center">
            {data.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelectPackage(item.id)}
                    className={`p-[4] rounded-[15px] ${item.id === idPackage ? 'border border-neutral-300' : ''} my-2`}
                >
                    <Image
                        style={{
                            width: 305,
                            height: 213,
                            borderRadius: 15,
                        }}
                        source={item.image}
                    />
                </TouchableOpacity>
            ))}
        </View>
    )
}
