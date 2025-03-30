import React from "react";
import { View } from "react-native";
import { AirbnbRating } from "react-native-ratings";

const Rating = ({ isDisabled = false, defaultRating }) => {
    function ratingCompleted(rating) {
        console.log("Rating is: " + rating);
    }
    return (
        <View>
            <AirbnbRating
                starContainerStyle={{
                    alignSelf: "start",
                    backgroundColor: "transparent",
                }}
                size={16}
                isDisabled={isDisabled}
                showRating={false}
                defaultRating={defaultRating}
                unSelectedColor="#A3A3A3"
                selectedColor="#F5954B"
            />
        </View>
    );
};

export default Rating;
