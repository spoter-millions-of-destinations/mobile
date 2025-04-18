import React from 'react'
import { View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
type Props = {
    isDisabled?: boolean
    defaultRating: number
}
const Rating = ({ isDisabled = false, defaultRating }: Props) => {
    return (
        <View>
            <AirbnbRating
                starContainerStyle={{
                    alignSelf: 'auto',
                    backgroundColor: 'transparent',
                }}
                size={16}
                isDisabled={isDisabled}
                showRating={false}
                defaultRating={defaultRating}
                selectedColor="#F5954B"
            />
        </View>
    )
}

export default Rating
