import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAlert } from 'react-alert';

import makeStyles from '@material-ui/core/styles/makeStyles';

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { Check } from '@material-ui/icons';
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button';
import Autocomplete from 'components/Autocomplete/Async';
import CustomInput from 'components/CustomInput/CustomInput.js';

import { useBooks } from 'services/contexts/book.js';

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

const MyBooks = ({ view, id, closeModal, ...props }) => {
  const classes = useStyles();
  const { createBook, fetchBook, updateBook } = useBooks();
  const alert = useAlert();

  const [selectedBook, setSelectedBook] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (id) {
        const data = await fetchBook(id);
        if (data && data.result) {
          setEditingBook(data.result);
          setDescription(data.result.book.description);
        }
      }
    }
    setIsLoading(false);

    loadData();
  }, [fetchBook, id]);

  const getPayload = () => {
    return {
      images: [
        {
          image: selectedBook.volumeInfo.imageLinks.thumbnail
        }
      ],
      book: {
        description: description,
        code_integration: selectedBook.id,
        isbn_13: selectedBook.id,
        title: selectedBook.volumeInfo.title,
        maturity_rating: selectedBook.volumeInfo.maturityRating,
        authors: selectedBook.volumeInfo.authors
          ? selectedBook.volumeInfo.authors.map(a => {
              return { name: a };
            })
          : [],
        categories: selectedBook.volumeInfo.categories
          ? selectedBook.volumeInfo.categories.map(c => {
              return { name: c };
            })
          : []
      },
      price: parseFloat(price),
      types: [
        {
          description: 'Venda'
        }
      ]
    };
  };

  const handleSubmit = () => {
    if (id) {
      handleEdit();
    } else {
      handleCreate();
    }
  };

  const handleCreate = async () => {
    setSaving(true);

    const payload = getPayload();
    try {
      const data = await createBook(payload);
      if (data) {
        // await fetchBooks();
        alert.success('Livro cadastrado com sucesso');
      }
    } catch (err) {
      //Handler error
    } finally {
      setSaving(false);
      closeModal();
    }
  };

  const handleEdit = async () => {
    setSaving(true);

    const payload = {
      id: parseInt(id),
      images: [
        ...editingBook.images
        // {
        //   image: selectedBook.volumeInfo.imageLinks.thumbnail
        // }
      ],
      book: {
        ...editingBook.book,
        description: description
      },
      types: [
        {
          description: 'Venda'
        }
      ]
    };

    try {
      const data = await updateBook(payload);
      if (data) {
        // await fetchBooks();
        alert.success('Livro atualizado com sucesso');
        closeModal();
      }
    } catch (err) {
      alert.error('Ocorreu um erro ao editar o livro');

      //Handler error
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <DialogTitle id="alert-dialog-slide-title">
        {'Cadastro de livro'}
      </DialogTitle>
      <DialogContent>
        <GridContainer justify="left" style={{ minWidth: '540px' }}>
          <GridItem xs={12} sm={12}>
            <Autocomplete
              onChange={selected => {
                setSelectedBook({ ...selected });
              }}
              disabled={id ? true : false}
              initialValue={id && editingBook ? editingBook.book.title : null}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} lg={12}>
            <CustomInput
              labelText="Preço"
              id="message"
              formControlProps={{
                fullWidth: true,
                className: classes.textArea
              }}
              inputProps={{
                value: price,
                onChange: e => setPrice(e.target.value)

                // endAdornment: (
                //   <InputAdornment position="end">
                //     <Person className={classes.inputIconsColor} />
                //   </InputAdornment>
                // )
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
                rows: 5,
                value: description,
                onChange: e => setDescription(e.target.value)
              }}
            />
          </GridItem>
        </GridContainer>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleSubmit();
            closeModal();
          }}
          color="primary"
        >
          {saving ? <CircularProgress size={30} color="white" /> : 'Salvar'}
        </Button>
      </DialogActions>
    </>
  );
};

export default MyBooks;
