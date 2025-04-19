import { Checked, Unchecked } from '@/assets/images/Button'
import { useToggle } from '@/hooks'
import { Text, TouchableOpacity, View } from 'react-native'
type FormProps = {
    title: string
    description: string
    checked?: boolean
    icon?: JSX.Element
}
const Form = ({ title, description, checked, icon }: FormProps) => {
    const [isChecked, setIsChecked] = useToggle(false, true)
    return (
        <View className=" rounded-tr-[15px] mb-3 px-[38] ">
            <View className="w-full h-[0px] border border-neutral-200 mb-[10]"></View>
            <View className="flex-row items-center justify-between ">
                <View>
                    <Text className="text-black text-sm font-medium font-['Montserrat'] leading-none">{title}</Text>
                    <Text className="text-black text-[10px] font-normal font-['Montserrat'] leading-[14px]">
                        {description}
                    </Text>
                </View>
                {checked && (
                    <TouchableOpacity onPress={() => setIsChecked()}>
                        {isChecked ? <Checked /> : <Unchecked />}
                    </TouchableOpacity>
                )}
                {icon}
            </View>
        </View>
    )
}
export default Form
