import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
import { format } from 'date-fns';
// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
// @material-ui/icons
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
import Table from './Table.js';
import { useContacts } from 'services/contexts/contact.js';

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.js';

const useStyles = makeStyles(theme => ({
  ...profilePageStyle,
  gridList: {
    display: 'grid',
    margin: '0 auto',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem'
  },
  container: {
    maxWidth: 'auto',
    margin: '2rem auto',
    padding: '0 3rem 2rem'
  },
  toolbar: {
    height: '111px',
    width: '100%'
  }
}));

export default props => {
  const classes = useStyles();
  const { fetchContacts } = useContacts();
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data, errors } = await fetchContacts('Received', true);
      if (data && data.length > 0) {
        const formatted = data.map(b => {
          return {
            idContact: b.id_contact,
            book: {
              id: b.id_book,
              price: b.price,
              ...b.book
            },
            contactInfo: {
              name: b.full_name,
              email: b.email,
              phone: b.phone
            },
            date: format(new Date(b.created_at), 'dd/MM/yyyy')
          };
        });
        setContacts(formatted);
      }
      setIsLoading(false);
    }

    loadData();
  }, []);

  return (
    <div>
      <Parallax small filter image={require('assets/img/banner-home.png')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div style={{ textAlign: 'left' }} className={classes.profile}>
                  <div className={classes.name} style={{ marginTop: '0' }}>
                    <h2 className={classes.title}>Contatos</h2>
                    <div style={{ fontWeight: '300' }}>
                      <span>
                        Veja quem solicitou seus dados de contato e também de
                        quem você solicitou.
                      </span>
                    </div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <Divider style={{ margin: '2rem 0', width: '100%' }} />
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                {isLoading ? 'Carregando...' : <Table data={contacts} />}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
