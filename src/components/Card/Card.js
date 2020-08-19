import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import BookImg from '../../assets/books.jpeg';
import {Loading} from '../Loading/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '1.5rem'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));



const Card = ({item, addToCart}) => {
  const classes = useStyles();
  return (
   <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={BookImg} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {item.name} 
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {item.description} 
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Quantity: {item.quantityAvailable}
                </Typography>
              </Grid>
              <Grid item>
              <Button  variant="contained" color="primary" disabled={item.quantityAvailable === 0} onClick={()=> addToCart(item)}>
               { item.inprogress ? 'Waiting...' :'Add to cart' }
              </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography  variant="subtitle1">{ `$${item.usd}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}

export  default Card;
