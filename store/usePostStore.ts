// src/store/usePostStore.ts
import { CameraCapturedPicture } from 'expo-camera'
import { create } from 'zustand'

type PostState = {
    image: CameraCapturedPicture | undefined
    setImage: (image: CameraCapturedPicture | undefined) => void
    clear: () => void
}

export const usePostStore = create<PostState>((set) => ({
    image: undefined,
    setImage: (image: CameraCapturedPicture | undefined) => set({ image }),
    clear: () => set({ image: undefined }),
}))
