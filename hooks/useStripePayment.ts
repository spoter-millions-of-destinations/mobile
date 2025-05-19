import { useMutation } from '@tanstack/react-query'
import stripeService from '@/services/stripe.service'

export const useStripePayment = () => {
    return useMutation({
        mutationFn: (packageId: number) => stripeService.CheckoutSession(packageId),
        onSuccess: (data) => {
            console.log('Stripe checkout session created:', data)
            return data
        },
        onError: (error) => {
            console.error('Failed to create stripe checkout session:', error)
            throw error
        },
    })
}
