import * as _ from 'lodash';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (query = {}) => {
  // assume these usernames are in the database
  const db = [
    { user: 'Claudio' },
    { user: 'FoxHound' },
    { user: 'SteveJobs' },
  ];

  return sleep(25)
    .then(() => _.find(db, query) || []);
};

