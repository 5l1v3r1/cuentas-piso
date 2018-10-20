import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import PaymentsFormPage from '../../components/PaymentsForm';
import { InfoTable } from '../../components/InfoTable';
import withAuthorization from '../../components/withAuthorization';

import './index.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    return({
      users: [
        {id:'00', name:'user0', pswd_hash:'hash', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJHKWpDrsNAllIxpJwZC7oUAeqdRmY1w3Rrj1clpT_pcyI9k8iQA'},
        {id:'01', name:'user1', pswd_hash:'hash', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyLr-TxT7i0PY6lDSzWskSqEhaW0rIzE7L-7A78iUrwTTBRturkQ'},
        {id:'02', name:'user2', pswd_hash:'hash', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXKx81EQRJCG5uBejziBsCsouhOobdxBmfN6x6bva4mLZlv4LPA'},
        {id:'03', name:'user3', pswd_hash:'hash', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzgim_xNkJUb0wP07QWo7NtkqR6JIdneqJsnL_BxETOvKlWefd'},
        //{id:'04', name:'user4', pswd_hash:'hash', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwZZsECaMf0IykGK6wbm_NbjNdE6IKMRAsU4ND6oqjy8_1bHUm'},
        //{id:'05', name:'user5', pswd_hash:'hash', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo4mlCtKjld42P3G43TnQ6MUIFImQn7OOrrrR1ahzJQz-ChQpnYw'}
      ],

      cuentas: [
        {id:'00', name:'Septiembre M y B',      users:['00', '01'],             lineasCuenta:['00', '01']},
        {id:'01', name:'Octubre D y M',         users:['02', '03'],             lineasCuenta:['02']},
        {id:'02', name:'Noviembre D, B y M',    users:['00', '01', '02'],       lineasCuenta:['03', '04']},
        {id:'03', name:'Noviembre B, M, D y X', users:['00', '01', '02', '03'], lineasCuenta:['05']}
      ],

      lineasCuenta: [
        {id: '00', cuenta:'00', desc:'Pechugas de pollo',   cant:3.60, author:'00', users:['00','01'],             date:'FuncionFecha'},
        {id: '01', cuenta:'00', desc:'Costillar de cerdo',  cant:5.20, author:'01', users:['00','01'],             date:'FuncionFecha'},
        {id: '02', cuenta:'01', desc:'Aceite de oliva',     cant:4.75, author:'02', users:['00','01', '02'],       date:'FuncionFecha'},
        {id: '03', cuenta:'02', desc:'Papel higiénico',     cant:3.20, author:'01', users:['00','01', '02'],       date:'FuncionFecha'},
        {id: '04', cuenta:'02', desc:'Objetos de limpieza', cant:8.30, author:'02', users:['00','01', '02'],       date:'FuncionFecha'},
        {id: '05', cuenta:'03', desc:'Gel de baño',         cant:8.30, author:'03', users:['00','01', '02', '03'], date:'FuncionFecha'}
      ]
    });
  }

  render() {
    return (
      <div className="Board">
      <Container>
          <PaymentsFormPage {...this.props} cuentas={this.state.cuentas} lineasCuenta={this.state.lineasCuenta} />

          <InfoTable {...this.props} />
        </Container>
        </div>
    );
  }
}


// Declaring access restriction
const authCondition = (authUser) => !!authUser;
// Exporting the component with the restrictions
export default withAuthorization(authCondition)(Board);