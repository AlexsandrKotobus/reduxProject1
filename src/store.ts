import { configureStore } from '@reduxjs/toolkit'
// тип состояния
type State ={
    counter: number;
}

// тип акшена
export type IncrementAction ={
    type: 'increment'
}
export type DecrementAction ={
    type: 'decrement'
} 
// юнит 2х типов
type Action = IncrementAction | DecrementAction;

// начальное дефолтное состояние
const initialState: State ={
    counter: 0,
}

// делаем редьюсер
// принимает начальное сотояние , экшен,
const  reducer = (state =initialState, action: Action): State => {
    //логика редьюсера
    switch (action.type){
        case 'increment':
            return {
                ...state,
                counter: state.counter + 1,
            };
        case 'decrement':
                return {
                    ...state,
                    counter: state.counter -1,
                };
        default: 
            return state;
            
     }
                
}

// создаем store
export const store = configureStore({
  reducer: reducer,
})

