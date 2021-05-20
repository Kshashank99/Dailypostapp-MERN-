import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 20,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,183,255, 1)',
      
    background: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
    // backgroundColor: '#FFDEE9',
    backgroundImage: 'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)',

  },
  heading: {
    color: 'rgb(64, 1, 43)',
    fontFamily: 'Copse, serif',
  },
  image: {
    marginLeft: '15px',
  },
  

}));
