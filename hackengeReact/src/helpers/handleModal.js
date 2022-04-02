import { createContext } from 'react';

export const ModalContext = createContext(null);

export const modalReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        active: true,
        pokemonSelected: action.payload,
      };
    case 'HIDE':
      return {
        active: false,
      };
    default:
      return state;
  }
};

export const modalInitialValue = {
  active: false,
};
