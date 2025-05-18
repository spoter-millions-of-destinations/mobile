import { useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group'

export interface RadioOption {
    id: string
    label: string
    value: string
    borderSize: number
    size: number
    borderColor: string
}
export const ObjectItem: React.FC = () => {
    const radioSex: RadioOption[] = useMemo(
        () => [
            {
                id: '1',
                label: 'All',
                value: 'All',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
            {
                id: '2',
                label: 'Male',
                value: 'Male',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
            {
                id: '3',
                label: 'Female',
                value: 'Female',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
        ],
        [],
    )

    const radioLocation: RadioOption[] = useMemo(
        () => [
            {
                id: '1',
                label: 'Everyone',
                value: 'Everyone',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
            {
                id: '2',
                label: 'Domestic',
                value: 'Domestic',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
            {
                id: '3',
                label: 'International',
                value: 'International',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
        ],
        [],
    )

    const radioAge: RadioOption[] = useMemo(
        () => [
            {
                id: '1',
                label: '16-22',
                value: '16-22',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
            {
                id: '2',
                label: '23-30',
                value: '23-30',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
            {
                id: '3',
                label: '30-45',
                value: '30-45',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
            {
                id: '4',
                label: '45+',
                value: '45+',
                borderSize: 1,
                size: 16,
                borderColor: '#A3A3A3',
            },
        ],
        [],
    )

    const [selectedSexId, setSelectedSexId] = useState<string>('1')
    const [selectedAgeId, setSelectedAgeId] = useState<string>('1')
    const [selectedLocationId, setSelectedLocationId] = useState<string>('1')

    return (
        <View>
            <View>
                <Text>Sex</Text>
                <RadioGroup
                    containerStyle={{
                        flexDirection: 'row',
                        marginVertical: 12,
                    }}
                    radioButtons={radioSex}
                    onPress={setSelectedSexId}
                    selectedId={selectedSexId}
                />
            </View>
            <View>
                <Text>Age</Text>
                <View>
                    <RadioGroup
                        containerStyle={{
                            flexDirection: 'row',
                            marginVertical: 12,
                        }}
                        radioButtons={radioAge}
                        onPress={setSelectedAgeId}
                        selectedId={selectedAgeId}
                    />
                </View>
            </View>
            <View>
                <Text>Location</Text>
                <RadioGroup
                    containerStyle={{
                        flexDirection: 'row',
                        marginVertical: 12,
                    }}
                    radioButtons={radioLocation}
                    onPress={setSelectedLocationId}
                    selectedId={selectedLocationId}
                />
            </View>
        </View>
    )
}
