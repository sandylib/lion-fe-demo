import * as CONSTANTS from '../constants/actionConstants'

export const items = (state = [], action)=> {
  switch (action.type) {

    case CONSTANTS.SET_ALL_ITEMS:{
       return [
         ...state,
         ...action.payload
       ]
    }
      
    case CONSTANTS.UPDATE_ALL_ITEMS_DECREASE_QUANTITY: {
       const  item = state.find(e => e.id === action.payload);
       const idx = state.findIndex( (e) => e.id === action.payload);
       if(item){
         const updateItem = {
           ...item,
           quantityAvailable : item.quantityAvailable - 1
         }
        
         let updateState = [...state];
         updateState[idx] = updateItem;
        
         return updateState
       }

       return state;
    }
    case CONSTANTS.INPROGRESS_ADD_ITEM: {
      const {id, inprogress} = action.payload;
      const  item = state.find(e => e.id === id);
      const idx = state.findIndex( (e) => e.id === id);
      if(item){
        const updateItem = {
          ...item,
          inprogress
        }
       
        let updateState = [...state];
        updateState[idx] = updateItem;
       
        return updateState
      }

      return state;
    }
    default:
      return state;

  }
}