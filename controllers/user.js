import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

export const signin = async (req, res) => {
	// THIS DATA IS COMING THROUGH POST REQUEST AS IT HAS BODY
	const { email, password } = req.body;

	try {
		const oldUser = await UserModal.findOne({ email });
		// THIS CODE WHEN NO USER FOUND
		if (!oldUser)
			return res.status(404).json({ message: "User doesn't exist" });

		// THIS CODE VERIFIES IF USER EXIST THEN PASSWORD ENTERED MATHES WITH HIS PREVIOUS PASSWORDS
		const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
		// THIS CODE IF PASSWORD DOES NOT MATCH
		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid credentials" });

		// IF THE USER IS CORRECT WITH ID AND PASSWORD , THEN WE GENERATE A JWT TOKEN WHICH WILL BE SENT TO BROWSER AND WILL BE STORED THERE UNTIL THE EXPIRY TIME, SO THAT EVEN IF CLOSES THE WINDOW. IT KEEPS HIM LOGGED IN
		const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
			expiresIn: "1h"
		});

		res.status(200).json({ result: oldUser, token });
	} catch (err) {

		res.status(500).json({ message: "Something went wrong" });
	}
};

export const signup = async (req, res) => {
	const { email, password, firstName, lastName } = req.body;

	try {
		const oldUser = await UserModal.findOne({ email });

		if (oldUser)
			return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await UserModal.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`
		});

		const token = jwt.sign({ email: result.email, id: result._id }, secret, {
			expiresIn: "1h"
		});

		res.status(201).json({ result, token });
	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
		console.log(error);
	}
};
