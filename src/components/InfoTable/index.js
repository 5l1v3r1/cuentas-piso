import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Table } from 'reactstrap';
import { auth, db } from '../../firebase';

import './index.css';
import { forEach } from '@firebase/util';

const InfoTablePage = ({ history }) =>
  <div className="loginFormApp">
    <InfoTable />
  </div>

const INITIAL_STATE = {
    authorID: '',
    tickets: '',
    otherTickets: '',
}

class InfoTable extends Component {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
      this.createLiItems = this.createLiItems.bind(this);
      this.createRows = this.createRows.bind(this);
    }

    componentDidMount(){
        const getAuthorUID = auth.getCurrentUserUID();
        this.setState({ authorID: getAuthorUID });
        // Get the data
        db.onceGetAuthorTickets(getAuthorUID).then(snapshot =>
            this.setState({ tickets: snapshot.val() })
        );
        db.onceGetOtherTickets(getAuthorUID).then(snapshot => {

            console.log('************* DEBUG ******************');
            const allTickets = snapshot.val();
            allTickets.key = snapshot.key;
            console.log(allTickets.key);
            console.table(allTickets);
            console.log('************* DEBUG ******************');

            this.setState({ otherTickets: snapshot.val() });
        });
        // Difference a\b
        const otherTickets = this.state.otherTickets;
        console.log(this.state.otherTickets);
        Object.keys(otherTickets).map((key) => {
            var ticketUID = key;
            var field = otherTickets[key];
            console.log(ticketUID + ' = ' + field);
        });
    }

    createLiItems(objectItems){
        if (objectItems === null) { return null; }
        return Object.keys(objectItems).map((key) => {
            
            if (objectItems[key] instanceof Object) {
                var nestedObject = Object.assign({}, objectItems[key]); // Convierto array en objeto
                return ( 
                <li>
                    <dl>
                        <dt><strong>{key}</strong>:</dt>
                        <dd><ul>{this.createLiItems(nestedObject) }</ul></dd>
                    </dl>
                </li>);
            };
            return (
                <li>
                    <strong>{key}</strong>: {objectItems[key]}
                </li>);
        });

        // return array.map((item) => {
        //     return (
        //         <li>{item}</li>
        //     );
        //   });
    }

    createRows(varsArray){
        if (varsArray === null) { return null; }
        return Object.keys(varsArray).map((key) => {
        var varName = key;
        var value = varsArray[key];
        return(
            <tr>
            <th scope="row">{varName}: </th>
            <td>
                { value instanceof Object
                ? <ul> {this.createLiItems(value)} </ul>
                : value }
            </td>
            </tr>
        );
        });
    }

    render(){
        return(
        <Container>
            <Row>
                <Col><div class="ticketTables">
                    <Table size="sm">
                        <thead>
                        <tr>
                            <td colSpan="2"><h5>Tickets creados por ti</h5></td>
                        </tr>
                        <tr>
                            <th>Ticket UID</th>
                            <th>values</th>
                        </tr>
                        </thead>
                        <tbody>
                            { this.createRows(this.state.tickets) }
                        </tbody>
                    </Table>
                </div></Col>
                
                <Col><div class="ticketTables">
                    <Table small>
                        <thead>
                        <tr>
                            <td colSpan="2"><h5>Tickets de otros</h5></td>
                        </tr>
                        <tr>
                            <th>Ticket UID</th>
                            <th>values</th>
                        </tr>
                        </thead>
                        <tbody>
                            { this.createRows(this.state.otherTickets) }
                        </tbody>
                    </Table>
                </div></Col>
            </Row>
        </Container>
        );
    }

}

export default InfoTablePage;

export {
    InfoTable,
  };