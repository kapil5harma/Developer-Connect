import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteClick = id => {
    this.props.deleteExperience(id);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="DD/MM/YYYY"> {exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
          {/* <tbody>{experience}</tbody> */}
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};
// Do not need withRouter because we won't pass this.props.history to redirect after we get response from API request.
// export default connect(null, { deleteExperience })(withRouter(Experience));

// So changed export looks like this:
export default connect(null, { deleteExperience })(Experience);
