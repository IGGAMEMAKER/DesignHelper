import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles.scss';

import EditableLabel from './UI/EditableLabel';
import Toggle from './UI/Toggle';

const defaultItem = {
  name: 'default',
  description: 'default'
};

class Main extends Component {
  state = {
    levels: [
      [
        {
          name: 'atmosphere',
          description: 'art, music, sounds'
        }
      ],
      [
        {
          name: 'positioning',
          description: 'describe app in 6 words'
        }
      ]
    ],
    levelNames: [
      'question1',
      'question2'
    ],

    showDescriptions: true
  };

  toggleDescriptions = () => {
    this.setState({
      showDescriptions: !this.state.showDescriptions
    })
  };

  addLevel = (question) => {
    const levelNames = this.state.levelNames;
    levelNames.push(question);

    const levels = this.state.levels;
    levels.push([defaultItem]);

    this.setState({
      levels,
      levelNames
    })
  };

  addToLevel = level => {
    const levels = this.state.levels;

    levels[level].push(defaultItem);

    this.setState({ levels });
  };

  renderItem = level => (l, i) => {
    const title = <div className={s.levelItemTitle}>
      <EditableLabel text={l.name} onChange={() => this.onItemTitleChange(level, i)} />
    </div>;

    let description;
    if (this.state.showDescriptions) {
      description = <div className={s.levelItemDescription}>
        <EditableLabel text={l.description} onChange={() => this.onItemDescriptionChange(level, i)} />
      </div>;
    }

    return (
      <div className={s.levelItemWrapper}>
        <div className={s.levelItem}>
          {title}
          {description}
        </div>
      </div>
    );
  };

  onQuestionChange = level => text => {
    const levelNames = this.state.levelNames;
    levelNames[level] = text;

    this.setState({
      levelNames
    });
  };

  onItemDescriptionChange = (level, i) => text => {
    const levels = this.state.levels;
    levels[level][i].description = text;

    this.setState({
      levels
    });
  };

  onItemTitleChange = (level, i) => text => {
    const levels = this.state.levels;
    levels[level][i].name = text;

    this.setState({
      levels
    });
  };


  renderLevel = (level, index) => {
    const items = level.map(this.renderItem(index));

    const levelName = this.state.levelNames[index];

    return <div>
      <div className={s.level}>
        <div className={s.levelItem}>
          <EditableLabel text={levelName} onChange={this.onQuestionChange(level)} />
        </div>
        {items}
        <div className={s.levelItem}>
          <Toggle text="+" onClick={() => this.addToLevel(index)} />
        </div>
      </div>
    </div>
  };

  render() {
    const levels = this.state.levels.map(this.renderLevel);

    return <div>
      <h2 className={s.mainTitle}>PATH TO GREAT GAME STARTS HERE...</h2>
      <div>
        <Toggle text="D" onClick={this.toggleDescriptions} />
      </div>
      {levels}
      <div>
        <div className={s.level}>
          <div className={s.levelItem}>
            <Toggle text="+" onClick={() => this.addLevel(`question${levels.length}`)} />
          </div>
        </div>
      </div>
    </div>;
  }
}

export default withStyles(Main, s);
