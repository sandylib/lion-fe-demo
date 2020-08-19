import * as CONSTANTS from '../constants/actionConstants'

const initialState = {
  id:'',
  name: '',
  country: '',
  address: '',
  phone: '',
  cart:[],
  totalQuantity: 0,
  inprogress: true
}

export const currentUser = (state = initialState, action)=> {
  switch (action.type) {

    case CONSTANTS.SET_CURRENT_USER:
      const {id, name, country, address, phone} = action.payload;
      return {
        ...state,
        id, 
        name, 
        country,
        address, 
        phone
      }
    case CONSTANTS.SET_CURRENT_USER_CART: {
      let totalQuantity = 0;
      if(action.payload.length){
        action.payload.forEach( item => totalQuantity += item.quantity)
      }

      return {
        ...state,
        cart: action.payload,
        totalQuantity:totalQuantity
      }
    }

    case CONSTANTS.UPDATE_ALL_ITEMS_DECREASE_QUANTITY: {
      return {
        ...state,
        totalQuantity: state.totalQuantity + 1
      }
    }

    case CONSTANTS.INPROGRESS: {
      return {
        ...state,
      inprogress: action.payload
      }
    }
    
    default:
      return state;

  }
}