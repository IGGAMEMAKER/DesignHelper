import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles.scss';

import EditableLabel from './UI/EditableLabel';
import Toggle from './UI/Toggle';

import {
  getData,
  saveData
} from '../../helpers/getData';

const defaultItem = {
  name: 'default',
  description: 'default'
};

class Main extends Component {
  constructor (props) {
    super(props);
    // this.state = JSON.parse(localStorage.getItem('data'));
    this.state = getData();
  }

  update = obj => {
    this.setState(obj);

    saveData(this.state);
  };

  componentDidMount() {
    this.setState(JSON.parse(localStorage.getItem('data')));
  }

  toggleDescriptions = () => {
    this.update({
      showDescriptions: !this.state.showDescriptions
    })
  };

  addLevel = (question) => {
    const levelNames = this.state.levelNames;
    levelNames.push(question);

    const levels = this.state.levels;
    levels.push([defaultItem]);

    this.update({
      levels,
      levelNames
    })
  };

  addToLevel = level => {
    const levels = this.state.levels;

    levels[level].push(defaultItem);

    this.update({ levels });
  };

  onRemoveItem = (level, i) => {
    const levels = this.state.levels;

    levels[level].splice(i, 1);

    this.update({ levels });
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
      <div className={s.levelItem} onContextMenu={() => this.onRemoveItem(level, i)}>
        <div className={s.levelItemWrapper}>
          {title}
          {description}
        </div>
      </div>
    );
  };

  onQuestionChange = level => text => {
    const levelNames = this.state.levelNames;
    levelNames[level] = text;

    this.update({
      levelNames
    });
  };

  onItemDescriptionChange = (level, i) => text => {
    const levels = this.state.levels;
    levels[level][i].description = text;

    this.update({
      levels
    });
  };

  onItemTitleChange = (level, i) => text => {
    const levels = this.state.levels;
    levels[level][i].name = text;

    this.update({
      levels
    });
  };


  renderLevel = (level, index) => {
    const items = level.map(this.renderItem(index));

    const levelName = this.state.levelNames[index];

    return <div className={s.level}>
      <div className={s.levelItem}>
        <EditableLabel text={levelName} onChange={this.onQuestionChange(level)} />
      </div>
      {items}
      <div className={s.levelItem}>
        <Toggle text="+" onClick={() => this.addToLevel(index)} />
      </div>
    </div>
  };

  render() {
    const levels = this.state.levels.map(this.renderLevel);

    return <div>
      <h2 className={s.mainTitle}>ROAD TO GREAT GAME STARTS HERE...</h2>
      <Toggle text="D" onClick={this.toggleDescriptions} />
      {levels}
      <div className={s.level}>
        <div className={s.levelItem}>
          <Toggle
            text="+"
            onClick={() => this.addLevel(`question${levels.length}`)}
          />
        </div>
      </div>
    </div>;
  }
}

export default withStyles(Main, s);
