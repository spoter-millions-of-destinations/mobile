import { AccordionItem } from '@/components/AccordionItem'
import { useAttractionMutation } from '@/hooks/useAttractionMutation'
import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
import { ObjectItem } from './_components/ObjectItem'
import { PackageForm } from './_components/PackageForm'
import { PaymentItem } from './_components/PaymentItem'
import { PostItem } from './_components/PostItem'
import { AttractionInfo } from '@/services/attraction.service'
import * as ImagePicker from 'expo-image-picker'
import fileService from '@/services/file.service'
import { Add2 } from '@/assets/images/Button'
import mapService from '@/services/map.service'
import { usePaymentStore } from '@/store/usePaymentStore'

const CreateAds: React.FC = () => {
    const { isPaid, formData, clear, updateImageUrl } = usePaymentStore()
    const [idPackage, setIdPackage] = useState<number>(3)
    const [info, setInfo] = useState<Partial<AttractionInfo>>({
        description: '',
        address: '',
    })
    const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null)
    const [uploading, setUploading] = useState(false)
    const { mutate: createAttraction, isPending } = useAttractionMutation()

    const handleSelectPackage = (id: number) => {
        setIdPackage(id)
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            quality: 0.7,
        })

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0])
        }
    }

    const handleChangeInfo = (name: string, value: string) => {
        setInfo({ ...info, [name]: value })
    }

    const handleCreateAttraction = async () => {
        if (!info.description || !info.address) {
            Alert.alert('Missing Information', 'Please fill in all required fields')
            return
        }

        if (!image) {
            Alert.alert('Missing Image', 'Please select an image')
            return
        }
        if (!isPaid) {
            Alert.alert('Payment Required', 'Please complete the payment process')
            return
        }

        setUploading(true)
        let imageUrl = ''
        try {
            const imageToUpload = {
                ...image,
                base64: image.base64 === null ? undefined : image.base64,
            }
            imageUrl = await fileService.uploadFile(imageToUpload)
            updateImageUrl(imageUrl)
        } catch (error) {
            setUploading(false)
            Alert.alert('Error', 'Failed to upload image')
            return
        }
        const { lat, lng } = await mapService.getLocationByAddress(info.address)

        const data: AttractionInfo = {
            description: info.description || '',
            address: info.address || '',
            advertisingPackageId: idPackage,
            images: [imageUrl],
            rate: 5,
            longitude: lng,
            latitude: lat,
        }

        createAttraction(data, {
            onSuccess: () => {
                Alert.alert('Success', 'Advertisement created successfully!')
                setInfo({ description: '', address: '' })
                setImage(null)
                clear()
            },
            onError: (error) => {
                Alert.alert('Error', 'Failed to create advertisement')
                console.error(error)
            },
            onSettled: () => {
                setUploading(false)
            },
        })
    }
    useEffect(() => {
        if (isPaid && formData) {
            setInfo({
                description: formData.description,
                address: formData.address,
            })
            if (formData.image) {
                setImage(formData.image)
            }
            setIdPackage(formData.idPackage)
        }
    }, [isPaid, formData])

    return (
        <SafeAreaView className="flex-1 bg-neutral-50">
            <ScrollView className="px-6 ">
                <Text className="text-neutral-800 text-2xl font-semibold font-['Montserrat'] mt-4 mb-2">
                    Advertise articles
                </Text>
                <AccordionItem
                    border={true}
                    title={'1. Object'}
                    description="Who will see your advertisement"
                    content={<ObjectItem />}
                />
                <AccordionItem
                    border={true}
                    title={'2. Posts'}
                    description={'Describe your advertisement'}
                    content={
                        <View>
                            <PostItem info={info} handleChangeInfo={handleChangeInfo} />
                            {!image && (
                                <View className="items-center justify-center">
                                    <TouchableOpacity
                                        onPress={pickImage}
                                        className="w-[305px] h-[239px] px-[102px] py-[92px] bg-neutral-200 rounded-[20px] flex-col justify-center items-center"
                                    >
                                        <View className="items-center justify-center">
                                            <Add2 />
                                            <Text className="w-full">Add pictures/video</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {image && (
                                <>
                                    <TouchableOpacity className="px-4 py-2 bg-blue-500 rounded" onPress={pickImage}>
                                        <Text className="text-center text-white">Select Image</Text>
                                    </TouchableOpacity>
                                    <View className="items-center mt-2">
                                        <Image
                                            source={{ uri: image.uri }}
                                            style={{ width: 200, height: 200, borderRadius: 10 }}
                                        />
                                    </View>
                                </>
                            )}
                        </View>
                    }
                />
                <AccordionItem
                    border={true}
                    title={'3. Advertising package'}
                    description={'Choose the appropriate advertising package'}
                    content={<PackageForm idPackage={idPackage} handleSelectPackage={handleSelectPackage} />}
                />
                <AccordionItem
                    border={true}
                    title={'4. Payment'}
                    description={'Select a payment method'}
                    content={
                        <PaymentItem
                            idPackage={idPackage}
                            description={info.description || ''}
                            address={info.address || ''}
                            image={image}
                        />
                    }
                />
                <View className="flex-row items-center justify-between mt-4 mb-8">
                    <Text className="text-neutral-500 text-xs font-medium font-['Montserrat'] ">Final step</Text>
                    <TouchableOpacity
                        className="px-[15px] py-[5px] bg-neutral-800 rounded-[10px] justify-between items-center"
                        onPress={handleCreateAttraction}
                        disabled={isPending}
                    >
                        <Text className="text-white text-xs font-normal font-['Montserrat']">
                            {isPending ? 'Creating...' : 'Create Advertisement'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateAds
