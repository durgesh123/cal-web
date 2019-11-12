import React from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                fullName: '',
                mobile: '',
                email: '',
                password: ''
            },
            submitted: false,
            currentUser: localStorage.getItem('user'),
            selectValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelUser = this.cancelUser.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    cancelUser() {
      const { currentUser } = this.state;

      return currentUser ? history.push('/') : history.push('/login');
    }

    handleDropdownChange(e) {
      this.setState({ selectValue: e.target.value });
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.fullName && user.mobile && user.email && user.password && this.state.selectValue) {
            const payload = {
              user: {
                full_name: user.fullName,
                mobile: user.mobile,
                email: user.email,
                password: user.password,
                max_subscription_count: this.state.selectValue
              }
            }
            this.props.register(payload);
        }
    }

    render() {
        const { registering  } = this.props,
              { user, submitted, currentUser } = this.state;

        return (
            <div className="col-md-6 col-md-offset-3 contaiiner-style">
                <h2>{currentUser ? "Add New Amin" : "Register As Super Admin"}</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.fullName ? ' has-error' : '')}>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" className="form-control" name="fullName" value={user.fullName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="mobile">Mobile Number</label>
                        <input type="text" className="form-control" name="mobile" value={user.mobile} onChange={this.handleChange} />
                        {submitted && !user.mobile &&
                            <div className="help-block">Mobile Number is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    { currentUser &&
                      <div className={'form-group' + (submitted && !user.max_subscription_count ? ' has-error' : '')}>
                          <label htmlFor="max_subscription_count" style = {{display: "block"}}>User Subscriptions</label>
                          <select id="dropdown" onChange={this.handleDropdownChange} className="form-control">
                            <option value="N/A">Please Select</option>
                            <option value="Upto 5">Upto 5</option>
                            <option value="Upto 10">Upto 10</option>
                            <option value="Upto 20">Upto 20</option>
                            <option value="Upto 50">Upto 50</option>
                            <option value="Upto 100">Upto 100</option>
                            <option value="Upto 150">Upto 150</option>
                            <option value="Upto 200">Upto 200</option>
                          </select>
                          {submitted && !user.max_subscription_count &&
                              <div className="help-block">User Subscriptions required</div>
                          }
                      </div>
                    }
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">{currentUser ? "Add User" : "Register"}</button>
                        {registering &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <a onClick = {this.cancelUser} className="btn btn-link">Cancel</a>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
