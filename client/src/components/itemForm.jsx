import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import "./css/itemForm.css";
import { getItem, saveItem } from "../services/itemService";
import { getCategories } from "../services/categoryService";

class ItemForm extends Form {
  state = {
    data: {
      title: "",
      categoryId: "",
      numberInStock: "",
      price: ""
    },
    categories: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .min(5)
      .label("Title"),
    categoryId: Joi.string()
      .required()
      .label("Category"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    price: Joi.number()
      .required()
      .min(0)
      .max(10000)
      .label("Price")
  };

 async populateCategories() {
    const {data:categories} =await getCategories();
    this.setState({ categories });
 };

 async populateItem(){
  try{

    const itemId = this.props.match.params.id;
    if (itemId === "new") return;

    const {data:item} = await getItem(itemId);
    this.setState({ data: this.mapToViewModel(item) });
  }
  catch(ex){
    if(ex.response && ex.response.status===404)
    this.props.history.replace("/not-found");
  }
 };

  async componentDidMount() {
   await this.populateCategories();
   await this.populateItem(); 
  }

  mapToViewModel(item) {
    return {
      _id: item._id,
      title: item.title,
      categoryId: item.category._id,
      numberInStock: item.numberInStock,
      price: item.price
    };
  }

  doSubmit = async () => {
    await saveItem(this.state.data);

    this.props.history.push("/items");
  };

  render() {
    return (

      <div className="pt-5 item-get">
          <h1 className="text-center">Item Form</h1>
          <div className="container item-form pt-4 pd-4">
            <form onSubmit={this.handleSubmit}>
              <div className="inpspace">
                {this.renderInput("title", "Title")}
              </div>
              <div className="inpspace">
                {this.renderSelect("categoryId", "Category", this.state.categories)}
              </div>
              <div className="inpspace">
                {this.renderInput("numberInStock", "Number in Stock", "number")}
              </div>
              <div className="inpspace">
                {this.renderInput("price", "Price")}
              </div>
              <div className="save-button">
                {this.renderButton("Save")}
              </div>
            </form>
          </div>
        </div>
    );
  }
}

export default ItemForm;
