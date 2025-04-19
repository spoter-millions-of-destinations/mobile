import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view'
import UserCollections from './(tabs)/collections'
import UserImages from './(tabs)/images'
import UserPosts from './(tabs)/posts'
import UserProfile from './components/UserProfile'

import { useState } from 'react'
import { CustomTabItem } from './components'
import { ContainerComponent } from '@/components'
import { View } from 'react-native'
import { useHideBottonTab } from '@/hooks'

type Props = {
    userId: number
}

export default function ProfileScreen({ userId }: Props) {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <View className="flex-1 pb-[44]">
            <Tabs.Container
                renderHeader={() => <UserProfile userId={userId} />}
                headerContainerStyle={{ backgroundColor: '#FAFAFA' }}
                lazy
                containerStyle={{ backgroundColor: '#FAFAFA' }}
                onTabChange={({ index }) => setActiveTab(index)}
                renderTabBar={(props) => (
                    <MaterialTabBar
                        {...props}
                        scrollEnabled={false}
                        style={{
                            alignSelf: 'center', // Căn giữa thanh tab bar
                            backgroundColor: '#FAFAFA',
                        }}
                        tabStyle={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        indicatorStyle={{
                            backgroundColor: '#404040',
                            height: 3,
                            borderRadius: 2,
                        }}
                        TabItemComponent={(tabProps) => (
                            <CustomTabItem {...tabProps} tabIndex={tabProps.index as 0 | -1} activeTab={activeTab} />
                        )}
                    />
                )}
            >
                <Tabs.Tab name="Posts">
                    <ContainerComponent>
                        <UserPosts userId={userId} />
                    </ContainerComponent>
                </Tabs.Tab>
                <Tabs.Tab name="Images">
                    <ContainerComponent>
                        <UserImages userId={userId} />
                    </ContainerComponent>
                </Tabs.Tab>
                <Tabs.Tab name="Collections">
                    <ContainerComponent>
                        <UserCollections userId={userId} />
                    </ContainerComponent>
                </Tabs.Tab>
            </Tabs.Container>
        </View>
    )
}
