import React from 'react';
import { Table } from 'react-bootstrap';


class PlayerTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	  		numPlayers: 25,
	  		isLoading: false
		};
	}

	componentDidMount() {
		window.addEventListener("scroll", () => {
			if (window.innerHeight + window.scrollY > document.body.scrollHeight - 100) {
		    	this.loadMorePlayers();
		  	}
		});
	}
		


	displayPlayers() {
		var items = [];
		for (var i = 0; i < this.state.numPlayers; i++) {
	  		items.push(this.props.playerRows[i]);
		}
		return items;
	}

	loadMorePlayers() {
		if(!this.state.isLoading) {
			this.setState({ isLoading: true });
				setTimeout(() => {
		  			this.setState({ numPlayers: this.state.numPlayers + 10, isLoading: false });
			}, 500);
		}
	}

	render() {
		return (
		  	<div>
		    	<Table striped bordered responsive hover condensed>
				  <thead>
				    <tr>
				      {this.props.labels}
				    </tr>
				  </thead>
				  <tbody>
				    {this.displayPlayers()}
				  </tbody>
				</Table>
				{this.state.isLoading ? <p className="loading"> Loading...</p> : ""}
		  	</div>
		);
	}
}

export default PlayerTable;