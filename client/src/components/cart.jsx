import _ from 'lodash';
import React, { useState,useEffect } from 'react';
import {getCart} from '../services/userService';


const Cart = ({user}) => {

    const [items,setItems] = useState([]);
    
    useEffect(() => {
        async function fetchData(){
        const itms = await getCart();
        const data = itms.data;
        setItems(data);
        }
        fetchData();
    },[]);
        return (
            <div>
                <br />
                <br />
                <br />
                <br />

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item</th>
                            <th scope="col">Size</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {user && items.map(item => (
                            <tr
                                key={Math.random()}                                
                            >
                                <td>{_.indexOf(items,item) + 1}</td>
                                <td>{item.title}</td>
                                <td>L</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
                <br />
                <br />
                <br />
                <br />
            </div>
        );
    }

export default Cart;