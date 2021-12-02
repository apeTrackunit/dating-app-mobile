export interface CardProps {
    id: number;
    name: string | null;
    description: string;
    designType: CardDesignType;
}

export enum CardDesignType {
    NHIE,
    TASK,
    VOTING
}

export interface CardObjProps{
    card: CardProps;
}
