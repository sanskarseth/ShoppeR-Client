import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Items from './components/items';
import ItemForm from './components/itemForm';
import Customers from './components/customers';
import Cart from './components/cart';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import Profile from './components/profile';
import LoginForm from './components/loginForm';
import Footer from './components/footer';
import Logout from './components/logout';
import RegisterForm from './components/registerForm';
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';
import { getCart } from './services/cartService';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	const [user, setUser] = useState({});
	const [badgeCount, updateBadgeCount] = useState(0);

	useEffect(() => {
		async function fetchData() {
			const userr = auth.getCurrentUser();
			setUser(userr);
		}
		fetchData();
		async function fetchdata2() {
			const itms = await getCart();
			console.log(itms);
			const data = itms.data.length;
			updateBadgeCount(data);
			// console.log(data);
		}
		fetchdata2();
	}, []);

	return (
		<div className="app-component">
			<ToastContainer />
			<NavBar badgeCount={badgeCount} user={user} />
			<Switch>
				<Route path="/register" component={RegisterForm} />
				<Route path="/login" component={LoginForm} />
				<Route path="/logout" component={Logout} />
				<ProtectedRoute
					path="/cart"
					render={(props) => (
						<Cart {...props} user={user} updateBadgeCount={updateBadgeCount} />
					)}
				/>
				<ProtectedRoute
					path="/profile"
					render={(props) => <Profile {...props} user={user} />}
				/>
				<ProtectedRoute path="/items/:id" component={ItemForm} />
				<Route
					path="/items"
					render={(props) => (
						<Items
							badgeCount={badgeCount}
							{...props}
							updateBadgeCount={updateBadgeCount}
							user={user}
						/>
					)}
				/>
				<ProtectedRoute path="/customers" component={Customers} />
				<Route path="/not-found" component={NotFound} />
				<Redirect from="/" exact to="/items" />
				<Redirect to="/not-found" />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
