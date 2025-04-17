import React, { useEffect, useState } from "react";
import collectionService, { Collection } from "@/services/collection.service";
import { View } from "react-native";
import Loading from "@/components/Loading";

import { useNavigation } from "@react-navigation/native";
import { Collection as CollectionComponent } from "@/components/Collection";

const UserCollections = () => {
    const [collections, setCollections] = useState<Collection[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const navigation = useNavigation()
    useEffect(() => {
        ;(async () => {
            try {
                setIsLoading(true)
                const data = await collectionService.getCollectionsOfUser('0', '10', '0')
                setCollections(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    return (
        <View className="flex-1 pt-[25]  bg-neutral-50">
            {isLoading ? (
                <Loading />
            ) : (
                collections.map((collection, index) => (
                    <CollectionComponent
                        key={index}
                        data={collection}
                        onPress={() =>
                            navigation.navigate('detail-collection', {
                                collectionId: collection.id,
                                collectionName: collection.name,
                            })
                        }
                    />
                ))
            )}
        </View>
    )
}


export default UserCollections