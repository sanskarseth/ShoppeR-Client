import React from "react";
import Joi  from "joi-browser";
import Form from "./common/form";
import * as userService from '../services/userService';
import auth from '../services/authService';
import "./css/registerForm.css";
import {toast,ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "",phone: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .min(5)
      .required()
      .label("Name"),
    phone:Joi.string()
    .min(10)
    .required()
    .label("Phone No.")
  };

  doSubmit = async () => {
    try{
     const response =  await userService.register(this.state.data);
     auth.loginWithJwt(response.headers['x-auth-token']);

     toast.success('🎉 Registration successful, Redirecting...', {
      position: "top-center",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
     setTimeout(() => {
      window.location='/';
    }, 2000);


    }
    catch(ex){
      if(ex.response && ex.response.status===400)
      {
        // const errors={...this.state.errors};
        // errors.username=ex.response.data;
        // this.setState({errors});

        toast.dark('⚠️ User Already Registered !', {
          position: "top-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setTimeout(() => {
            window.location='/login';
          }, 2000);
      }

    }
    
  };

  render() {
    return (

        <div className="pt-5 register-form">
          <h1 className="text-center headi">Register</h1>
          <div className="container reg-form pt-4 pd-4">
            <form onSubmit={this.handleSubmit}>
              <div className="inspace">
                {this.renderInput("username", "Username")}
              </div>
              <div className="inspace">
                {this.renderInput("password", "Password", "password")}
              </div>
              <div className="inspace">
                {this.renderInput("name", "Name")}
              </div>
              <div className="inspace">
                {this.renderInput("phone", "Phone No.")}
              </div>
              <div className="register-button">
                {this.renderButton("Register")}
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
    );
  }
}

export default RegisterForm;
