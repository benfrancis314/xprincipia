import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
// or
// import { GoogleLogin } from 'react-google-login';
 

 
export default class GoogleLoginButton extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            redirect: false
        }
        this.signup = this.signup.bind(this )
    }

    signup(res, type) {
        console.log('signup function')
        console.log(res.w3.U3)


        // Put these in the fields, then trigger login function
        // Do separately in Join/Register Unit
            // Set username to 'ofa'+'.'+'wea' (set all to lower case)
            // Full name is ig
            // Email is 

        // What about password?
    }

    render() {
        const responseGoogle = (response) => {
            console.log(response);
            this.signup(response, 'google')
            if(response.error == "popup_closed_by_user") {
                // alert('1')
            } 
          }
       return (
       <div>
            <GoogleLogin
                clientId="789713593890-c0hcn4j0nma3pubtcq01h7obm7afuneg.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
       </div>
       );
    }
 }