import React from 'react';

class LogIn extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="logIn modal">
                {console.log('inside login component')}
                <form onSubmit={(event) => this.props.logIn(event)} className="form__auth layout__XYCenter">
                <div className="layout__opposite">
                    <div><h3 className="heading__form">Log In</h3></div>
                    <div><a href="#" onClick={this.props.closeModal}><i className="fas fa-times"></i></a></div>
                </div>

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
                        <i className="fab fa-google-plus-g graphics--form"></i>
                    </span>
                </fieldset>
                
                <button className="layout__XCenter btn__form btn">Login</button>
              </form>
            </div>
        )
    }
    
}

export default LogIn;