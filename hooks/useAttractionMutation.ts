import { useMutation } from '@tanstack/react-query'
import attractionService, { AttractionInfo } from '@/services/attraction.service'
import mapService from '@/services/map.service'

export const useAttractionMutation = () => {
    return useMutation({
        mutationFn: async (data: AttractionInfo) => attractionService.addAttraction(data),
        onSuccess: (data) => {
            console.log('Attraction added successfully:', data)
        },
        onError: (error) => {
            console.error('Failed to add attraction:', error)
        },
    })
}
