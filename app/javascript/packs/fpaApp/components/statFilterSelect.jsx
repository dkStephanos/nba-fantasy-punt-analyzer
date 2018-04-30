import React from 'react';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';


class StatFilterSelect extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.props.handleClick.bind(this);
  }

  handleChange(e) {
    debugger;
    this.setState({ categories: e });
  }

  render() {
    // We aren't actually using these categories for stat calculation, so we don't want them included
    const labelBlackList = ['Rank', 'Name', 'Team', 'Positions', 'FG%', 'FT%', 'FGM/FGA', 'FTM/FTA'];
    // Used to set the ToggleButton values
    let value = 1;

    const toggleButtons = this.props.categoryLabels.filter(function(label){
      return (labelBlackList.indexOf(label) == -1 ? true : false)
    }).map(label => (
      <ToggleButton value={label}>{label}</ToggleButton>
    ));

    return(
      <div key="stat-filters">
        <div key="stat-checkboxes" >
          <ToggleButtonGroup
            type="checkbox"
            
            onChange={this.handleChange}
          >
            {toggleButtons}
          </ToggleButtonGroup>
        </div>
        <Button bsStyle="primary" onClick={() => this.handleClick(this.state.categories)}>Apply Filters</Button>
      </div>
    )
  }
}
export default StatFilterSelect;