import React, { Component } from "react";
import Card from "@material-ui/core/Card";

import ReplyForm from "./BoxComponents/ReplyForm";
import ReplyContainer from "./BoxComponents/ReplyContainer";
import EditCommentForm from "./BoxComponents/EditCommentForm";

class CommentBox extends Component {
  state = {
    editing: false,
    quotedIsCollapsed: true,
    replies: [],
    viewingReplies: false,
    numVisibleReplies: 1
  };

  render() {
    if (this.state.editing) {
      return (
        <EditCommentForm
          comment={this.props.comment}
          scanDocument={this.props.scanDocument}
          finishEditing={this.finishEditing}
        />
      );
    }

    /* Conditionally render reply container */
    let replyContainer = null;
    if (this.props.isExpanded) {
      replyContainer = (
        <Card className="replyBox" onClick={this.preventPoint}>
          <div>
            <ReplyForm addReply={this.addReply} />
          </div>
          <div>
            <ReplyContainer
              replies={this.state.replies}
              viewingReplies={this.state.viewingReplies}
              hideReplies={this.hideReplies}
              numVisibleReplies={this.state.numVisibleReplies}
              seeMoreReplies={this.seeMoreReplies}
            />
          </div>
        </Card>
      );
    } else {
      replyContainer = null;
    }

    return (
      <div className="card" onClick={this.onClickCommentBox}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-10">
              <h5 className="card-title"> Anonymous </h5>
            </div>
            <div className="col-md-1">
              <button
                className="btn btn-min btn-sm dropdown-toggle"
                data-toggle="dropdown"
                onClick={this.preventPoint}
              >
                <span className="caret" />
              </button>
              <ul className="dropdown-menu">
                <div className="dropdown-item" onClick={this.beginEditing}>
                  Edit
                </div>
                <div className="dropdown-item" onClick={this.resolveComment}>
                  Resolve
                </div>
                <div className="dropdown-item" onClick={this.deleteComment}>
                  Delete
                </div>
              </ul>
            </div>
          </div>

          <h6 className="card-subtitle mb-2 text-muted">
            {new Date(this.props.comment.timeStamp).toString()}
          </h6>
          <div className="card-text">
            <em>
              {this.state.quotedIsCollapsed
                ? this.truncateQuoted()
                : this.props.comment.quoted}
              {this.displayFragments()}
            </em>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.toggleQuotedCollapse}
          >
            {this.state.quotedIsCollapsed ? "Expand" : "Collapse"}
          </button>
          <p className="card-text">{this.props.comment.suggestion}</p>
          <p className="card-text">
            Tags: {this.props.comment.tags.slice(1).map(tag => tag + " ")}
          </p>
        </div>
        {replyContainer}
      </div>
    );
  }

  preventPoint = e => {
    e.stopPropagation();
  };

  onClickCommentBox = () => {
    this.props.expandCommentAndFocus(this.props.id);
  };

  toggleQuotedCollapse = event => {
    this.setState({ quotedIsCollapsed: !this.state.quotedIsCollapsed });
    event.stopPropagation();
  };

  truncateQuoted = () => {
    if (this.props.comment.quoted.length > 30) {
      return this.props.comment.quoted.slice(0, 30) + "...";
    }
    return this.props.comment.quoted;
  };

  displayFragments = () => {
    if (!this.state.quotedIsCollapsed) {
      return this.props.comment.fragments.map(fragment => (
        <div>{fragment.quoted}</div>
      ));
    }
  };

  addReply = replyText => {
    if (replyText === "") {
      return;
    }
    const replies = this.state.replies;
    replies.push(replyText);
    this.setState({ replies: replies });
    this.seeMoreReplies(1);
  };

  hideReplies = () => {
    this.setState({ viewingReplies: false, numVisibleReplies: 0 });
  };

  seeMoreReplies = num => {
    this.setState({
      viewingReplies: true,
      numVisibleReplies: Math.min(
        this.state.numVisibleReplies + num,
        this.state.replies.length
      )
    });
  };

  beginEditing = () => {
    this.setState({ editing: true });
  };

  finishEditing = () => {
    this.setState({ editing: false });
  };
}

export default CommentBox;
