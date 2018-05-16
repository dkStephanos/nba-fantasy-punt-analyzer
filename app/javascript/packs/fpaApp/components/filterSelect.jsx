import React from "react";
import {
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Panel
} from "react-bootstrap";

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
    const labelBlackList = [
      "Rank",
      "Name",
      "Owner",
      "Status",
      "FG%",
      "FT%",
      "FGM/FGA",
      "FTM/FTA"
    ];

    const categoryCheckboxes = this.props.categoryLabels
      .filter(function(label) {
        return labelBlackList.indexOf(label) == -1 ? true : false;
      })
      .map(label => (
        <ToggleButton key={`${label}-checkbox`} value={label}>
          {label}
        </ToggleButton>
      ));

    // Positions in basketball don't change, so we need a checkbox for each of these positions
    const positionCheckboxes = ["PG", "SG", "SF", "PF", "C"].map(position => (
      <ToggleButton key={`${position}-checkbox`} value={position}>
        {position}
      </ToggleButton>
    ));

    // Create a checkbox for all status conditions
    const statusCheckboxes = ["O", "INJ", "GTD"].map(status => (
      <ToggleButton key={`${status}-checkbox`} value={status}>
        {status}
      </ToggleButton>
    ));

    return (
      <div key="filter-select">
        <Panel id="filter-checkboxes">
          <Panel.Heading>
            <Panel.Title toggle>Player Filters</Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <div id="checkbox-container">
                <div style={{ padding: "1%" }} id="stat-filter-checkboxes">
                  <label>Categories: </label>
                  <br />
                  <ToggleButtonGroup
                    type="checkbox"
                    onChange={this.handleCategoryChange}
                  >
                    {categoryCheckboxes}
                  </ToggleButtonGroup>
                </div>

                <div style={{ padding: "1%" }} id="position-filter-checkboxes">
                  <label>Positions: </label>
                  <br />
                  <ToggleButtonGroup
                    type="checkbox"
                    onChange={this.handlePositionChange}
                  >
                    {positionCheckboxes}
                  </ToggleButtonGroup>
                </div>

                <div style={{ padding: "1%" }} id="status-filter-checkboxes">
                  <label>Statuses: </label>
                  <br />
                  <ToggleButtonGroup
                    type="checkbox"
                    onChange={this.handleStatusChange}
                  >
                    {statusCheckboxes}
                  </ToggleButtonGroup>
                </div>
              </div>
              <Button
                bsStyle="primary"
                style={{ float: "right", display: "inline-block" }}
                onClick={() => this.handleClick(this.state)}
              >
                Apply Filters
              </Button>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}
export default FilterSelect;
