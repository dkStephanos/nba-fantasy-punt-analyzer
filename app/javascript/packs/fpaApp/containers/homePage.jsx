import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getLeagueByKey } from '../actions/league';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getLeagueByKey(this.props.leagueKey);
  }

  render() {
    debugger;
    return (
      <div>
        <h1>NBA Fantasy Analyzer App</h1>

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
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    league: state.leagueReducer.league,
    leagueKey: ownProps.match.params.leagueKey
  };
};

export default connect(mapStateToProps, { getLeagueByKey })(HomePage);