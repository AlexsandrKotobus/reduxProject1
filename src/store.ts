import { configureStore } from '@reduxjs/toolkit'

type CounterState = {
    counter: number;
};
export type CounterId =  string;

// тип состояния
type State ={
    // для уменьшения ошибок в TS хорошо добавлять | undefined
    counters: Record <CounterId, CounterState | undefined >
}

// тип акшена
export type IncrementAction ={
    // поле type - тип экшена
    type: 'increment';
     // поле payload - полезная информ, тут - id
    payload: {
       counterId: CounterId;
    }
}
export type DecrementAction ={
    type: 'decrement';
    payload: {
        counterId: CounterId;
    }
} 
// юнит 2х типов
type Action = IncrementAction | DecrementAction;


const initialCounterState: CounterState = {counter: 0}
// начальное дефолтное состояние
const initialState: State ={
    counters: {},
}

// делаем редьюсер
// принимает начальное сотояние , экшен,
const  reducer = (state =initialState, action: Action): State => {
    //логика редьюсера
    switch (action.type){
        case 'increment':{
            const {counterId} = action.payload;
            // поле опциональное поэтому надо добавить 
            const currentCounter = state.counters[counterId] ?? initialCounterState;
            return {
                ...state,
                counters: {
                    ...state.counters,
                    [counterId]: {
                        ...currentCounter,
                        counter: currentCounter.counter +1
                    }
                }
            };
        }
        
        case 'decrement':{
            const {counterId} = action.payload;
            const currentCounter = state.counters[counterId] ?? initialCounterState;
            return {
                ...state,
                counters: {
                    ...state.counters,
                    [counterId]: {
                        ...currentCounter,
                        counter: currentCounter.counter -1
                    }
                }
            };
        }
        default:
            return state;
    }       
}

// создаем store
export const store = configureStore({
  reducer: reducer,
})

