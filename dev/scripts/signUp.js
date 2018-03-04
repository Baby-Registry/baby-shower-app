import React from 'react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createEmail: '',
            createPassword: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.createUser = this.createUser.bind(this);

    }

    createUser(event) {
        event.preventDefault();
        const email = this.state.createEmail;
        const password = this.state.createPassword;
        console.log("creating user now")
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch((error) => console.log(error.code, error.message));
        this.setState({
            createEmail: '',
            createPassword: ''
        });
        this.props.closeModal();
    }

    handleChange(event, field) {
        const newState = Object.assign({}, this.state);
        newState[field] = event.target.value;
        this.setState(newState);
    }

    render() {
        return(
            <div className = "signUp modal">
                <form onSubmit={(event) => this.createUser(event)} className="form__auth layout__XYCenter">
                    <div className="layout__opposite">
                        <div><h3 className="heading__form">Sign Up</h3></div>
                        <div><a href="#" onClick={this.props.closeModal}><i className="fas fa-times"></i></a></div>
                    </div>

                    <fieldset>
                        <label htmlFor="email" className="label__form">Email:</label>
                        <input type="email" value={this.state.createEmail} placeholder="Email" onChange={(event) => this.handleChange(event, "createEmail")} name="email" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="password" className="label__form">Password:</label>
                        <input type="password" value={this.state.createPassword} placeholder="Password" onChange={(event) => this.handleChange(event, "createPassword")} name="password" />
                    </fieldset>

                    <fieldset>
                        <span>Create an account with: </span>
                        <span>
                            <a href="#" onClick={this.props.googleSignIn}><i className="fab fa-google-plus-g graphics--form"></i></a>
                        </span>
                    </fieldset>

                    <button className="layout__XCenter btn__form btn">Create An Account</button>
                </form>
            </div>
        )
    }
}

export default SignUp;