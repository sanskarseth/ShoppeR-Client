import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/itemsTable.css";
import Like from "./common/like";
import auth from '../services/authService';
import Card from "../components/common/card";

class ItemsTable extends Component {

  state={
    userr:0,
  }

  columns = [
  {
    path: "title",
    label: "Title",
    content: item => <Link to={`/items/${item._id}`}>{item.title}</Link>
  },
  // { path: "category.name", label: "Category" },
  { path: "numberInStock", label: "Stock" },
  { path: "price", label: "Price" },
  {
    key: "like",
    content: item => (
      <Like liked={item.liked} onClick={() => this.props.onLike(item)} />
    )
  }
];

deleteColumn = {
    key: "delete",
    content: item => (
      <button
        onClick={() => this.props.onDelete(item)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
}

buyColumn = {
  key: "buy",
  content: item => (
    <button
      onClick={() => this.props.onBuy(item)}
      className="btn btn-success btn-sm"
    >
      Buy
    </button>
  )
}

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
    
  constructor() {
    super();
    const user = auth.getCurrentUser();
    // console.log(user);
    if(user && user.isAdmin) this.columns.push(this.deleteColumn); 
    if(user) this.columns.push(this.buyColumn);

    // console.log(user);
    if(user) this.state.userr=1;
    if(user && user.isAdmin) this.state.userr=2;
  }

  render() {
    const { items,onDelete,onBuy} = this.props;

    return (
      <div>

      <div className="bar">
        <div className="sections3">
          Sort By:
          {this.columns.map(column => (
          <div
            className="clickable section3"
            key={column.path || column.key}
            onClick={() => this.raiseSort(column.path)}
          >
            {column.label} {this.renderSortIcon(column)}
          </div>
          ))}

        </div>
      </div>
      


        <div className="container">
          <div className="row">
            {items.map(item=>
                <div key={item._id}>
                    <Card price={item.price} title={item.title} numberInStock={item.numberInStock} item={item} onDelete={onDelete} onBuy={onBuy} user={this.state.userr}/>
                </div>  
              )} 
          </div>
        </div>

      </div>
    );
  }
}

export default ItemsTable;
