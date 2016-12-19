import React, { Component } from 'react';
import AlbumView from './album.view';
import AlbumAddEditView from './albumAddEdit.view';
import { connect } from 'react-redux';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var renderView;
    if (this.props.showList) {
      renderView = (
        <AlbumView />
      )
    } else {
      renderView = (
        <AlbumAddEditView />
      )
    }

    return (
      <div>
        { renderView }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showList: state.showList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)