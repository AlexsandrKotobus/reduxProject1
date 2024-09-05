import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DecrementAction, IncrementAction, store } from './store'
import { useEffect, useReducer } from 'react';

function App() {

  // метод subscribe
  // редьюсер увеличивающий значение на +1
  const [, forseUpdate] = useReducer((x) => x + 1, 0);
  // useEffect нужен для интеграции состояния реакта со внешними стейт-менеджерами,
  // redux - тоже стейт-менеджер
  useEffect(()=> {
    //в метод subscribe мы передаем функцию, ктоторая будет вызываться  каждый раз 
    // когда у нас приходит экшен в стор
    // изменился стор - мы forseUpdate перерисовываем компонент App 
    const unsubscribe = store.subscribe(() =>{
      forseUpdate()
    })
    return unsubscribe
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/*  */}
        counter {store.getState().counter}
        {/* satisfies - клячевое слово, приравнивающее тип 'increment' к IncrementAction */}
        <button onClick={() => store.dispatch({ type: 'increment'} satisfies IncrementAction)}>
          increment
        </button>
        <button onClick={() => store.dispatch({type: 'decrement'} satisfies DecrementAction)}>
          decrement
        </button>


        {/*  */}
        
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
