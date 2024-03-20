import { StyleSheet, View, Text } from "react-native";
import React from "react";
const TempAvatar = ({ data, style, fontSize }) => {
    const stringToColor = (string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = "#";

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    };

    const color = data ? stringToColor(data) : '#FFFFFF';

    return (
        <View style={[styles.item, { backgroundColor: color }, style]}>
            <Text style={[styles.text, fontSize]}>
                {data ? data.trim().charAt(0).toUpperCase() : ""}
            </Text>
        </View>
    );
};

export default TempAvatar;

const styles = StyleSheet.create({
    item: {
        height: 40,
        width: 40,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: "600",
        alignSelf: "center",
    },
});
