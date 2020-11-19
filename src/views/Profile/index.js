import React, { useState } from 'react';
import { useAlert } from 'react-alert';
// nodejs library that concatenates classes
import classNames from 'classnames';
import CepCoords from 'coordenadas-do-cep';
// @material-ui/core components
import makeStyles from '@material-ui/core/styles/makeStyles';
// @material-ui/icons
import Divider from '@material-ui/core/Divider';

import Cookies from 'universal-cookie';

// core components
import Modal from 'components/Dialogs/LocationNotAllowed';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Parallax from 'components/Parallax/Parallax.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Email, Person, Phone, LocationSearching } from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.js';
import { useAuth } from 'services/auth';

const cookies = new Cookies();

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
  },
  geolocButton: {
    padding: '0.8rem 1.2rem'
  }
}));

const fetchAddressByZipCode = async zipCode => {
  const data = await fetch(
    `https://brasil-api.lorhansohaky.vercel.app/api/cep/v2/${zipCode}`
  )
    .then(response => {
      if (response.status >= 400) {
        throw new Error('Bad response from api');
      }
      return response.json();
    })
    .then(resp => {
      return resp;
    });
  return data;
};

export default props => {
  const classes = useStyles();
  const alert = useAlert();

  const { user, fetchUser, updateUser } = useAuth();

  const [name, setName] = useState(user ? user.name : '');
  const [legalName, setLegalName] = useState(user ? user.legal_name : '');
  const [document, setDocument] = useState(user ? user.document : '');
  const [email, setEmail] = useState(user ? user.login : '');
  const [phone, setPhone] = useState(user && user.phone ? user.phone : '');
  const [description, setDescription] = useState(
    user && user.description ? user.description : ''
  );
  const [website, setWebsite] = useState(
    user && user.web_site ? user.web_site : ''
  );
  const [zipCode, setZipCode] = useState(
    user && user.addresses.length > 0 ? user.addresses[0].zip_code : ''
  );
  const [street, setStreet] = useState(
    user && user.addresses.length > 0 ? user.addresses[0].street : ''
  );
  const [number, setNumber] = useState(
    user && user.addresses.length > 0 ? user.addresses[0].number : ''
  );
  const [neighborhood, setNeighborhood] = useState(
    user && user.addresses.length > 0 ? user.addresses[0].neighborhood : ''
  );
  const [city, setCity] = useState(
    user && user.addresses.length > 0 ? user.addresses[0].city : ''
  );
  const [state, setState] = useState(
    user && user.addresses.length > 0 ? user.addresses[0].state : ''
  );
  const [complement, setComplement] = useState(
    user && user.addresses.length > 0 ? user.addresses[0].complement : ''
  );
  const [latitude, setLatitude] = useState(
    user && user.addresses.length > 0 ? user.addresses[0].latitude : ''
  );
  const [longitude, setLongitude] = useState(
    user && user.addresses.length > 0 ? user.addresses[0].longitude : ''
  );
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingAddress, setLoadingAddress] = React.useState(false);

  //console.log(format(user.birthdate, 'dd/MM/yyyy'));
  React.useEffect(() => {
    async function loadData() {
      if (!user || !user.name) {
        const fullUser = await fetchUser();
        if (fullUser) {
          setName(fullUser.name);
          setLegalName(fullUser.legal_name);
          setEmail(fullUser.email);
          setDocument(fullUser.document);
          setWebsite(fullUser.web_site);
          setPhone(fullUser.phones[0].number);
          setZipCode(fullUser.addresses[0].zip_code);
          setNumber(fullUser.addresses[0].number);
          setCity(fullUser.addresses[0].city);
          setStreet(fullUser.addresses[0].street);
          setNeighborhood(fullUser.addresses[0].neighborhood);
          setState(fullUser.addresses[0].state);
          setComplement(fullUser.addresses[0].complement || '');
          setLatitude(fullUser.addresses[0].latitude);
          setLongitude(fullUser.addresses[0].longitude);
        }
      }
    }
    loadData();
  }, []);

  const findAddress = async () => {
    if (!zipCode || zipCode.length < 8) {
      return;
    }
    setLoadingAddress(true);
    try {
      const data = await fetchAddressByZipCode(zipCode);

      if (data && data.cep) {
        setCity(data.city);
        setNeighborhood(data.neighborhood);
        setStreet(data.street);
        setState(data.state);
        setLatitude(data.location.coordinates[1]);
        setLongitude(data.location.coordinates[0]);
      }
    } catch (err) {
      alert.error(`Endereço não encontrado com o CEP informado`);
    } finally {
      setLoadingAddress(false);
    }
  };

  const submit = async e => {
    e.preventDefault();
    await editUser();
  };

  const editUser = async () => {
    setLoading(true);
    const payload = {
      name: name,
      document,
      web_site: website,
      legal_name: legalName,
      description,
      phone: phone,
      addresses: [
        {
          street,
          city,
          state,
          complement,
          neighborhood,
          number,
          zip_code: zipCode,
          latitude: `${latitude}`,
          longitude: `${longitude}`
        }
      ]
    };

    try {
      if (latitude && longitude) {
        const { data } = await updateUser(payload);
        if (data && data.name) {
          alert.success('Informações atualizadas com sucesso');
        }
      } else {
        alert.error('Houve um erro ao tentar salvar as informações');
      }
    } catch (err) {
      //Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Parallax small filter image={require('assets/img/banner-home.png')} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="flex-start">
              <GridItem xs={12} sm={12} md={12}>
                <div style={{ textAlign: 'left' }} className={classes.profile}>
                  <div className={classes.name} style={{ marginTop: '0' }}>
                    <h2 className={classes.title}>Dados Gerais</h2>
                    <div style={{ fontWeight: '300' }}>
                      <span>Atualize as informações da sua empresa.</span>
                    </div>
                  </div>
                </div>
              </GridItem>
              <Divider style={{ margin: '2rem 0', width: '100%' }} />
            </GridContainer>
            <GridContainer justify="flex-start">
              <GridItem xs={12} sm={12} md={12}>
                <form className={classes.form} name="form" onSubmit={submit}>
                  <GridContainer justify="flex-start">
                    <GridItem xs={12} sm={12} md={12} justify="flex-start">
                      <div>
                        <h5 style={{ textAlign: 'left' }}>Dados De Exibição</h5>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                      <CustomInput
                        labelText="Nome"
                        id="name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: name,
                          onChange: event => setName(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Person className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={6} lg={6}>
                      <CustomInput
                        labelText="Razão Social"
                        id="legalName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: legalName,
                          onChange: event => setLegalName(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} lg={4}>
                      <CustomInput
                        labelText="CNPJ"
                        id="document"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: document,
                          onChange: event => setDocument(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} lg={4}>
                      <CustomInput
                        labelText="Telefone"
                        id="phone"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: phone,
                          onChange: event => setPhone(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} lg={4}>
                      <CustomInput
                        labelText="Site"
                        id="web_site"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: website,
                          onChange: event => setWebsite(event.target.value),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Phone className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <CustomInput
                        labelText="Descrição"
                        id="message"
                        formControlProps={{
                          fullWidth: true,
                          className: classes.textArea
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 4,
                          value: description,
                          onChange: e => setDescription(e.target.value)
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12} justify="flex-start">
                      <div>
                        <h5 style={{ textAlign: 'left' }}>Dados de endereço</h5>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} lg={12}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '220px' }}>
                          <CustomInput
                            labelText="CEP"
                            id="zipCode"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              type: 'text',
                              value: zipCode,
                              onChange: event => setZipCode(event.target.value),
                              maxLength: 8
                            }}
                          />
                        </div>
                        {loadingAddress ? (
                          <CircularProgress
                            size={30}
                            style={{ marginLeft: '16px' }}
                          />
                        ) : (
                          <Button
                            simple
                            color="primary"
                            size="md"
                            type="submit"
                            startIcon={<LocationSearching />}
                            className={classes.geolocButton}
                            onClick={() => findAddress()}
                            //disabled={loggedIn || loggingIn}
                          >
                            Buscar
                          </Button>
                        )}
                      </div>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={8} lg={8}>
                      <CustomInput
                        labelText="Endereço"
                        id="legalName"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: street,
                          onChange: event => setStreet(event.target.value),
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2} lg={2}>
                      <CustomInput
                        labelText="Número"
                        id="document"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: number,
                          onChange: event => setNumber(event.target.value)
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2} lg={2}>
                      <CustomInput
                        labelText="Estado"
                        id="phone"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: state,
                          onChange: event => setState(event.target.value),
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} lg={3}>
                      <CustomInput
                        labelText="Cidade"
                        id="web_site"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: city,
                          onChange: event => setCity(event.target.value),
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3} lg={3}>
                      <CustomInput
                        labelText="Bairro"
                        id="web_site"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: neighborhood,
                          onChange: event =>
                            setNeighborhood(event.target.value),
                          disabled: true
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                      <CustomInput
                        labelText="Complemento"
                        id="web_site"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: 'text',
                          value: complement,
                          onChange: event => setComplement(event.target.value)
                        }}
                      />
                    </GridItem>
                  </GridContainer>

                  <Button
                    variant="contained"
                    color="primary"
                    size="md"
                    type="submit"
                    //disabled={loggedIn || loggingIn}
                  >
                    Salvar
                  </Button>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Modal openModal={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
};
