import React from 'react';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// core components

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';

import componentsStyle from 'assets/jss/material-kit-react/views/components.js';

const HomePage = ({ classes, ...rest }) => {
  return (
    <div style={{ backgroundColor: '#bbb' }}>
      <Header
        brand="relibre"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: 'white'
        }}
        {...rest}
      />
      <div className={classes.container}>
        <GridContainer style={{ height: '100vh' }}>
          <GridItem style={{ margin: 'auto' }}>
            <h1>Anuncie seus livros na nossa plataforma</h1>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};
export default withStyles(componentsStyle)(HomePage);
