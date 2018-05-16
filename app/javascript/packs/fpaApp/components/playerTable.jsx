import React from "react";
import { Table } from "react-bootstrap";
import loadingIcon from "../assets/images/icons/Circle128.gif";

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
      if (
        window.innerHeight + window.scrollY >
        document.body.scrollHeight - 100
      ) {
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
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.setState({
          numPlayers: this.state.numPlayers + 10,
          isLoading: false
        });
      }, 500);
    }
  }

  render() {
    return (
      <div>
        <Table striped responsive hover>
          <thead>
            <tr>{this.props.labels}</tr>
          </thead>
          <tbody>{this.displayPlayers()}</tbody>
          <tfoot>
            <tr>
              {this.state.isLoading ? (
                <td align="center" className="loading">
                  <img src={loadingIcon} />
                </td>
              ) : (
                <td align="center">
                  <img src={loadingIcon} />
                </td>
              )}
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }
}

export default PlayerTable;
