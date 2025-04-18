import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AddPhoto, Checked, CropPhoto, Unchecked } from '@/assets/images/Button'
import Rating from '../../../../components/Rating'
import Form from './Form'

const Accordion = () => {
    const [expanded, setExpanded] = useState(false)
    const [animation, setAnimation] = useState(new Animated.Value(1))

    const toggleAccordion = () => {
        const finalValue = expanded ? 0 : 1
        Animated.timing(animation, {
            toValue: finalValue,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start()
        setExpanded(!expanded)
    }

    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 184], // Adjust height as necessary
    })

    return (
        <View className="w-full bg-stone-100 rounded-tl-2xl rounded-tr-2xl shadow-[0px_-4px_15px_0px_rgba(0,0,0,0.15)]">
            <TouchableOpacity
                onPress={toggleAccordion}
                className="flex-row  justify-between bg-stone-100 px-[38] py-3 rounded-tl-[15px] rounded-tr-[15px] "
            >
                <View className="flex-row gap-6 justify-between ">
                    <AddPhoto />
                    <CropPhoto />
                </View>
                <Ionicons name={expanded ? 'chevron-down' : 'chevron-up'} size={24} className="text-stone-100" />
            </TouchableOpacity>
            <Animated.View style={[{ height }]}>
                <View>
                    <Form checked={true} title="Pin on Map" description="Enabling pin will allow everybody can see" />
                    <Form checked={true} title="Comment" description="You allow people to comment your post" />
                    <Form title="Evaluate" description="Rate this place" icon={<Rating defaultRating={4} />} />
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default Accordion
