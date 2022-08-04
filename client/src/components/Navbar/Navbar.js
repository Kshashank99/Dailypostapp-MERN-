import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import insta from "../../images/insta.png";
import decode from "jwt-decode";

import * as actionType from "../../constants/actionTypes";

import useStyles from "./styles";
const Navbar = () => {
	// RETIRIVING REAL USER FROM LOCAL STORAGE
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	// console.log("====================================");
	// console.log(user);
	// console.log("====================================");
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const classes = useStyles();

	const logout = () => {
		dispatch({ type: actionType.LOGOUT });

		history.push("/auth");

		setUser(null);
	};
	// THIS USEFFECT GET TRIGGERE WHEN  ROUTER CHANGES FROM '/AUTH' TO '/'
	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);
			// AFTER THE USER HAS BEEN LOGGED IN FOR MORE THAN EXPIRY TIME OF TOKEN, IT WILL BE LOGGED OUT WHEN HE WILL VISIT IT AGAIN
			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
		// TO AVOID THE REFRESH FOR GETTING THE USER IN NAVBAR GREETING WE USUE USELOCATION WHICH Locations represent where the app is now, where you want it to go, or even where it was.
	}, [location]);
	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<div className={classes.brandContainer}>
				<img className={classes.image} src={insta} alt='icon' height='60' />
				<Typography
					component={Link}
					to='/'
					className={classes.heading}
					variant='h3'
					align='center'>
					Pixel Verse
				</Typography>
			</div>
			<Toolbar className={classes.toolbar}>
				{user?.result ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user?.result.name}
							src={user?.result.imageUrl}>
							{user?.result.name.charAt(0)}
						</Avatar>
						<Typography className={classes.userName} variant='h6'>
							{user?.result.name}
						</Typography>
						<Button
							variant='contained'
							className={classes.logout}
							color='secondary'
							onClick={logout}>
							Logout
						</Button>
					</div>
				) : (
					<Button
						component={Link}
						to='/auth'
						variant='contained'
						color='primary'>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
