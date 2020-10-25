const cardStyle = {
  card: {
    border: '0',
    marginBottom: '30px',
    marginTop: '30px',
    borderRadius: '6px',
    color: 'rgba(0, 0, 0, 0.87)',
    background: '#fff',
    width: '100%',
    boxShadow:
      '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    wordWrap: 'break-word',
    fontSize: '.875rem',
    transition: 'all 300ms linear'
  },
  cardPricing: {
    textAlign: 'center',
    '&:after': {
      backgroundColor: 'rgba(25,25,25, 0.7) !important'
    },
    '& ul': {
      listStyle: 'none',
      padding: 0,
      maxWidth: '240px',
      margin: '10px auto'
    },
    '& ul li': {
      color: '#414141',
      textAlign: 'center',
      padding: '12px 0px',
      borderBottom: '1px solid rgba(80,80,80,0.3)'
    },
    '& ul li:last-child': {
      border: 0
    },
    '& ul li b': {
      color: '#414141'
    },
    '& h1': {
      marginTop: '30px'
    },
    '& h1 small': {
      display: 'inline-flex',
      height: 0,
      fontSize: '18px'
    },
    '& h1 small:first-child': {
      position: 'relative',
      top: '-17px',
      fontSize: '26px'
    },
    '& ul li svg, & ul li .fab,& ul li .fas,& ul li .far,& ul li .fal,& ul li .material-icons': {
      position: 'relative',
      top: '7px'
    }
  },
  cardPlain: {
    background: 'rgba(250,250,250,0.8)',
    boxShadow: 'none',
    border: '1px solid #ccc'
  },
  cardCarousel: {
    overflow: 'hidden'
  }
};

export default cardStyle;
