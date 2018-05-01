import React from 'react';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';


class PlayerFilterSelect extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleClick = this.props.handleClick.bind(this);
  }

  handlePositionChange(e) {
    this.setState({ positions: e });
  }

  handleStatusChange(e) {
    this.setState({ statuses: e });
  }

  render() {
    // Positions in basketball don't change, so we need a checkbox for each of these positions
    const positionCheckboxes = ['PG', 'SG', 'G', 'SF', 'PF', 'F', 'C'].map(position => (
      <ToggleButton key={`${position}-checkbox`} value={position}>{position}</ToggleButton>
    ));

    // Create a checkbox for all status conditions
    const statusCheckboxes = ['O', 'INJ', 'GTD', 'NA'].map(status => (
      <ToggleButton key={`${status}-checkbox`} value={status}>{status}</ToggleButton>
    ));

    return(
      <div key="filters">
        <div key="filter-checkboxes" >
          <ToggleButtonGroup
            type="checkbox"
            
            onChange={this.handlePositionChange}
          >
            {positionCheckboxes}
          </ToggleButtonGroup>

          <ToggleButtonGroup
            type="checkbox"
            
            onChange={this.handleStatusChange}
          >
            {statusCheckboxes}
          </ToggleButtonGroup>
        </div>
        <Button bsStyle="primary" onClick={() => this.handleClick(this.state)}>Apply Player Filters</Button>
      </div>
    )
  }
}
export default PlayerFilterSelect;