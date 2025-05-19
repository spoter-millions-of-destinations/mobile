// authService.js

import axiosClient from './axiosClient'

const stripeService = {
    CheckoutSession: async (
        id: number,
    ): Promise<{
        checkoutUrl: string
        successUrl: string
        cancelUrl: string
    }> =>
        axiosClient.post('/stripe/checkout-session', {
            successUrl: 'https://phuocnguyen2412.github.io/success-page/success',
            cancelUrl: 'https://phuocnguyen2412.github.io/success-page/error',
            advertisingPackageId: id,
        }),
}

export default stripeService
