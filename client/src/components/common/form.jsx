import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import './css/fom.css';
import {storage} from "../../services/firebase-config";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    image:null,
    progress:0,
    status:0
  };

  handleChangee = (e) =>{
    if(e.target.files[0]){

    const Extension = e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf('.') + 1).toLowerCase();

    if (Extension !== "gif" && Extension !== "png" && Extension !== "bmp"
    && Extension !== "jpeg" && Extension !== "jpg"){
      alert("Photo only allows file types of GIF, PNG, JPG, JPEG and BMP. ");
      return;
    }
      this.setState({status:1});
      this.setState({image:e.target.files[0]});
    }
    else{
      this.setState({status:0});
    }
  }

    handleUploade= () =>{
    const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({progress});
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.image.name)
          .getDownloadURL()
          .then(photo => {
            this.setState({ data: { ...this.state.data, photo:photo} });
          });
      }
    );    
    this.setState({status:2});
  }

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    // console.log(errors);
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    // console.log(error);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {

    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    // console.log(errors);
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      
      <button className="mb-5 buton"
        disabled={this.validate()}
        >
          {label}
      </button>

    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderFile(){
    return(
      <div className="filespace">
        <input type="file" className="fil" onChange={this.handleChangee} />
        {this.state.status===1 && <button onClick={this.handleUploade} className="up">Upload</button>}
        {this.state.status===2 && <div className="aft">File Added.</div>}
      </div>
    )
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        placeholder={`Enter the ${label}`}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
