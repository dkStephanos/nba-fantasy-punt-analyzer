import React from 'react';

class StatFilterSelect extends React.Component {

  render() {
    // We aren't actually using these categories for stat calculation, so we don't want them included
    const labelBlackList = ['Rank', 'Name', 'Team', 'Positions', 'FG%', 'FT%', 'FGM/FGA', 'FTM/FTA'];

    const checkboxes = this.props.categoryLabels.filter(function(label){
      return (labelBlackList.indexOf(label) == -1 ? true : false)
    }).map(categoryLabel => (
      <div key={`${categoryLabel}-filter`}>
        <label for={`${categoryLabel}-checkbox`}>{categoryLabel}</label>
        <input id={`${categoryLabel}-checkbox`} type="checkbox"></input>
      </div>
    ))
    
    return(
      <div key={"stat-filters"}>
        {checkboxes}
      </div>
    )
  }
}
export default StatFilterSelect;