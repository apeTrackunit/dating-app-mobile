import React from 'react';
import { StyleSheet, View } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { CardDesignType } from "../shared/interfaces/CardInf";
import Card from "../components/cards/Card";

const GameRoom = () => {
    const [index, setIndex] = React.useState<number>(0);
    const data = [
        {
            id: 0,
            name: "Kocovina",
            description: "Kdokoliv v dalších 2 kolech řekne slovo “piješ” se musí vždy napít",
            designType: CardDesignType.TASK
        },
        {
            id: 1,
            name: null,
            description: "Se nelíbal s člověkem stejného pohlaví",
            designType: CardDesignType.NHIE
        },
        {
            id: 2,
            name: "Tetování",
            description: "Lidé s tetováním pijí",
            designType: CardDesignType.TASK
        },
        {
            id: 3,
            name: null,
            description: "Se nelíbal s člověkem stejného pohlaví",
            designType: CardDesignType.NHIE
        },
        {
            id: 4,
            name: "Fuck Marry Kill",
            description: "Hráči ti vyberou jakékoliv tři osoby",
            designType: CardDesignType.TASK
        },
        {
            id: 5,
            name: "Móda?",
            description: "Lidé co v tuto chvíli mají různé ponožky pijí",
            designType: CardDesignType.TASK
        },

    ];

    const onSwiped = React.useCallback(() => {
        setIndex(index + 1);
    }, [index]);

    return (
        <View style={styles.container}>
            <Swiper cards={data}
                    cardIndex={index}
                    renderCard={card => <Card card={card}/>}
                    onSwiped={onSwiped}
                    animateCardOpacity
                    stackSize={3}
                    stackScale={8}
                    stackSeparation={25}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        background: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default GameRoom;
