import React, { Component, PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './styles.scss';

class Toggle extends Component {
  render() {
    return <div
      className={s.circleButton}
      onClick={this.props.onClick}
    >{this.props.text}</div>
  };
}

export default withStyles(Toggle, s);
