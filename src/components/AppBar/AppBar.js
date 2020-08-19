import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppTopBar() {
  const classes = useStyles();
  const history = useHistory();
  const {userId} = useParams();
  const [visible, setVisible] = useState(true);
  const currentUser = useSelector(state => state.currentUser);
  const {totalQuantity} = currentUser;
  const onClick = () => {
    
    history.push(`/cart/${currentUser.id}`);
    setVisible(false);
  }
  const goHome = () => {
    history.push('/');
    setVisible(true);
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={ goHome}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashbord
          </Typography>
          {visible && <IconButton aria-label="show notifications" color="inherit" onClick={onClick}>
              <Badge badgeContent={totalQuantity} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
