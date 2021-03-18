import { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import { login } from '../store/actions/userActions.js'


export class _Login extends Component {

  state = {
    loggedinUser: '',
    msg: '',
    loginCred: { //for demo only
      username: 'gil',
      password: '111111'
    }
    // loginCred: {
    //   username: '',
    //   password: ''
    // }
  }

  loginHandleChange = (ev) => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username || !password ) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCred = { username, password }
    try {
      const user = await this.props.login(userCred)
      this.setState(
        {
          loginCred: { username: '', password: '' },
          loggedInUser: user
        })
      this.props.history.push('/')
    } catch (err) {
      console.log('ERR', err)
      this.setState({ msg: 'Login failed, try again' })
    }
  }

  render() {
    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Avatar style={{ margin: '10px', backgroundColor: 'blue', }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Log in
          </Typography>
          <form onSubmit={this.doLogin} style={{ width: '100%', marginTop: '5px' }} noValidate>
            <TextField variant="filled" margin="normal" value={this.state.loginCred.username} required
              onChange={this.loginHandleChange} fullWidth label="username" name="username" autoFocus />

            <TextField variant="outlined" margin="normal" required fullWidth
              value={this.state.loginCred.password} onChange={this.loginHandleChange} name="password" label="Password" type="password" autoComplete="current-password" />
            <Button onClick={this.doLogin}  type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Log In
            </Button>
            <p>{this.state.msg}</p>
            <Grid container>
              <Grid item>
                <Link to={'/signup'} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form> 
        </div>
      </Container >
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  login
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);