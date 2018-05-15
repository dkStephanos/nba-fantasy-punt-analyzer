import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, Grid } from "react-virtualized";

class PlayerGrid extends Component {
	constructor(props) {
    super(props);
    const cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 130
    });
    this.cache = cache;
  }
  cellRenderer = ({ columnIndex, key, rowIndex, style, parent }) => {
    return (
      <CellMeasurer 
        key={key}
        cache={this.cache}
        parent={parent}
        columnIndex={0}
        rowIndex={rowIndex}
      >
      	<div
      style={style}
    >
      <div key={`${this.props.players[rowIndex].player_key}-${this.props.players[rowIndex].player_stats.stats.stat[columnIndex].stat_id}`}> 
      {this.props.players[rowIndex].player_stats.stats.stat[columnIndex]}
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
          return <Grid
    cellRenderer={this.cellRenderer}
    columnCount={this.props.players[0].player_stats.stats.stat.length}
    columnWidth={100}
    height={300}
    rowCount={this.props.players.length}
    rowHeight={30}
    width={300}
    onScroll={this.props.onScroll}
  />
        }
      }
      </AutoSizer>
    );
  }
}

export default PlayerGrid;