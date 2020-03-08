import { Injectable } from '@angular/core';
import { GamesModel } from '@app/shared/games.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
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
}
