import React, { Component } from "react";

export class SortByDropdown extends Component {
  state = {
    text: "Sort By: Position",
    sortOptions: {
      Position: "uninitialized",
      Newest: "uninitialized",
      Oldest: "uninitialized"
    }
  };

  componentDidMount() {
    this.props.setSortFn(this.sortbyPosition);
    this.setState({
      sortOptions: {
        Position: this.sortbyPosition,
        Newest: this.sortbyNewest,
        Oldest: this.sortbyOldest
      }
    });
  }

  onClickButton = (property, e) => {
    this.setState({
      text: "Sort By: " + property
    });
    this.props.setSortFn(this.state.sortOptions[property]);
  };

  render() {
    const menuOptions = [];
    for (const option of Object.keys(this.state.sortOptions)) {
      menuOptions.push(option);
    }

    return (
      <div>
        <div className="dropdown" style={this.dropDownStyles}>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.text}
          </button>

          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {menuOptions.map((option, index) => (
              <div
                className="dropdown-item"
                onClick={this.onClickButton.bind(this, option)}
                key={index}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: "30px" }} />
      </div>
    );
  }

  sortbyPosition = (a, b) => {
    if (a.start.isBeforePoint(b.start)) {
      return -1;
    } else if (a.start.isAfterPoint(b.start)) {
      return 1;
    } else {
      return 0;
    }
  };

  sortbyOldest = (a, b) => {
    if (a.timestamp > b.timeStamp) {
      return 1;
    } else if (a.timeStamp < b.timeStamp) {
      return -1;
    } else {
      return 0;
    }
  };

  sortbyNewest = (a, b) => {
    if (a.timeStamp < b.timeStamp) {
      return 1;
    } else if (a.timeStamp > b.timeStamp) {
      return -1;
    } else {
      return 0;
    }
  };

  /* Styling */
  dropDownStyles = {
    position: "fixed"
  };
}

export default SortByDropdown;
