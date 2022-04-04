import { useContext, useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import './styles.css';

import { 
  ModalContext,
} from '../../helpers/handleModal';

function Form() {
  const { showModal, showModalDispatch } = useContext(ModalContext);
  const emptyState = [ 
    {
      name: 'Nome',
      value: '',
    },
    {
      name: 'Tipo',
      value: '',
    },
    {
      name: 'HP',
      value: '',
    },
    {
      name: 'Ataque',
      value: ''
    },
    {
      name: 'Custo',
      value: ''
    },
  ]

  const [fields, setFields] = useState(emptyState);

  useEffect(() => {
    showModal.pokemonSelected && setFields([
      {
        name: 'Nome',
        value: showModal.pokemonSelected?.name,
      },
      {
        name: 'Tipo',
        value: showModal.pokemonSelected?.type,
      },
      {
        name: 'HP',
        value: showModal.pokemonSelected?.hp,
      },
      {
        name: 'Ataque',
        value: showModal.pokemonSelected?.attack,
      },
      {
        name: 'Dano',
        value: showModal.pokemonSelected?.cost,
      },
    ])
  }, [showModal.pokemonSelected]);


  return (
    <Modal 
      title={showModal.pokemonSelected?.name ?? 'New Pokemon'} 
      visible={showModal.active} 
      onCancel={() => {
        showModalDispatch({ type: 'HIDE' });
        setFields(emptyState)
      }}
      onOk={() => {
        showModalDispatch({ type: 'HIDE' });
        setFields(emptyState);
      }}
    >
      {fields?.map((field) => (
        <Input 
          addonBefore={field.name} 
          className='input' 
          defaultValue={field?.value}
          required
        />
      ))}
    </Modal>
  )
}

export default Form;