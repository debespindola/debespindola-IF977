import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Button, Input, Modal } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css';
import { ToastContainer, toast } from 'react-toastify';

import { 
  ModalContext,
} from '../../helpers/handleModal';

function Form() {
  const { showModal, showModalDispatch } = useContext(ModalContext);

  const emptyState = [ 
    {
      name: 'name',
      value: '',
    },
    {
      name: 'type',
      value: '',
    },
    {
      name: 'hp',
      value: '',
    },
    {
      name: 'attack',
      value: ''
    },
    {
      name: 'cost',
      value: ''
    },
  ];
  const [fields, setFields] = useState(emptyState);
  const parseData = (fields) => {
    const values = fields.map(field => {
      const parsedData = {};

      parsedData[field.name] = field.value;
      return parsedData;
    });

    return values;
  }

  const createPokemon = async (fields) => {
    const [
      name, type, hp, attack, cost
    ] = parseData(fields);

    await axios.post("http://localhost:3000/pokemon", {
      name: name.name,
      type: type.type,
      hp: hp.hp,
      attack: attack.attack,
      cost: cost.cost,
    }).then((response) => {
      toast.success(`Pokemon created successfully! ✨`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    });
  };

  const editPokemon = async (pokemonId, fields) => {
    const [
      name, type, hp, attack, cost
    ] = parseData(fields);

    await axios.put(`http://localhost:3000/pokemon/${pokemonId}`, {
      name: name.name,
      type: type.type,
      hp: hp.hp,
      attack: attack.attack,
      cost: cost.cost,
    }).then((response) => {
      toast.success(`Pokemon edited successfully! ✍🏻`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    });
  };

  const deletePokemon = async (pokemonId) => {
    await axios.delete(`http://localhost:3000/pokemon/${pokemonId}`)
    .then((response) => {
      toast.success(`${response.data}`, {
        theme: 'colored',
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    });
  }

  useEffect(() => {
    showModal.pokemonSelected && setFields([
      {
        name: 'name',
        value: showModal.pokemonSelected?.name,
      },
      {
        name: 'type',
        value: showModal.pokemonSelected?.type,
      },
      {
        name: 'hp',
        value: showModal.pokemonSelected?.hp,
      },
      {
        name: 'attack',
        value: showModal.pokemonSelected?.attack,
      },
      {
        name: 'cost',
        value: showModal.pokemonSelected?.cost,
      },
    ])
  }, [showModal.pokemonSelected]);

  const handleOk = () => {
    showModalDispatch({ type: 'HIDE' });
    if (showModal.pokemonSelected) {
      editPokemon(showModal.pokemonSelected.id, fields);
      setFields(emptyState);
    } else {
      createPokemon(fields);
    }
  };

  const handleCancel = () => {
    showModalDispatch({ type: 'HIDE' });
    setFields(emptyState)
  };

  const handleDelete = () => {
    deletePokemon(showModal.pokemonSelected.id);
    showModalDispatch({ type: 'HIDE' });
    setFields(emptyState);
  }

  return ( 
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Modal 
        title={showModal.pokemonSelected?.name ?? 'New Pokemon'} 
        visible={showModal.active} 
        onCancel={handleCancel}
        onOk={handleOk}
        footer={[
          <Button danger onClick={handleDelete}>Delete</Button>,
          <Button type="primary" onClick={handleOk}>Enviar</Button>,
          <Button type="default" onClick={handleCancel}>Cancelar</Button>,
        ]}
      >
        {fields.map((field, index) => (
          <Input 
            key={`${field.name}-${field.value}`}
            addonBefore={field.name} 
            className='input' 
            defaultValue={field?.value}
            required
            onChange={({ target }) => {
              fields[index].value = target.value
            }}
          />
        ))}
      </Modal>
    </>
  )
}

export default Form;