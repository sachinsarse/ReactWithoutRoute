import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { showListAction } from '../actions/album-actions';

class AlbumView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumData: []
    }
  }

  componentDidMount() {
    this.getAlbums();
  }

  getAlbumsApi() {
    var header = {
      method: 'GET',
      headers: {
        "Authorization": 'Basic dGVzdEBsaWZlcmF5LmNvbTplc3BsQDEyMw==',
      },
    };
    return fetch("http://localhost:8080/api/jsonws/EternusCRUD-portlet.album/get-albums", header)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        }
      })
  }

  getAlbums() {
    var rec = this;
    this.getAlbumsApi().then(function (response) {
      rec.setState({ albumData: response });
    });
  };


  deleteAlbumApi(id) {
    var url = "http://localhost:8080/api/jsonws/EternusCRUD-portlet.album/delete-album/album-id/" + id;
    var header = {
      method: 'DELETE',
      headers: {
        "Authorization": 'Basic dGVzdEBsaWZlcmF5LmNvbTplc3BsQDEyMw==',
      },
    };
    return fetch(url, header)
      .then(response => {
        response;
      });
  }

  onDelete(id, current) {
    current.deleteAlbumApi(id).then(function (response) {
      current.getAlbums();
    });
  };

  onEdit(id, currentScope) {
    currentScope.props.showListAction(false, id);
  };

  onAdd(currentScope) {
    currentScope.props.showListAction(false, -10000);
  };

  renderTable() {
    var rec = this.state;
    var current = this;
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th> Sr.No </th>
            <th> Album Name </th>
            <th> Release Year </th>
            <th> Artist ID </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            rec.albumData.map(function (row, i) {
              return (
                <tr key={i}>
                  <td> {i + 1} </td>
                  <td><a onClick={ current.onEdit.bind(null, row.albumId, current) }>{row.albumName}</a></td>
                  <td> {row.releaseYear} </td>
                  <td> {row.artistId} </td>
                  <td>
                    <button type="button" className="btn btn-default btn-sm" onClick={ current.onDelete.bind(null, row.albumId, current) }>
                      <span class="glyphicon glyphicon- remove"></span> Delete
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }


  render() {
    var currentScope = this;
    return (
      <div>
        <div className="row">
          <div className="col-xs-11">
            <button id="add" className="btn btn-success pull-right" onClick={ this.onAdd.bind(null, currentScope) }><span className="glyphicon glyphicon-plus-sign"></span>
              Add</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1">
          </div>
          <div className="col-md-10">
            {this.renderTable() }
          </div>
          <div className="col-md-1">
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showListAction: (value, id) => {
      dispatch(showListAction(value, id));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumView)