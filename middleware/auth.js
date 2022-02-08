import jwt from "jsonwebtoken";

const secret = "test";

// It will protect selected routes after user is logged in  and ensure that a user is authenticated before allowing their requests to go through.
// for eg. click the like button => auth middleware(next) => like controller
const auth = async (req, res, next) => {
	try {
		// aFTER LOGGED IN WE HAVE THE TOKEN FROM FRONTEND WHICH WE RETRIVE FPR EVERY REQUEST IN WHICH AUTH MIDDLEWARE  HAS BEEN ADDED.
		const token = req.headers.authorization.split(" ")[1];
		// NOW WE HAVE HAVE TWO KIND OF TOKEN, 1. OWN GENERATED TOKEN 2. GOOGLE AUTH TOKEN
		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			// HERE WE USE THE SAME SECRET THAT WE GENERATED WHILE CREATING TOKENN, RMB!
			decodedData = jwt.verify(token, secret);

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);
			// SUB IS AN ID WHICH DIFFERENTIATE GOOGLE USERS
			req.userId = decodedData?.sub;
		}

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
