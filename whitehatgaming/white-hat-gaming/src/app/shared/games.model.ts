export interface GamesModel {
    categories: string[],
    name: string,
    image: string, // The image url
    id: string,
    isTop?: boolean, // if ot category top
    isNew?: boolean, // if of category new 
    amount?: any // if jackpot - will have an amount value
}