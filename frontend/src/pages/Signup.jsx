import { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import { signup } from '../store/actions/userActions.js'


export class _Signup extends Component {
    state = {
        signupCred: {
            fullname: '',
            username: '',
            password: ''
        }
    }

    signupHandleChange = (ev) => {
        const { name, value } = ev.target
        this.setState(prevState => ({
            signupCred: {
                ...prevState.signupCred,
                [name]: value
            }
        }))
    }

    doSignup = async ev => {
        ev.preventDefault()
        const { username, password, fullname } = this.state.signupCred
        if (!username || !password || !fullname) {
            return this.setState({ msg: 'All inputs are required' })
        }

        this.props.signup({ username, password, fullname })
            .then(user => {
                this.setState(
                    {
                        signupCred: { username: '', password: '', fullname: '' },
                    })
                this.props.history.push('/')
            })

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
                        Sign up
                    </Typography>
                    <form onSubmit={this.doSignup} style={{ width: '100%', marginTop: '5px' }} noValidate>
                        <TextField variant="filled" margin="normal" value={this.state.signupCred.username} required
                            onChange={this.signupHandleChange} fullWidth label="username" name="username" autoFocus />
                        <TextField variant="filled" margin="normal" value={this.state.signupCred.fullname} required
                            onChange={this.signupHandleChange} fullWidth label="fullname" name="fullname" />

                        <TextField variant="outlined" margin="normal" required fullWidth
                            value={this.state.signupCred.password} onChange={this.signupHandleChange} name="password" label="Password" type="password" autoComplete="current-password" />
                        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            Sign In
                         </Button>
                    </form>
                </div>
            </Container >
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.userModule.users
    }
}

const mapDispatchToProps = {
    signup,
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup);