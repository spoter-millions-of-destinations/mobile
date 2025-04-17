import { useNavigation } from '@react-navigation/native'
import { Link } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

const SuccessScreen = () => {
    return (
        <View>
            <TouchableHighlight>
                <Link href="/auth/login">Success!</Link>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({})

export default SuccessScreen
