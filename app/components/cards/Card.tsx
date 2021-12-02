import {StyleSheet, View} from "react-native";
import React from "react";
import {CardObjProps, CardDesignType} from "../../shared/interfaces/CardInf";
import TaskCard from "./TaskCard";
import NhieCard from "./NhieCard";

const Card = (item: CardObjProps) => {
    return (
        <View style={styles.card}>
            { item.card.designType === CardDesignType.TASK &&
                <TaskCard card={item.card}/>
            }
            { item.card.designType === CardDesignType.NHIE &&
                <NhieCard card={item.card}/>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        flex: 0.8,
        borderRadius: 8,
        shadowRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 0 },
        backgroundColor: "#fff",
        padding: 4,
    },
});

export default Card;
