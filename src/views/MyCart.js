import React, {useEffect,} from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Minimize from '@material-ui/icons/Remove';
import { updateAllItemsRemove, updateAllItems } from '../actions/userActions';
import {  MainWrapper } from '../utils/multiHelp';
import { getCurrentUser, getAllItems } from '../actions/userActions'
import {Loading} from '../components/Loading/Loading';

const TAX_RATE = 0.10;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function subtotal(items) {
  return items.map(({ usd, quantity }) => usd * quantity).reduce((sum, i) => sum + i, 0);
}


export default function MyCart() {
  const classes = useStyles();
  
  const items = useSelector(state => state.items);
  const getPriceById = (id) => {
    const item = items.find(item => item.id === id)
    return item.usd;
  }
  const currentUser = useSelector(state => state.currentUser);
  const {cart} = currentUser;
  const {totalQuantity} = currentUser;
  const removeItem = (id) => {
    dispatch(updateAllItemsRemove(id))
  }
  const addItem = (id) => {
    dispatch(updateAllItems({id}))
  }

  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getCurrentUser({id: 'U10000'}))
    dispatch(getAllItems());
  }, [totalQuantity])

  if(cart.length === 0 || currentUser.inprogress) {
    return <Loading />;
  } 

  return (
    <MainWrapper size="lg">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Qty.</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart && cart.length > 0 && cart.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">
              <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => addItem(row.id)}>
                <Add />
              </IconButton>
                {row.quantity}
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => removeItem(row.id)}>
                <Minimize />
              </IconButton>
                </TableCell>
              <TableCell align="right">{ccyFormat(row.usd)}</TableCell>
              <TableCell align="right">{ccyFormat( row.usd * row.quantity)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(subtotal(cart))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(TAX_RATE * subtotal(cart))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(TAX_RATE * subtotal(cart) + subtotal(cart))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    
    </MainWrapper>
  );
}