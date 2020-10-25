/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
// react components for routing our app without refresh
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';

// @material-ui/icons
import { NotificationsActive, CloudDownload, Person } from '@material-ui/icons';

// core components
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import Button from 'components/CustomButtons/Button.js';

import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const [logged, setLogged] = useState(cookies.get('logged') || false);

  useEffect(() => {
    setLogged(cookies.get('logged'));
  }, [cookies.get('logged')]);

  console.log(logged);

  return (
    <List className={classes.list}>
      {logged ? (
        <>
          {/* <ListItem className={classes.listItem} style={{ marginRight: '5px' }}>
            <Button
              justIcon
              //round
              href="#pablo"
              className={classes.notificationNavLink}
              onClick={e => e.preventDefault()}
              color="dark"
            >
              <NotificationsActive className={classes.icons} />
            </Button>
          </ListItem> */}
          <ListItem className={classes.listItem}>
            {/* {user && user.login && ( */}
            <CustomDropdown
              noLiPadding
              buttonText={'Ayrton'}
              // buttonText={user.username}
              buttonProps={{
                className: classes.navLink,
                color: 'outlined'
              }}
              buttonIcon={Person}
              //dropdownList={[dropList]}
              dropdownList={[
                <NavLink
                  to="/minha-conta/meu-perfil"
                  className={classes.dropdownLink}
                >
                  Dados cadastrais
                </NavLink>,
                <NavLink to="/login" className={classes.dropdownLink}>
                  Sair
                </NavLink>
              ]}
            />
            {/* )} */}
          </ListItem>
        </>
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <NavLink to="/register">
              <Button
                //href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
                color="outlined"
                target="_blank"
                className={classes.navLink}
              >
                Cadastrar
              </Button>
            </NavLink>
          </ListItem>
          <ListItem className={classes.listItem}>
            <NavLink to="/login">
              <Button
                color="outlined"
                target="_blank"
                className={classes.navLink}
              >
                <Person className={classes.icons} /> Entrar
              </Button>
            </NavLink>
          </ListItem>
        </>
      )}
    </List>
  );
}
