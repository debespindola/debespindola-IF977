import { useReducer } from 'react';
import { 
  ModalContext,
  modalInitialValue,
  modalReducer,
} from './helpers/handleModal';

import './App.css';
import PokemonCard from './components/card';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Form from './components/form';

const pokemonData = [
  {
    id: Math.random(),
    name: 'pikachu',
    type: 'eletrico',
    hp: 10,
    attack:  'raios e raios',
    cost: 25,
  },
]

function App() {
  const [
    showModal, showModalDispatch,
  ] = useReducer(modalReducer, modalInitialValue);

  return (
    <div className="App">
      <ModalContext.Provider value={{ showModal, showModalDispatch }}>
        <div className="cardWrapper">
          {pokemonData.map((pokemon) => (
            <PokemonCard pokemon={pokemon}/>
          ))}

          <Button 
            type="dashed" 
            style={{height: "100%"}}
            onClick={() => {
              showModalDispatch({ type: 'SHOW' });
            }}
          >
            <PlusOutlined />
          </Button>

          <Form />
        </div>
      </ModalContext.Provider>
    </div>
  );
}

export default App;
