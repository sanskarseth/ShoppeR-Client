import React, { Component} from 'react';
import { Link } from "react-router-dom";
import './css/card.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import image1 from "../../images/Tshirts/2.jpg";
// import image2 from "../../images/Tshirts/2.jpg";
// import image3 from "../../images/Tshirts/3.jpg";
// import image4 from "../../images/Tshirts/4.jpg";
// import image5 from "../../images/Tshirts/5.jpg";
// import image6 from "../../images/Tshirts/6.jpg";
// import image7 from "../../images/Tshirts/7.jpg";
// import image8 from "../../images/Tshirts/8.jpg";
// import image9 from "../../images/Tshirts/9.jpg";
// import image10 from "../../images/Tshirts/10.jpg";
// import image11 from "../../images/Tshirts/11.jpg";
// import image12 from "../../images/Tshirts/12.jpg";
// import image13 from "../../images/Tshirts/13.jpg";
// import image14 from "../../images/Tshirts/14.jpg";
// import image15 from "../../images/Tshirts/15.jpg";
// import image16 from "../../images/Tshirts/16.jpg";
// import image17 from "../../images/Tshirts/17.jpg";
// import image18 from "../../images/Tshirts/18.jpg";
// import image19 from "../../images/Tshirts/19.jpg";
// import image20 from "../../images/Tshirts/20.jpg";


class Card extends Component {

    // state={
    //     ct:[]
    // }

    // tshirt = () => {
    //     this.state.ct.push(image1)
    // }


    render() {
        const {price,numberInStock,onDelete,item,onBuy,user}=this.props;
        // console.log(user);

      

        return (
            
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 wrapper">
                {this.tshirt}
                <div className="plants-box">
                    <figure><img className="imgg" src={image1} alt="img"/></figure>
                    {user===2 && <h3> <Link className="title" to={`/items/${item._id}`}>{item.title}</Link></h3>}
                    {user!==2 && <h3>{item.title}</h3>}
                    <h3> {`Price: ₹${price}`} </h3>
                    <p>
                        Clothing for students of their respective domain.<br />
                        Size can be choosen on the cart.<br />
                        <b><u>Stock Left: {numberInStock}</u></b>
                    </p>
                    {user===2 && <button className="but" type="button" onClick={() => onBuy(item)} >Buy This</button>}
                    {user===2 && <button className="but" type="button" onClick={() => onDelete(item)} >Delete</button>}

                    {user===1 &&<button className="mb-5 but-1" type="button" onClick={() => onBuy(item)} >Buy This</button>}
                </div>
            </div>
        );
    }
}

export default Card;