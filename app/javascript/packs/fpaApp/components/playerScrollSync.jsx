import * as React from 'react';
import {
  AutoSizer,
  Grid,
  ScrollSync
} from 'react-virtualized';
import PlayerList from '../components/playerList';
import PlayerGrid from '../components/playerGrid';



export default class PlayerScrollSync extends React.PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      columnWidth: 75,
      columnCount: 50,
      height: 300,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      rowHeight: 40,
      rowCount: 100,
    };
  }

  render() {
    const {
      columnCount,
      columnWidth,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
    } = this.state;

    return (


        <ScrollSync>
      {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => (
        <div className='Table'>
          <div className='LeftColumn'>
            <PlayerList
              scrollTop={scrollTop}
              players={this.props.players}
            />
          </div>
          <div className='RightColumn'>
            <PlayerGrid
              onScroll={onScroll}
              players={this.props.players}
            />
          </div>
        </div>
      )}
    </ScrollSync>
     
    );
  }

 }