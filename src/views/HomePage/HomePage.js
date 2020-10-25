import React from 'react';

// components
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import Parallax from 'components/Parallax/Parallax.js';
import Footer from 'components/Footer/Footer.js';

import bg from 'assets/img/bg-homepage.png';

import componentsStyle from 'assets/jss/material-kit-react/views/components.js';

const HomePage = ({ classes, ...rest }) => {
  const assignPlan = () => {
    return window.location.assign('https://www.paypal.com');
  };
  return (
    <div style={{ backgroundImage: 'url("' + bg + '")' }}>
      <Header
        brand="relibre"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        {...rest}
      />
      <div className={classes.container}>
        <GridContainer
          style={{
            padding: '25vh 0 4vh'
          }}
        >
          <GridItem style={{ margin: 'auto', color: 'white' }}>
            <h2>Anuncie seus livros na nossa plataforma.</h2>
            <h4 style={{ fontWeight: 300, marginTop: '2em' }}>
              Ao assinar o plano você poderá cadastrar seus livros para venda e
              cadastrar os dados da sua empresa.
              <br />
              {/* </h4>
            <h4 style={{ fontWeight: 300, marginTop: '2em' }}> */}
              Essas informações da empresa e os livros cadastrados estarão
              visíveis para todos que acessarem a plataforma do{' '}
              <a href="http://relibre.vercel.app">Relibre</a>.
            </h4>
            <h5 style={{ fontWeight: 300, marginTop: '2em' }}>
              Escolha agora mesmo o plano que deseja e desbloqueie os benefícios
              de ser uma empresa parceira do Relibre.
            </h5>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={3}>
            <Card pricing>
              <CardBody pricing>
                <h6 className={classes.cardCategory}>1 MÊS</h6>
                <div className={classes.icon}>
                  <Icon className={classes.iconWhite}>filter_1</Icon>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <small>R$&nbsp;</small>{' '}
                  <h2 className={classes.planPrice}>&#32;15</h2>
                </div>{' '}
                <p className={classes.planDescription}>
                  Pacote de 1 mês, o valor mensal sai por 15 reais.
                </p>
                <Button round color="primary" onClick={() => assignPlan()}>
                  Escolher plano
                </Button>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={3}>
            <Card pricing>
              <CardBody pricing>
                <h6 className={classes.cardCategory}>3 MESES</h6>
                <div className={classes.icon}>
                  <Icon className={classes.iconWhite}>filter_3</Icon>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <small>R$&nbsp;</small>{' '}
                  <h2 className={classes.planPrice}>&#32;39</h2>
                </div>
                <p className={classes.planDescription}>
                  Pacote de 3 meses, o valor mensal sai por 13 reais.
                </p>
                <Button round color="primary" onClick={() => assignPlan()}>
                  Escolher plano
                </Button>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card pricing>
              <CardBody pricing>
                <h6 className={classes.cardCategory}>6 MESES</h6>
                <div className={classes.icon}>
                  <Icon className={classes.iconWhite}>filter_6</Icon>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <small>R$&nbsp;</small>{' '}
                  <h2 className={classes.planPrice}>&#32;60</h2>
                </div>{' '}
                <p className={classes.planDescription}>
                  Pacote de 6 meses, o valor mensal sai por 10 reais.
                </p>
                <Button round color="primary" onClick={() => assignPlan()}>
                  Escolher plano
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>

        <Footer />
      </div>
    </div>
  );
};
export default withStyles(componentsStyle)(HomePage);
