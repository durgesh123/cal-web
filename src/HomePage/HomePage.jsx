import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { history } from '../_helpers';

class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.logOutUser = this.logOutUser.bind(this);
    }

    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id, confirmation) {
      if(confirmation) {
        alert("Are you sure you want to delete this user?");
        this.props.deleteUser(id)
      }
    }

    addNewUser() {
      history.push('/register');
    }

    logOutUser() {
      this.props.logout();
      history.push('/login');
    }

    displayAdminList(user) {
      if(user.is_admin) { return null }

      return (
        <tr key={user.id}>
          <td>{user.full_name}</td>
          <td>{user.email}</td>
          <td>{user.mobile}</td>
          <td>{user.max_subscription_count}</td>
          <td style = {{textAlign: "center"}}>
              <p data-placement="top" data-toggle="tooltip" title="Edit" style={{float: "left", marginLeft: "15%"}}>
                 <button className="btn btn-primary btn-xs"
                         data-title="Edit">
                     <span className="glyphicon glyphicon-pencil"></span>
                  </button>
               </p>
              <p data-placement="top" data-toggle="tooltip" title="Delete">
                 <button className="btn btn-danger btn-xs"
                         data-title="Delete"
                         onClick = {() => this.handleDeleteUser(user.id, true) } >
                     <span className="glyphicon glyphicon-trash"></span>
                 </button>
              </p>
          </td>
        </tr>
      );
    }

    render() {
        const { user, users } = this.props,
              userDetails = user.data.user;
        return (
          <div>
            <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">CalculaterZ Admin</a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                  <li className="active"><a href="#">Welcome {userDetails.full_name}</a></li>
                  <li><a onClick = {this.logOutUser}><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
                </ul>
              </div>
            </nav>
            <div className="container contaiiner-style">
              <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Registered <b>Admin's Details</b></h2></div>
                        <div className="col-sm-4" style={{marginTop: "15px"}}>
                            <button type="button" className="btn btn-info add-new pull-right" onClick={this.addNewUser} >
                               <i className="fa fa-plus"></i> Add New
                             </button>
                        </div>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>User Subscriptions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                      {users.items && users.items.map((user, index) =>
                          this.displayAdminList(user)
                      )}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    logout: userActions.logout
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
