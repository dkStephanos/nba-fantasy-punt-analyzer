import React from 'react';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';


class FilterSelect extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleClick = this.props.handleClick.bind(this);
  }

  handleCategoryChange(e) {
    this.setState({ categories: e });
  }

  handlePositionChange(e) {
    this.setState({ positions: e });
  }

  handleStatusChange(e) {
    this.setState({ statuses: e });
  }

  render() {
    // We aren't actually using these categories for stat calculation, so we don't want them included
    const labelBlackList = ['Rank', 'Name', 'Team', 'Positions', 'Owner', 'Status','FG%', 'FT%', 'FGM/FGA', 'FTM/FTA'];

    const categoryCheckboxes = this.props.categoryLabels.filter(function(label){
      return (labelBlackList.indexOf(label) == -1 ? true : false);
    }).map(label => (
      <ToggleButton key={`${label}-checkbox`} value={label}>{label}</ToggleButton>
    ));

    // Positions in basketball don't change, so we need a checkbox for each of these positions
    const positionCheckboxes = ['PG', 'SG', 'SF', 'PF', 'C'].map(position => (
      <ToggleButton key={`${position}-checkbox`} value={position}>{position}</ToggleButton>
    ));

    // Create a checkbox for all status conditions
    const statusCheckboxes = ['O', 'INJ', 'GTD', 'NA'].map(status => (
      <ToggleButton key={`${status}-checkbox`} value={status}>{status}</ToggleButton>
    ));

    return(
      <div key="stat-filter-select">
        <div key="stat-filter-checkboxes" >
          <label>Stat Categories</label>
          <ToggleButtonGroup
            type="checkbox"
            
            onChange={this.handleCategoryChange}
          >
            {categoryCheckboxes}
          </ToggleButtonGroup>

          <label>Positions</label>
          <ToggleButtonGroup
            type="checkbox"
            
            onChange={this.handlePositionChange}
          >
            {positionCheckboxes}
          </ToggleButtonGroup>

          <label>Statuses</label>
          <ToggleButtonGroup
            type="checkbox"
            
            onChange={this.handleStatusChange}
          >
            {statusCheckboxes}
          </ToggleButtonGroup>
        </div>
        <Button bsStyle="primary" onClick={() => this.handleClick(this.state)}>Apply Filters</Button>
      </div>
    )
  }
}
export default FilterSelect;