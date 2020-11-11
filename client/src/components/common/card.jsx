import React, { Component} from 'react';
import { Link } from "react-router-dom";
import image from "../../images/plant1.jpg";
import './css/card.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Card extends Component {

    render() {
        const {price,numberInStock,onDelete,item,onBuy,user}=this.props;
        // console.log(user);
        return (
            
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 wrapper">
                <div className="plants-box">
                    <figure><img src={image} alt="img"/></figure>
                    {user===2 && <h3> <Link className="title" to={`/items/${item._id}`}>{item.title}</Link></h3>}
                    {user!==2 && <h3>{item.title}</h3>}
                    <h3> {`Price: ₹${price}`} </h3>
                    <p>
                        Clothing for students of their respective domain.<br />
                        Size can be choosen on the cart.<br />
                        <b><u>Stock Left: {numberInStock}</u></b>
                    </p>
                    {user===2 && <button className="ml-5 mb-5 but" type="button" onClick={() => onBuy(item)} >Buy This</button>}
                    {user===2 && <button className="ml-4 mb-5 but" type="button" onClick={() => onDelete(item)} >Delete</button>}

                    {user===1 &&<button className="mb-5 but-1" type="button" onClick={() => onBuy(item)} >Buy This</button>}
                </div>
            </div>
        );
    }
}

export default Card;