import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    // border:'2px solid black',
    // boxShadow: '10px 10px #21b6ae',
    borderRadius: '10px',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 26px 42px rgba(0, 0, 0, 0.4)',
    backgroundColor: '#FFDEE9',
    backgroundImage: 'linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)'},
    // background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    
    

    // alignContent: 'center',
    // border:'2px solid black',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
    backgroundColor:'linear-gradient(to right, #12c2e9, #c471ed, #f64f59);',
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: "#21b6ae",
  },
}));

