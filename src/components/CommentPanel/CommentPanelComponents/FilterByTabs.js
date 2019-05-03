import React, { Component } from "react";
import CommentBox from "./CommentBox";

class FilterByTabs extends Component {
  /* Bootstrap nav-tabs class that has tabs that filters comments*/
  tabContent = a => {
    switch (a) {
      case "All":
        return this.props.comments
          .sort(this.sortBy(this.props.sortingBy))
          .map(comment => <CommentBox comment={comment} />);
      default:
        return this.props.comments
          .sort(this.sortBy(this.props.sortingBy))
          .filter(comment => comment.tags.includes(a))
          .map(comment => <CommentBox comment={comment} />);
    }
  };

  sortBy = sort => {
    if (sort === "Oldest") {
      return this.sortbyOldest;
    } else if (sort === "Newest") {
      return this.sortbyNewest;
    } else {
      return this.sortbyPosition;
    }
  };

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

  render() {
    return (
      <div className="tagtabs">
        <ul className="nav nav-tabs" id="filterTabs" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="all-tab"
              data-toggle="tab"
              href="#all"
              role="tab"
              aria-controls="all"
              aria-selected="true"
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="grammar-tab"
              data-toggle="tab"
              href="#grammar"
              role="tab"
              aria-controls="grammar"
              aria-selected="false"
            >
              Grammar
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="theme-tab"
              data-toggle="tab"
              href="#theme"
              role="tab"
              aria-controls="theme"
              aria-selected="false"
            >
              Theme
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="content-tab"
              data-toggle="tab"
              href="#content"
              role="tab"
              aria-controls="content"
              aria-selected="false"
            >
              Content
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className="tab-pane active"
            id="all"
            role="tabpanel"
            aria-labelledby="all-tab"
          >
            {this.tabContent("All")}
          </div>
          <div
            className="tab-pane"
            id="grammar"
            role="tabpanel"
            aria-labelledby="grammar-tab"
          >
            {this.tabContent("Grammar")}
          </div>
          <div
            className="tab-pane"
            id="theme"
            role="tabpanel"
            aria-labelledby="theme-tab"
          >
            {this.tabContent("Theme")}
          </div>
          <div
            className="tab-pane"
            id="content"
            role="tabpanel"
            aria-labelledby="content-tab"
          >
            {this.tabContent("Content")}
          </div>
        </div>
      </div>
    );
  }
}

export default FilterByTabs;
