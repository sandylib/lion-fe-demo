import React, {useEffect} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Card from '../components/Card/Card';
import { getCurrentUser, getAllItems, updateAllItems } from '../actions/userActions'
import {Loading} from '../components/Loading/Loading';

export default function Home() {
  const items = useSelector(state => state.items);
  const currentUser = useSelector(state => state.currentUser);
  const {totalQuantity} = currentUser;
 
  const onHandleAddToCart = (item) => dispatch(updateAllItems(item));
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(getCurrentUser({id: 'U10000'}))
    dispatch(getAllItems())
  }, [])

  return (<>
  {items.length === 0 && <Loading />}
  {items.length>0 && items.map((item, i)=> (<Card key={i} item={item} addToCart={onHandleAddToCart}/>))}
  </>)
}
