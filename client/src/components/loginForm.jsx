import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {Redirect} from 'react-router-dom';
import auth from '../services/authService';
import "./css/loginform.css";
import {toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try{
      const {data} = this.state;
      await auth.login(data.username,data.password);

     const {state} =  this.props.location

      toast.success('🎉 Login successful, Redirecting...', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
     setTimeout(() => {
      window.location=state ? state.from.pathname: '/';
    }, 2000);

    }
    catch(ex){
      if(ex.response && ex.response.status===400){
        // const errors={...this.state.errors};
        // errors.username=ex.response.data;
        // this.setState({errors});
        toast.error('🚫 Invalid Credentials...', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    }
    
  };

  render() {

    if(auth.getCurrentUser()) return <Redirect to='/'/>;

    return (
      <div className="pt-5 admin-login">
        <h1 className="text-center headi">Login</h1>
        <div className="container adm-form pt-4 pd-4">
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            <div className="submit-button">
              {this.renderButton("Login")}
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    );
  }
}

export default LoginForm;
