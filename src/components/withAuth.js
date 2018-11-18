import React, {Component} from 'react'
import AuthService from './AuthService'
import PropTypes from 'prop-types'

export default function withAuth(AuthComponent) {
    const Auth = new AuthService('http://localhost:8080');
    return class AuthWrapped extends Component {
        constructor(props) {
            super(props);
            this.state = {
                user: null
            }
        }

        static contextTypes = {
             router: PropTypes.object
           }


        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.context.router.history.push(`/`)
            }
            else {
                try {
                    const profile = Auth.getProfile()
                    this.setState({
                        user: profile
                    })
                }
                catch(err){
                    Auth.logout()
                    this.context.router.history.push(`/`)
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            }
            else {
                return null
            }
        }
    };
}
