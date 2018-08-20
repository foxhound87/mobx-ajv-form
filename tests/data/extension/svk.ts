import simulateAsyncFindUserCall from './_.async';

const extend = {
  keywords: {
    range: {
      type: 'number',
      compile: (sch, parentSchema) => {
        const min = sch[0];
        const max = sch[1];

        return (parentSchema.exclusiveRange === true)
          ? data => (data > min) && (data < max)
          : data => (data >= min) && (data <= max);
      },
    },
    checkUser: {
      async: true,
      validate: (field, value) =>
        simulateAsyncFindUserCall({ [field]: value })
          .then((items:any[]) => (items.length === 0)),
    },
  },
  // formats: {},
};

export default ($ajv) => {
  Object.keys(extend.keywords).forEach(key => $ajv.addKeyword(key, extend.keywords[key]));
  // Object.keys(extend.formats).forEach(key => $ajv.addFormat(key, extend.formats[key]));
};
