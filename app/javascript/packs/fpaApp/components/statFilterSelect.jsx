import React from 'react';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';


class StatFilterSelect extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleClick = this.props.handleClick.bind(this);
  }

  handleCategoryChange(e) {
    this.setState({ categories: e });
  }

  render() {
    // We aren't actually using these categories for stat calculation, so we don't want them included
    const labelBlackList = ['Rank', 'Name', 'Team', 'Positions', 'FG%', 'FT%', 'FGM/FGA', 'FTM/FTA'];

    const categoryCheckboxes = this.props.categoryLabels.filter(function(label){
      return (labelBlackList.indexOf(label) == -1 ? true : false);
    }).map(label => (
      <ToggleButton value={label}>{label}</ToggleButton>
    ));

    return(
      <div key="stat-filter-select">
        <div key="stat-filter-checkboxes" >
          <ToggleButtonGroup
            type="checkbox"
            
            onChange={this.handleCategoryChange}
          >
            {categoryCheckboxes}
          </ToggleButtonGroup>
        </div>
        <Button bsStyle="primary" onClick={() => this.handleClick(this.state)}>Apply Stat Filters</Button>
      </div>
    )
  }
}
export default StatFilterSelect;