import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './styles.scss';

import EditableLabel from './UI/EditableLabel';
import Toggle from './UI/Toggle';

import {
  getData,
  saveData,
  restoreDefaults
} from '../../helpers/getData';

const defaultItem = {
  name: 'default',
  description: 'default'
};

class Main extends Component {
  constructor (props) {
    super(props);
    // this.state = JSON.parse(localStorage.getItem('data'));
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    console.log('componentDidMount Main.js');

    this.reload();
  }

  reload = () => {
    const data = JSON.parse(localStorage.getItem('data'));

    console.log('parsed.... in reload', data);

    this.setState({
      levels: data.levels,
      levelNames: data.levelNames,
      showDescriptions: data.showDescriptions,
      // exportJSON: data.exportJSON,

      loaded: true
    });
  };

  update = obj => {
    const state = Object.assign({}, this.state, obj);
    saveData(state);
    console.log('switch to', state);

    this.reload();
  };

  exportDocument = () => {
    return JSON.stringify(this.state);
  };

  toDefaults = () => {
    restoreDefaults()
  };

  toggleDescriptions = () => {
    this.update({
      showDescriptions: !this.state.showDescriptions
    })
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

  toggleExportText = () => {
    this.update({
      exportJSON: !this.state.exportJSON
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

  onRemoveLevel = level => {
    console.log('remove level', level);

    const levels = this.state.levels;
    const levelNames = this.state.levelNames;

    levels.splice(level, 1);
    levelNames.splice(level, 1);

    this.update({ levels, levelNames });
  };


  renderItem = level => (item, i) => {
    const title = <div className={s.levelItemTitle}>
      <EditableLabel text={item.name} onChange={() => this.onItemTitleChange(level, i)} />
    </div>;

    let description;
    if (this.state.showDescriptions) {
      description = <div className={s.levelItemDescription}>
        <EditableLabel text={item.description} onChange={() => this.onItemDescriptionChange(level, i)} />
      </div>;
    }

    return (
      <div key={`item-${level}-${i}`} className={s.levelItem} onContextMenu={() => this.onRemoveItem(level, i)}>
        <div className={s.levelItemWrapper}>
          {title}
          {description}
        </div>
      </div>
    );
  };

  renderLevel = (level, index) => {
    const items = level.map(this.renderItem(index));

    const levelName = this.state.levelNames[index];

    return <div key={`level-${index}`} className={s.level}>
      <div className={s.levelItem}>
        <div onClick={() => this.onRemoveLevel(index)}>X</div>
      </div>
      <div className={s.levelItem}>
        <EditableLabel text={levelName} onChange={this.onQuestionChange(index)} />
      </div>
      {items}
      <div className={s.levelItem}>
        <Toggle text="+" onClick={() => this.addToLevel(index)} />
      </div>
    </div>
  };

  render() {
    const loading = <div className={s.loadingElement}>Loading...</div>;
    const levels = this.state.loaded ? this.state.levels.map(this.renderLevel) : loading;

    const exportDocument = this.state.exportJSON && <textarea className={s.exportDocument} value={this.exportDocument()} />;

    return <div>
      <h2 className={s.mainTitle}>ROAD TO GREAT GAME STARTS HERE...</h2>

      <Toggle text="Defaults" onClick={this.toDefaults} />
      <Toggle text="D" onClick={this.toggleDescriptions} />
      <Toggle text="E" onClick={this.toggleExportText} />

      {levels}

      <div className={s.level}>
        <div className={s.levelItem}>
          <Toggle
            text="+"
            onClick={() => this.addLevel(`question${levels.length}`)}
          />
        </div>
      </div>

      <br />
      <br />
      {exportDocument}
    </div>;
  }
}

export default withStyles(Main, s);
