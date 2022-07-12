import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { signin, signup } from "../../actions/auth";
import { AUTH } from "../../constants/actionTypes";
import Icon from "./icons";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: ""
};

const SignUp = () => {
	const [form, setForm] = useState(initialState);
	const [isSignup, setIsSignup] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);

	const switchMode = () => {
		setForm(initialState);
		setIsSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("====================================");
		console.log(isSignup);
		console.log("====================================");
		if (isSignup) {
			dispatch(signup(form, history));
		} else {
			console.log(form);
			dispatch(signin(form, history));
		}
	};

	// WHEN A NEW USER SIGN UP THROUGH GOOGLE IT RETURN AN OBJECT CONTAINING ALL INFORMATION ABOIUT THE USER LIKE ID, NAME, PHOTO ETC.
	// eg. result:
	// email: "coolshashank357@gmail.com"
	// familyName: "kumar"
	// givenName: "shashank"
	// googleId: "108957901435727843201"
	// imageUrl: "https://lh3.googleusercontent.com/a/AATXAJxPYexyldcxSXC_ga_CMCFSHqyP6B9te-GKAfOO=s96-c"
	// name: "shashank kumar"
	// [[Prototype]]: Object
	// token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE4MmU0NTBhMzVhMjA4MWZhYTFkOWF
	const googleSuccess = async (res) => {
		console.log(res);
		// HERE WE USE OPTIONAL CHAINNG SO THAT IT DOES NOT THROW ERROR WHEN res OBJECT DOESNT EXIST AND IT SIMPLY ASSIGN UNDEFINEd TO result
		const result = res?.profileObj;
		const token = res?.tokenId;

		try {
			dispatch({ type: AUTH, data: { result, token } });

			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleError = () =>
		console.log("Google Sign In was unsuccessful. Try again later");

	const handleChange = (e) => {
		console.log(e.target);
		console.log(e.target.value);
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{isSignup ? "Sign up" : "Sign in"}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name='email'
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name='confirmPassword'
								label='Repeat Password'
								handleChange={handleChange}
								type='password'
							/>
						)}
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{isSignup ? "Sign Up" : "Sign In"}
					</Button>

					<Grid container justify='flex-end'>
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup
									? "Already have an account? Sign in"
									: "Don't have an account? Sign Up"}
							</Button>
						</Grid>
					</Grid>
				</form>
				<GoogleLogin
					clientId='1060169156463-88ge0gok37vl7i5a82mjjpl6pg0ddbbo.apps.googleusercontent.com'
					render={(renderProps) => (
						<Button
							className={classes.googleButton}
							color='primary'
							fullWidth
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							startIcon={<Icon />}
							variant='contained'>
							Google Sign In
						</Button>
					)}
					onSuccess={googleSuccess}
					onFailure={googleError}
					cookiePolicy='single_host_origin'
				/>
			</Paper>
		</Container>
	);
};

export default SignUp;
