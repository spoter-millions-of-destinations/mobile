import { Add2, Pen2, Pin4 } from '@/assets/images/Button'
import { AttractionInfo } from '@/services/attraction.service'

import { TextInput, View, Text } from 'react-native'

interface PostItemProps {
    info: Partial<AttractionInfo>
    handleChangeInfo: (name: string, value: string) => void
}

export const PostItem: React.FC<PostItemProps> = ({ info, handleChangeInfo }) => {
    return (
        <View className="mt-[15]">
            <View className="flex-row gap-x-5 mb-[20]">
                <Pen2 />
                <TextInput
                    value={info.description}
                    onChangeText={(text) => handleChangeInfo('description', text)}
                    placeholder="Enter your description"
                />
            </View>
            <View className="flex-row gap-x-5 mb-[20]">
                <Pin4 />
                <TextInput
                    onChangeText={(text) => handleChangeInfo('address', text)}
                    value={info.address}
                    placeholder="Enter your address"
                />
            </View>
        </View>
    )
}
