import React, { Component, PropTypes } from 'react';
import withStyles from '../../../../node_modules/isomorphic-style-loader/lib/withStyles';
import s from './styles.scss';

class EditableLabel extends Component {
  state = {
    editing: false,
    text: '',
  };

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      // took from
      // https://stackoverflow.com/questions/27827234/keypress-event-handling-in-reactjs

      this.setState({
        editing: false
      });

      this.props.onChange(this.state.text);

      console.log('enter press here! ')
    }
  };

  componentWillMount() {
    console.log('will mount', this.props.text);
    this.setState({
      text: this.props.text
    });
  }

  componentWillReceiveProps(nextProps, nextState) {

  }

  handleChange = (event) => {
    console.log('handleChange');
    this.setState({ text: event.target.value });
  };

  initEditing = () => {
    this.setState({
      editing: true
    })
  };

  render() {
    let text = this.state.text;
    let input;

    if (this.state.editing) {
      input = <textarea
        className={s.textarea}
        autoFocus
        value={text}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        onMouseOver={this.handleKeyPress}
      />
    } else {
      input = <div onClick={this.initEditing}>{text}</div>;
    }

    return <div>{input}</div>
  };
}

export default withStyles(EditableLabel, s);
