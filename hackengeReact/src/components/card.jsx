import { useContext } from 'react';
import { Card, List, Badge, Tag } from 'antd';
import { 
  ModalContext,
} from '../helpers/handleModal';

function PokemonCard({ pokemon }) {
  const { showModalDispatch } = useContext(ModalContext);

  return (
    <Card 
      id={pokemon.id} 
      title={pokemon.name} 
      size="medium"
      onClick={() => showModalDispatch({ 
        type: 'SHOW', payload: pokemon 
      })}
    >
      <List.Item><Tag color="#bd93f9">Tipo: </Tag> {pokemon.type}</List.Item>
      <List.Item><Tag color="#ff79c6">HP: </Tag> {pokemon.hp}</List.Item>
      
      {pokemon.attacks.map((attack) => (
        <Badge.Ribbon text={`dano: ${attack.cost}`} color="#6272a4">
          <List.Item><Tag color="#ff5555">Ataque: </Tag> {attack.name}</List.Item>
        </Badge.Ribbon>
      ))}
    </Card>
  )
}

export default PokemonCard;