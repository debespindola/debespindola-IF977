import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

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

function App() {
  const [
    showModal, showModalDispatch,
  ] = useReducer(modalReducer, modalInitialValue);
  const [pokemonData, setPokemonData] = useState([]);

  const getPokemons = async () => {
    // run server on port 3000 before running client
    const { data } = await axios.get("http://localhost:3000/pokemon");
    console.log(data);
    setPokemonData(data);
  }

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <div className="App">
      <ModalContext.Provider value={{ showModal, showModalDispatch }}>
        <div className="cardWrapper">
          {pokemonData.map((pokemon) => (
            <PokemonCard key={`pokemon-${pokemon.id}`} pokemon={pokemon}/>
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
