import React, { Component } from "react";
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";

class PlayerList extends Component {
	constructor(props) {
    super(props);
    const cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 130
    });
    this.cache = cache;
  }
  renderRow = ({ index, parent, key, style, isScrolling}) => {
    return (
      <CellMeasurer 
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
      	<div style={style}>
        	<div key={`${this.props.players[index].player_key}-rank`}>
        	{index + 1}: <img src={this.props.players[index].headshot.url}/>
        	</div>
        	<div>
        	<div>{this.props.players[index].name.full} </div>
        	<div style={{color: 'red'}} className="player-status-badge">{this.props.players[index].status ? this.props.players[index].status : ""}</div>
      		</div>
      	</div>
      </CellMeasurer>
    )
  }

  render() {
    return (
      <AutoSizer>
      {
        ({ width, height }) => {
          return <List
            rowCount={this.props.players.length}
            width={width}
            height={height}
            deferredMeasurementCache={this.cache}
            rowHeight={this.cache.rowHeight}
            rowRenderer={this.renderRow}
            scrollTop={this.props.scrollTop}
          />
        }
      }
      </AutoSizer>
    );
  }
}

export default PlayerList;