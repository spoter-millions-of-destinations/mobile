import { Wallet2 } from '@/assets/images/Button'
import { useStripePayment } from '@/hooks/useStripePayment'
import { router, useNavigation } from 'expo-router'
import { TouchableOpacity, View, Text, Alert } from 'react-native'

interface PaymentItemProps {
    idPackage: number
    description: string
    address: string
    image: ImagePickerAsset | null
}
import { usePaymentStore } from '@/store/usePaymentStore'
import { ImagePickerAsset } from 'expo-image-picker'
export const PaymentItem: React.FC<PaymentItemProps> = ({ idPackage, description, address, image }) => {
    const { mutateAsync: createCheckoutSession, isPending } = useStripePayment()

    const { saveFormData, setPaymentStatus, isPaid } = usePaymentStore()
    const handlePayment = async () => {
        try {
            const res = await createCheckoutSession(idPackage)
            saveFormData({
                description,
                address,
                image,
                idPackage,
            })

            router.push({
                pathname: '/(share)/create_ads/stripe_payment',
                params: {
                    data: res.checkoutUrl,
                },
            })
        } catch (error) {
            console.log(error)
            Alert.alert('Payment Error', 'Failed to initialize payment process.')
        }
    }

    return (
        <TouchableOpacity onPress={handlePayment} className="ml-5" disabled={isPending}>
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-x-3">
                    <Wallet2 />
                    <View>
                        <Text className="text-neutral-600 text-sm font-semibold font-['Montserrat']">
                            Stripe {isPending ? '(Processing...)' : ''}
                        </Text>
                        <Text className="text-neutral-400 text-xs font-normal font-['Montserrat']">
                            {isPaid ? 'Paid ✅' : 'Infrastructure'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
