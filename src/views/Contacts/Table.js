import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from 'components/CustomButtons/Button.js';
import { Edit, Clear, Search } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#03989e',
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const { data } = props;
  console.log(data);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Livro</StyledTableCell>
            <StyledTableCell align="right">Usuário</StyledTableCell>
            <StyledTableCell align="right">Data de Solicitação</StyledTableCell>
            <StyledTableCell align="right">Ações</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <>
              <StyledTableRow key={row.book.title}>
                <StyledTableCell component="th" scope="row">
                  {row.book.title}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.contactInfo.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.date}</StyledTableCell>
                <StyledTableCell align="right">
                  <div>
                    <Button
                      justIcon
                      //round
                      type="button"
                      className={classes.notificationNavLink}
                      onClick={() => {
                        setShowModal(true);
                      }}
                      color="success"
                    >
                      <Search className={classes.icons} />
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
              <Dialog
                open={showModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setShowModal(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="form-dialog-title">
                  Dados de Contato
                </DialogTitle>
                <DialogContent style={{ textAlign: 'left', minWidth: '420px' }}>
                  <div style={{ fontSize: '14px' }}>
                    <h4 style={{ textAlign: 'left' }}>Detalhes do usuário</h4>
                    <div>
                      <b>Nome:</b>{' '}
                      <span style={{ fontWeight: 300 }}>
                        {row.contactInfo.name}
                      </span>
                    </div>
                    <div>
                      <b>Email:</b>{' '}
                      <span style={{ fontWeight: 300 }}>
                        {row.contactInfo.email}
                      </span>
                    </div>
                    <div>
                      <b>Telefone:</b>{' '}
                      <span style={{ fontWeight: 300 }}>
                        {row.contactInfo.phone}
                      </span>
                    </div>
                    <div>
                      <b>Solicitou em:</b>{' '}
                      <span style={{ fontWeight: 300 }}>{row.date}</span>
                    </div>
                    <h4 style={{ textAlign: 'left' }}>Informações do livro</h4>
                    <div>
                      <b>Título:</b>{' '}
                      <span style={{ fontWeight: 300 }}>{row.book.title}</span>
                    </div>
                    <div>
                      <b>Autor:</b>{' '}
                      <span style={{ fontWeight: 300 }}>
                        {row.book.authors[0].name}
                      </span>
                    </div>
                    <div>
                      <b>Preço:</b>{' '}
                      <span style={{ fontWeight: 300 }}>{row.book.price}</span>
                    </div>
                    <div>
                      <b>Descrição:</b>{' '}
                      <span style={{ fontWeight: 300 }}>
                        {row.book.description}
                      </span>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setShowModal(false)} color="primary">
                    FECHAR
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
