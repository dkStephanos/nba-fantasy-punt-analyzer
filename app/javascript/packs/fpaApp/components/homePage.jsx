import React from 'react';
import { Table } from 'react-bootstrap';
import LeagueSelect from './leagueSelect';

class HomePage extends React.Component {

  render() {
    return(
      <div>
        <h1>NBA Fantasy Analyzer App</h1>

        <LeagueSelect />

  		<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Larry the Bird</td>
      <td></td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
      </div>
    )
  }
}
export default HomePage;