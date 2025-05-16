import { Image, ImageBackground } from 'expo-image'

import { Challenge as ChallengeIcon, Coin, Wallet } from '@/assets/images/Button'
import MissionComponent from '@/components/MissionComponent'
import { missions } from '@/data/missions'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from './_components/Button'
const Challenge = () => {
    return (
        <View className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* HEADER */}
                <ImageBackground
                    style={{
                        height: 210,
                        width: '100%',
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        justifyContent: 'center',
                        padding: 24,
                        marginBottom: 73,
                    }}
                    className="h-[210] rounded-bl-[50] rounded-br-[50] justify-center p-6  mb-[73]"
                    source={require('@/assets/images/bg-challenge.jpg')}
                >
                    <View className="relative">
                        <Text className="text-neutral-50 text-2xl font-semibold font-['Montserrat'] ">
                            Congratulation!
                        </Text>
                        <Text className="text-neutral-50 text-xs font-normal font-['Montserrat'] ">
                            You got a new Mission
                        </Text>
                        <View className="h-[100px] w-full bg-neutral-50 rounded-[15px] shadow items-center flex-row justify-between px-5 mb-5 absolute bottom-[-300%] transform -translate-x-1/2 ">
                            <View className="flex-row items-center justify-center gap-x-4">
                                <ChallengeIcon />
                                <Text className="text-black text-sm font-semibold font-['Montserrat'] leading-none">
                                    Rewards
                                </Text>
                            </View>
                            <View className="flex-col ">
                                <View className="flex-row items-center">
                                    <Text className="text-right text-black text-2xl font-semibold font-['Montserrat']">
                                        23.425
                                    </Text>
                                    <Image
                                        style={{
                                            width: 40,
                                            height: 40,
                                        }}
                                        contentFit="cover"
                                        source={require('@/assets/images/token.jpg')}
                                    />
                                </View>
                                <Text className="text-black text-[10px] font-normal font-['Montserrat']">
                                    Equals 23,425 VNĐ
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <View className="flex-1 px-6">
                    <View className="flex-row justify-between mb-[20] w-full items-center">
                        <Button onPress={() => {}} icon={<Coin />} text={'Wallet'} />
                        <Button onPress={() => {}} icon={<Wallet />} text={'Recharge'} />
                    </View>
                    <View>
                        <View className="mb-[15]">
                            <Text className="text-black text-2xl font-semibold font-['Montserrat'] leading-7">
                                Missions
                            </Text>
                        </View>
                        {missions.map((mission, index) => (
                            <MissionComponent key={index} info={mission} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Challenge
