import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {CardObjProps} from "../../shared/interfaces/CardInf";
import {cardStyles} from "../../shared/styles/CardStyle";

const TaskCard = (item: CardObjProps) => {
    return (
        <View style={cardStyles.container}>
            <Text style={styles.cardTitle}>
                {item.card.name}
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
        fontSize: 40,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15
    },
    descriptionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardDescription: {
        color: '#FFF',
        fontSize: 20
    }
});

export default TaskCard;
