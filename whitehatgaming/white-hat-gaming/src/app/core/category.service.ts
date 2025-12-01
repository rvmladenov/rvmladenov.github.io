import { Injectable } from '@angular/core';
import { GamesModel } from '@app/shared/games.model';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor() { }

    // Can set a position of all the categories. Just set the name of the category as key and its position as value
    private readonly orderListPositions = {
        top: 0,
        new: 1
    };

    private sortCategories(categoriesList: Set<any>): string[] {
        let categoriesArr = Array.from(categoriesList) as string[];
        let result = [...categoriesArr];

        Object.keys(this.orderListPositions).forEach(orderKey => {
            const orderPositionFound = categoriesArr.indexOf(orderKey)
            if (orderPositionFound >= 0) {
                result.splice(orderPositionFound, 1);
                result.splice(this.orderListPositions[orderKey], 0, orderKey);
            }
        });

        return result;
    }

    getCategoryList(games: GamesModel[] = []): string[] {
        let categories = new Set();

        games.forEach(game => {
            if (game.categories) {
                game.categories.forEach(categoryName => {
                    categories.add(categoryName);
                })
            }
        })

        return this.sortCategories(categories);
    }

    getGroupedGamesBasedOnCategory(games: GamesModel[] = [], categories: string[] = []): { [categoryId: string]: GamesModel[] } {
        // const result: { [categoryId: string]: GamesModel[] }[] = [];

        // categories.forEach(catName => {
        //     let catGames = [];
        //     games.forEach(gameObj => {
        //         if (gameObj.categories.indexOf(catName) >= 0) {
        //             catGames.push(gameObj);
        //         }
        //     });
        //     const catGamesObj = {};
        //     catGamesObj[catName] = [...catGames];
        //     result.push( catGamesObj );
        // })



        let result: { [categoryId: string]: GamesModel[] } = {};

        categories.forEach(catName => {
            let catGames = {};
            games.forEach(gameObj => {
                if (gameObj.categories.indexOf(catName) >= 0) {
                    catGames[catName] = !catGames[catName] ? [] : catGames[catName];
                    catGames[catName].push(gameObj);
                }
            });
            result = {...result, ...catGames};
        })




        // TODO: Old Code
        // // Creates an object which groups all the games based on a category
        // games.forEach(game => {
        //     game.categories.forEach(category => {
        //         result[category] = result[category] || [];
        //         result[category].push(game);
        //     })
        // });

        return result;
    }
}
