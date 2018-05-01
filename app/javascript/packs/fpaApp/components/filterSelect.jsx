import React from 'react';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';


class FilterSelect extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.handleClick = this.props.handleClick.bind(this);
  }

  handleCategoryChange(e) {
    this.setState({ categories: e });
  }

  handlePositionChange(e) {
    this.setState({ positions: e });
  }

  render() {
    // We aren't actually using these categories for stat calculation, so we don't want them included
    const labelBlackList = ['Rank', 'Name', 'Team', 'Positions', 'FG%', 'FT%', 'FGM/FGA', 'FTM/FTA'];
    // Used to set the ToggleButton values
    let value = 1;

    const categoryCheckboxes = this.props.categoryLabels.filter(function(label){
      return (labelBlackList.indexOf(label) == -1 ? true : false);
    }).map(label => (
      <ToggleButton value={label}>{label}</ToggleButton>
    ));

    // Positions in basketball don't change, so we need a checkbox for each of these positions
    const positionCheckboxes = ['PG', 'SG', 'G', 'SF', 'PF', 'F', 'C'].map(position => (
      <ToggleButton value={position}>{position}</ToggleButton>
    ));

    return(
      <div key="filters">
        <div key="filter-checkboxes" >
          <ToggleButtonGroup
            type="checkbox"
            
            onChange={this.handleCategoryChange}
          >
            {categoryCheckboxes}
          </ToggleButtonGroup>
          <ToggleButtonGroup
            type="checkbox"
            
            onChange={this.handlePositionChange}
          >
            {positionCheckboxes}
          </ToggleButtonGroup>
        </div>
        <Button bsStyle="primary" onClick={() => this.handleClick(this.state)}>Apply Filters</Button>
      </div>
    )
  }
}
export default FilterSelect;