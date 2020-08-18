import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '../components/Input/Input';
import Typography from '@material-ui/core/Typography';
import {Loading} from '../components/Loading/Loading';
import { APP_ERROR_MESSAGE } from '../constants/applicationConstants';
import {inValid} from '../utils/help';
import { useStyles, MainWrapper, Row, Wrapper} from '../utils/multiHelp';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class LogIn extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired
  };

  state = {
    isLoggingIn: true,
    redirectToReferrer: false,
    hasAuthenticationFailed: false,
    inprogress: false,
    username: '',
    password: '',
    errors: {
      username: false,
      password: false
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      inprogress: true
    })
    this.props.authenticate(this.state.username, this.state.password)
      .then(() => {
        this.setState({ isLoggingIn: false, redirectToReferrer: true, inprogress: false });
       
      })
      .catch(err => {
        console.log("LoginView - failed authentication path: ", err);
        this.setState({ isLoggingIn: false, hasAuthenticationFailed: true, inprogress: false });
      });
  }

  onChange = (id, value) => {
    this.setState({
      [id]: value,
      error: {
        [id]: inValid(value)
      }
    })

  }

  render = () => {
    const {inprogress, errors, username, password} = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { classes } = this.props;
    if (this.state.redirectToReferrer) return <Redirect to={from} />;
    if (this.state.isLoggingIn) return <>
    <MainWrapper>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
         Login
        </Typography>
        <form className={classes.form} noValidate>
          <Wrapper>
            <Row>
              <Input 
                data-testid={`input-name`}
                disabled={inprogress}
                errorMessage={APP_ERROR_MESSAGE.USERNAME}
                error={errors.username}
                id={'username'}
                value={username}
                label={'Username'}
                placeholder='username'
                onChange={this.onChange}
                autoComplete="username"
                autoFocus
              />
            </Row>
            <Row>
              <Input 
                  data-testid={`input-password`}
                  disabled={inprogress}
                  errorMessage={APP_ERROR_MESSAGE.PASSWORD}
                  error={errors.password}
                  id={'password'}
                  label={'Password'}
                  value={password}
                  placeholder='Password'
                  onChange={this.onChange}
                  autoComplete="password"
                />
            </Row>
          </Wrapper>
          <Button
            type="submit"
            onClick={this.onSubmit}
            disabled={inprogress ||  inValid(this.state.username)  ||  inValid(this.state.password) }
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
        </form>
      </div>
      {inprogress && <Loading />}
    </MainWrapper>
    </>;
    if (this.state.hasAuthenticationFailed)
      return (<Redirect to={'/notfound'} />);
    return <div>Loading...</div>;
  };
}

export default withStyles(styles)(LogIn);