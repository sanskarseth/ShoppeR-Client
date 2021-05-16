import React, { Component } from "react";
import { Link } from "react-router-dom";
import ItemsTable from "./itemsTable";
import Cat from "./cat";
import Pagination from "./common/pagination";
import { getItems, deleteItem } from "../services/itemService";
import { getCategories } from "../services/categoryService";
import { paginate } from "../utils/paginate";
import {toast,ToastContainer} from 'react-toastify';
import _ from "lodash";
import SearchBox from "./searchBox";
import { additem } from "../services/cartService";
import ReactLoading from 'react-loading';
import "./css/items.css";

class Items extends Component {

  state = {
    items: [],
    categories: [],
    currentPage: 1,
    pageSize: 9,
    searchQuery: "",
    selectedCategory: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const {data} = await getCategories(); 
    const categories = [{ _id: "", name: "All Categories" }, ...data];

    const {data:items} = await getItems();

    this.setState({ items: items, categories,selectedCategory:categories[0] });
  }

  handleDelete = async item => {

    const originalItems = this.state.items;

    const items = this.state.items.filter(m => m._id !== item._id);
    this.setState({ items });

    try{
      await deleteItem(item._id);
      this.props.updateBadgeCount(this.props.badgeCount -1);
    }
    catch(ex){
      if(ex.response && ex.response.status===404) 
        toast.warning('⚠️ Item is already deleted',{
          position: "bottom-left",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });

        this.setState({items:originalItems});
    }
  };

  handleBuy = async item => {
    try{
      // console.log(item);
      if(item.numberInStock===0) 
        return toast.info('😭 Item is Out of Stock...', {
        position: "bottom-left",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });

      await additem(item._id);

        toast.success('📦  Item added to cart...', {
        position: "bottom-left",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
      // window.location='/';
      this.props.updateBadgeCount(this.props.badgeCount +1);
    }
    catch(ex){
      if(ex.response && ex.response.status===400)
        toast.info('🛍️ Item already in cart!', {
          position: "bottom-left",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          });
          
    }
  }

  handleLike = item => {
    const items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...items[index] };
    items[index].liked = !items[index].liked;
    this.setState({ items });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleCategorySelect = category => {
    this.setState({ selectedCategory: category, searchQuery: "", currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedCategory: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedCategory,
      searchQuery,
      items: allItems
    } = this.state;

    let filtered = allItems;
    if (searchQuery)
      filtered = allItems.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCategory && selectedCategory._id)
      filtered = allItems.filter(m => m.category._id === selectedCategory._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const items = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: items };
  };

  render() {
    const { length: count } = this.state.items;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const {user} = this.props;

    if (count === 0) 
      return (
        <div className="noitems">
          {/* <p>There are no items in the database.</p> */}
          <ReactLoading type={"spinningBubbles"} color={"orange"} />
        </div>
      
    );

    const { totalCount, data: items } = this.getPagedData();


    return (
      <div>
        <Cat
            items={this.state.categories}
            selectedItem={this.state.selectedCategory}
            onItemSelect={this.handleCategorySelect}
        />
        <div className="container">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

              {user && user.isAdmin && <Link
                to="/items/new"
                className="btn btn-success"
                style={{ marginBottom: 20 }}
              >
                Add Item
              </Link>}

              {/* <p className="item-count">Showing {totalCount} items in the database.</p> */}
              <ItemsTable
                items={items}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
                onBuy={this.handleBuy}
              />
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
          </div>
          <ToastContainer />
      </div>
 
    );
  }
}

export default Items;

