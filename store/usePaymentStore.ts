import { create } from 'zustand'

import { ImagePickerAsset } from 'expo-image-picker'

type PaymentState = {
    isPaid: boolean
    formData: {
        description: string
        address: string
        image: ImagePickerAsset | null
        imageUrl: string | null
        idPackage: number
    } | null
    setPaymentStatus: (paid: boolean) => void
    saveFormData: (data: Omit<PaymentState['formData'], 'imageUrl'>) => void
    updateImageUrl: (url: string) => void
    clear: () => void
}

export const usePaymentStore = create<PaymentState>((set) => ({
    isPaid: false,
    formData: null,
    setPaymentStatus: (paid) => set({ isPaid: paid }),
    saveFormData: (data) => set({ formData: { ...data, imageUrl: null } }),
    updateImageUrl: (url) => set((state) => ({ 
        formData: state.formData ? { ...state.formData, imageUrl: url } : null 
    })),
    clear: () => set({ isPaid: false, formData: null }),
}))