import { container } from 'assets/jss/material-kit-react.js';

const componentsStyle = {
  container: {
    ...container
  },
  brand: {
    color: '#FFFFFF',
    textAlign: 'left'
  },
  title: {
    fontSize: '4.2rem',
    fontWeight: '600',
    display: 'inline-block',
    position: 'relative'
  },
  subtitle: {
    fontSize: '1.313rem',
    maxWidth: '500px',
    margin: '10px 0 0'
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3'
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  },
  link: {
    textDecoration: 'none'
  },
  textCenter: {
    textAlign: 'center'
  },
  planDescription: {
    color: '#808080',
    marginTop: '10px',
    fontWeight: 400
  },
  planPrice: {
    marginTop: '30px',
    color: '#414141'
  },
  icon: {
    color: '#5e17eb',
    margin: '10px auto 0',
    width: '130px',
    height: '130px',
    border: '1px solid #5e17eb',
    borderRadius: '50%',
    lineHeight: '174px',
    '& svg': {
      width: '55px',
      height: '55px'
    },
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      width: '55px',
      fontSize: '55px'
    }
  }
};

export default componentsStyle;
