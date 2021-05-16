import React, { Component } from 'react';
import {getHistory} from '../services/userHistory';
import _ from 'lodash';
import './css/profile.css';


class Profile extends Component {

    state={
        history:[]
    }

    componentDidMount = async () =>{
        const historyy = await getHistory();

        this.setState({history:historyy.data});
        // console.log(this.state.history);
    }

    render() {
        const {user} = this.props;

        return (
            <div className="container-fluid xx">
                <br/><br/>
                <h1 className="sheading">Profile Page</h1>
                {user && 
                    <div className="profile-details">
                        <b>
                            {'Name: '}{user.name}<br/>
                            {'Email: '}{user.email}<br/>
                            {'Phone No.: '}{user.phone}<br/>
                        </b>
                    </div>
                }
                <br />

                    <h5 className="sheading">Order History</h5>

                    <table className="table container">
                        <thead>
                            <tr className="trow">
                                <th className="tdata" scope="col">#</th>
                                <th className="tdata" scope="col">Date</th>
                                <th className="tdata" scope="col">Items</th>
                                <th className="tdata" scope="col">Amount Paid</th>
                                {user && user.isAdmin && <th className="tdata" scope="col">Delivered</th> }
                            </tr>
                        </thead>
                        <tbody>
                            
                        {user && this.state.history.map(order=>(
                            <tr
                            className="trow"
                            key={Math.random()}>
                                <td className="tdata">{_.indexOf(this.state.history,order) + 1}</td>
                                <td className="tdata">{order[0]}<br/>{order[1]}</td>
                                <td className="tdata" >
                                        {order[2].map(item=>(
                                        <div key={Math.random()}>{_.indexOf(order[2],item) + 1}{') '}{item.title}{'   '}
                                            {<img className="im" src={item.photo} alt="img"/>}
                                        <br/></div>
                                        ))}
                                </td>
                                <td className="tdata">
                                     {order[2].map(item=>(
                                        <div key={Math.random()}>{'₹ '}{item.price}<br/>
                                        </div>
                                        ))}
                                </td>
                                <td className="tdata">
                                    <label class="switch">
                                        <input type="checkbox" checked={false}/>
                                        <span class="slider round"></span>
                                    </label>  
                                </td>

                            </tr>

                        ))}
                        </tbody>
                    </table>

                <br /><br /><br /><br /><br /><br />

            </div>
        );
    }
}

export default Profile;