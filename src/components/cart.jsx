import React, { Component } from 'react';
import _ from 'lodash';
import './css/cart.css';
import {getCart,deleteItem,deleteItems} from '../services/cartService';
import {pay_success,pay_order} from '../services/paymentService';
// import Select from '../components/common/select';
import { toast,ToastContainer } from 'react-toastify';

class Cart extends Component {
    state={
        items:[],
        sum:0,
        size:['L','XL','S','XXL','XS'],
        order:1234
    }

    componentDidMount = async () =>{
        const itms = await getCart();
        const data = itms.data;
        this.props.updateBadgeCount(data.length);
        this.setState({items:data});
        let sum=0;

        data.map(s=>(
            sum=sum+s.price
        ))
        this.setState({sum});
    }

    handleDelete = async (item) =>{
        
        const originalItems = this.state.items;

        const items = this.state.items.filter(m => m._id !== item._id);
        this.setState({ items });
    
        try{
          await deleteItem(item._id);
          this.setState({sum:this.state.sum-item.price});
          this.props.updateBadgeCount(items.length);
        }
        catch(ex){
          if(ex.response && ex.response.status===404) 
          toast.warning('⚠️ Item is already deleted',{
            position: "top-center",
            autoClose: 1300,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            });
    
            this.setState({items:originalItems});
        }
     }

     orderIdService = () => {

     }

     loadScript = src => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }


      paymentHandler = async () => {

        const originalItems = this.state.items;

        try{
            const res = await this.loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );
    
            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }
    
            const result = await pay_order(this.state.sum*100,this.state.order);
    
            if (!result) {
                alert("Server error. Are you online?");
                return;
            }
    
            const { amount, id: order_id, currency } = result.data;
    
            const options = {
                key: "rzp_live_2lxS1owMqt0Cgg", // Enter the Key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: 'Shopper',
                description: "Payment Gateway for your orders",
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };
    
                    const result = await pay_success(data);
    
                    if(result.data.msg.toString()==='success'){
    
                        await deleteItems();
    
                        toast.success(`💰 Successfully paid...`,{
                                position: "top-center",
                                autoClose: 1300,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                                });
                
                            setTimeout(()=>{
                                window.location='/';
                            },1500); 
                    }
                },
                prefill: {
                    name: `${this.props.user.name}`,
                    email: `${this.props.user.email}`,
                    contact: `${this.props.user.phone}`,
                },
                notes: {
                    address: "Shopper, IIITR",
                },
                theme: {
                    color: "#61dafb",
                },
            };
    
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
        catch(ex){
            if(ex.response && ex.response.status===400) 
                toast.error('⚠️ Invalid User',{
                    position: "top-center",
                    autoClose: 1300,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    });

            this.setState({items:originalItems});
        }
        
    }

    render(){

        const {user} = this.props;
        const {items,sum} = this.state;
            return (
                <div className="container-fluid xx">
                    <br />
                    <br />
                    <br />
                    <br />
                    <h1 className="sheading">Shopping Cart</h1>
                    <table className="table container">
                        <thead>
                            <tr className="trow">
                                <th className="tdata" scope="col">#</th>
                                <th className="tdata" scope="col">Item</th>
                                <th className="tdata" scope="col"></th>
                                <th className="tdata" scope="col">Size</th>
                                <th className="tdata" scope="col">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {user && items.map(item => (
                                <tr
                                    className="trow"
                                    key={Math.random()}                                
                                >
                                    <td className="tdata">{_.indexOf(items,item) + 1}</td>
                                    <td className="tdata">{item.title}</td>
                                    <td className="tdata">
                                        <img className="im" src={item.photo} alt="img"/>
                                    </td>
                                    <td className="tdata">
                                        L
                                        
                                    </td>
                                    <td className="tdata">₹ {item.price}</td>
                                    <td className="remove clickable" onClick={() => this.handleDelete(item)}>
                                        Remove
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <br />
                    <h4 className="cart-value">Total Cart Value: ₹ {sum}</h4>
                    <div className="pay-button">
                        {sum!==0 && 
                            <button 
                                className="ml-4 mb-5 butt" 
                                type="button" 
                                onClick={this.paymentHandler} >
                                PAY NOW
                            </button>
                        }
                    </div>
                    <br />
                    <br />

                    {items.length===0 && <div className="ext"></div>}
                    

                    <ToastContainer />
                    
                </div>
            );
    }
}


export default Cart;
