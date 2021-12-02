import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {CardObjProps} from "../../shared/interfaces/CardInf";
import {cardStyles} from "../../shared/styles/CardStyle";

const NhieCard = (item: CardObjProps) => {
    return (
        <View style={cardStyles.container}>
            <Text style={styles.cardTitle}>
                {"NIKDY JSEM"}
            </Text>
            <View style={styles.descriptionContainer}>
                <Text style={styles.cardDescription}>
                    {item.card.description}
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 60,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },
    descriptionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        backgroundColor: "#FFF",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    cardDescription: {
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default NhieCard;
