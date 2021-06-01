import _ from 'lodash';
import utils from './utils';

const defaultClearValue = ({ value }) => {
  if (_.isArray(value)) return [];
  if (_.isDate(value)) return null;
  if (_.isBoolean(value)) return false;
  if (_.isNumber(value)) return 0;
  if (_.isString(value)) return '';
  return undefined;
};

const defaultValue = ({
  type,
  nullable = false,
  isEmptyArray = false
}) => {
  if (type === 'nullable') return null;
  if (type === 'date') return null;
  if (type === 'datetime-local') return null;
  if (type === 'checkbox') return false;
  if (type === 'number') return 0;
  if (nullable) return null;
  if (isEmptyArray) return [];
  return '';
};

const parsePath = (path) => {
  let $path = path;
  $path = _.replace($path, new RegExp('\\[', 'g'), '.');
  $path = _.replace($path, new RegExp('\\]', 'g'), '');
  return $path;
};

const parseInput = (input, {
  type, isEmptyArray, nullable, separated, unified, fallback,
}) =>
  input(utils.$try(separated, unified, fallback, defaultValue({
    type, isEmptyArray, nullable
  })));

const parseArrayProp = ($val, $prop) => {
  const $values = _.values($val);
  if ($prop === 'value' || $prop === 'initial' || $prop === 'default') {
    return _.without($values, null, undefined, '');
  }
  return $values;
};

const parseCheckArray = (field, value, prop) =>
  field.hasIncrementalKeys
    ? parseArrayProp(value, prop)
    : value;

const parseCheckOutput = ($field, $prop) =>
  (($prop === 'value') && $field.$output)
    ? $field.$output($field[$prop])
    : $field[$prop];

const defineFieldsFromStruct = (struct, add = false) =>
  _.reduceRight(struct, ($, name) => {
    const obj = {};
    if (_.endsWith(name, '[]')) {
      const val = (add) ? [$] : [];
      obj[_.trimEnd(name, '[]')] = val;
      return obj;
    }
    // no brakets
    const prev = struct[struct.indexOf(name) - 1];
    const stop = _.endsWith(prev, '[]') && (_.last(struct) === name);
    if (!add && stop) return obj;
    obj[name] = $;
    return obj;
  }, {});

const handleFieldsArrayOfStrings = ($fields, add = false) => {
  let fields = $fields;
  // handle array with field struct (strings)
  if (utils.isStruct(fields)) {
    fields = _.transform(fields, ($obj, $) => {
      const pathStruct = _.split($, '.');
      // as array of strings (with empty values)
      if (!pathStruct.length) return Object.assign($obj, { [$]: '' });
      // define flat or nested fields from pathStruct
      return _.merge($obj, defineFieldsFromStruct(pathStruct, add));
    }, {});
  }
  return fields;
};

const handleFieldsArrayOfObjects = ($fields) => {
  let fields = $fields;
  // handle array of objects (with unified props)
  if (utils.isArrayOfObjects(fields)) {
    fields = _.transform(fields, ($obj, field) => {
      if (utils.hasUnifiedProps({ fields: { field } }) && !_.has(field, 'name')) return undefined;
      return Object.assign($obj, { [field.name]: field });
    }, {});
  }
  return fields;
};

const handleFieldsNested = (fields, strictProps = true) =>
  _.transform(fields, (obj, field, key) => {
    if (utils.allowNested(field, strictProps)) {
      // define nested field
      return Object.assign(obj, {
        [key]: { fields: utils.isEmptyArray(field) ? [] : handleFieldsNested(field) },
      });
    }
    return Object.assign(obj, { [key]: field });
  }, {});

/* mapNestedValuesToUnifiedValues

FROM:

{
  street: '123 Fake St.',
  zip: '12345',
}

TO:

[{
  name: 'street'
  value: '123 Fake St.',
}, {
  name: 'zip'
  value: '12345',
}]

*/
const mapNestedValuesToUnifiedValues = data =>
  _.isPlainObject(data)
    ? _.map(data, (value, name) => ({ value, name }))
    : undefined;

/* reduceValuesToUnifiedFields

FROM:

{
  name: 'fatty',
  address: {
    street: '123 Fake St.',
    zip: '12345',
  },
};

TO:

{
  name: {
    value: 'fatty',
    fields: undefined
  },
  address: {
    value: {
      street: '123 Fake St.',
      zip: '12345'
    },
    fields: [ ... ]
  },
};

*/
const reduceValuesToUnifiedFields = values =>
  _.transform(values, (obj, value, key) =>
    Object.assign(obj, {
      [key]: {
        value,
        fields: mapNestedValuesToUnifiedValues(value),
      },
    }), {});

/*
  Fallback Unified Props to Sepated Mode
*/
const handleFieldsPropsFallback = (fields, initial, fallback) => {
  if (!_.has(initial, 'values')) return fields;
  // if the 'values' object is passed in constructor
  // then update the fields definitions
  let { values } = initial;
  if (utils.hasUnifiedProps({ fields })) {
    values = reduceValuesToUnifiedFields(values);
  }
  return _.merge(fields, _.transform(values, (result, v, k) => {
    if (_.isArray(fields[k])) result[k] = v
    if (!(k in fields) && (!isNaN(Number(k)) || fallback)) result[k] = v
  }, {}));
};

const mergeSchemaDefaults = (fields, validator) => {
  if (validator) {
    const schema = _.get(validator.plugins, 'svk.config.schema');
    if (_.isEmpty(fields) && schema && !!schema.properties) {
      _.each(schema.properties, (prop, key) => {
        _.set(fields, key, {
          value: prop.default,
          label: prop.title,
        });
      });
    }
  }
  return fields;
};

const prepareFieldsData = (initial, strictProps = true, fallback = true) => {
  let fields = _.merge(
    handleFieldsArrayOfStrings(initial.fields, false),
    handleFieldsArrayOfStrings(initial.struct, false),
  );

  fields = handleFieldsArrayOfObjects(fields);
  fields = handleFieldsPropsFallback(fields, initial, fallback);
  fields = handleFieldsNested(fields, strictProps);

  return fields;
};

const pathToFieldsTree = (struct, path, n = 0, add = false) => {
  const structPath = utils.pathToStruct(path);
  const structArray = _.filter(struct, item => _.startsWith(item, structPath));
  const $tree = handleFieldsArrayOfStrings(structArray, add);
  const $struct = _.replace(structPath, new RegExp('\\[]', 'g'), `[${n}]`);
  return handleFieldsNested(_.get($tree, $struct));
};

export default {
  defaultValue,
  defaultClearValue,
  parseInput,
  parsePath,
  parseArrayProp,
  parseCheckArray,
  parseCheckOutput,
  mergeSchemaDefaults,
  handleFieldsNested,
  handleFieldsArrayOfStrings,
  prepareFieldsData,
  pathToFieldsTree,
};
