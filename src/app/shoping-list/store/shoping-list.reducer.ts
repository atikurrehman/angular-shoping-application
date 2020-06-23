import { Ingredient } from '../../share/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShopingListIngredient from './shoping-list.action';
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}
export interface AppState {
    shopingList: State;
}
const initialState: State = {
    ingredients: [
        new Ingredient('Apple', 5),
        new Ingredient('tomatoes', 15)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};
export function ShopingListReducer(state: State = initialState, action: ShopingListIngredient.ShopingListActions) {
    switch (action.type) {
        case ShopingListIngredient.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShopingListIngredient.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShopingListIngredient.UPDATE_INGREDIENT:
            const ingrident = state.ingredients[action.payload.index];
            const updatedIngredient = { ...ingrident, ...action.payload.ingredient };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedIngredients
            };
        case ShopingListIngredient.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ing, index) => {
                    return index !== action.payload;
                })
            };
        case ShopingListIngredient.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state[action.payload] }
            }

        case ShopingListIngredient.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }

        default:
            return state;
    }
}