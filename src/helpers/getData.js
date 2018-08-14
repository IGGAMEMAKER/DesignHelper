// import sessionStorage from './sessionStorage';

const defaults = {
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
    'Acquisition',
    'Retention',
    'Sales'
  ],

  showDescriptions: true,
};

const emptyDefaults = {
  levels: [
    []
  ],
  levelNames: [
    'Edit your first question here'
  ],

  showDescriptions: true
};

export const getData = () => {
  return emptyDefaults;
  const data = JSON.parse(localStorage.getItem('data'));// sessionStorage.getFromStorage('data');
  console.log('got data from storage', data);

  return data;
};

export const saveData = (data) => {
  localStorage.setItem('data', JSON.stringify(data));

  const read = localStorage.getItem('data');

  console.log('read from storage', read);
};

export const restoreDefaults = () => {
  localStorage.setItem('data', JSON.stringify(emptyDefaults));
};
