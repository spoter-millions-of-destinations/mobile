import React from 'react'
import { StyleSheet, View } from 'react-native'

const ContainerComponent = (props) => {
    return <View className="flex-1 px-6 bg-white">{props.children}</View>
}

const styles = StyleSheet.create({})

export default ContainerComponent
