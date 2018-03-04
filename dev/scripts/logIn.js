import React from 'react';

class LogIn extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="logIn modal">
                <form onSubmit={(event) => this.props.logIn(event)} className="form__auth layout__XYCenter">
                <h3 className="header__form">Sign In</h3>

                <fieldset>
                    <label htmlFor="email" className="label__form">Email:</label>
                    <input type="email" placeholder="E-mail address" onChange={(event) => this.props.handleChange(event, "loginEmail")} name="email" />
                </fieldset>

                <fieldset>
                    <label htmlFor="password" className="label__form">Password:</label>
                    <input type="password" placeholder="Password" onChange={(event) => this.props.handleChange(event, "loginPassword")} />
                </fieldset>

                <fieldset>
                    <span>Sign in with: </span>
                    <span>
                        <i class="fab fa-google-plus-g graphics--form"></i>
                    </span>
                </fieldset>
                
                <button className="layout__XCenter btn__form btn">Login</button>
              </form>
            </div>
        )
    }
    
}

export default LogIn;