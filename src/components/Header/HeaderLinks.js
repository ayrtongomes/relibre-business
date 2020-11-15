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

import { useAuth } from 'services/auth';
import styles from 'assets/jss/material-kit-react/components/headerLinksStyle.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const useStyles = makeStyles(styles);

const getFirstName = (name = '') => {
  const arr = (typeof name === 'string' ? name : '').split(' ') || [''];

  if (arr.length > 0) {
    if (arr instanceof Array) {
      return arr[0];
    } else if (typeof arr === 'string') {
      return arr;
    }
  }

  return '';
};

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { user, logout } = useAuth();

  return (
    <List className={classes.list}>
      {user && user.token ? (
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
              buttonText={getFirstName(user.name)}
              // buttonText={user.username}
              buttonProps={{
                className: classes.navLink,
                color: 'outlined'
              }}
              buttonIcon={Person}
              //dropdownList={[dropList]}
              dropdownList={[
                <NavLink to="/app/meu-perfil" className={classes.dropdownLink}>
                  Dados cadastrais
                </NavLink>,
                <a onClick={() => logout()} className={classes.dropdownLink}>
                  Sair
                </a>
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
