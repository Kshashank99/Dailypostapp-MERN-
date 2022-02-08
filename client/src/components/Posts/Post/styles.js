import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
	media: {
		height: 0,
		paddingTop: "56.25%",
		backgroundColor: "rgba(0, 0, 0, 0)"
		// backgroundBlendMode: 'darken',
	},
	border: {
		border: "solid"
	},
	fullHeightCard: {
		height: "100%"
	},
	card: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		borderRadius: "15px",
		height: "100%",
		position: "relative",
		boxShadow: "0 26px 42px rgba(0, 0, 0, 0.4)",
		backgroundColor: "cream"
	},
	// btn1:{

	// },
	btn2: {
		marginLeft: "-60px",
		width: "fit-content"
	},
	overlay: {
		position: "absolute",
		top: "20px",
		left: "20px",
		color: "white"
		// boxShadow: '0 26px 42px rgba(100, 564, 0, 0.2)',
		// FontWeight:'10'
	},
	overlay2: {
		position: "absolute",
		top: "20px",
		right: "20px",
		color: "white"
	},
	grid: {
		display: "flex"
	},
	details: {
		display: "flex",
		justifyContent: "space-between",
		margin: "20px"
	},
	title: {
		padding: "0 16px"
	},
	cardActions: {
		padding: "0 16px 8px 16px",
		display: "flex",
		justifyContent: "space-between"
	}
});
