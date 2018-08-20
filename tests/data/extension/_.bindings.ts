/**
  Fields Bindings
*/
export default {

  MaterialTextFieldTemplate: ({ field, props, $try }) => ({
    type: $try(props.type, field.type),
    id: $try(props.id, field.id),
    name: $try(props.name, field.name),
    value: $try(props.value, field.value),
    floatingLabelText: $try(props.label, field.label),
    hintText: $try(props.placeholder, field.placeholder),
    errorText: $try(props.error, field.error),
    disabled: $try(props.disabled, field.disabled),
    onChange: $try(props.onChange, field.onChange),
    onFocus: $try(props.onFocus, field.onFocus),
    onBlur: $try(props.onBlur, field.onBlur),
  }),

  MaterialTextFieldRewriter: {
    id: 'id',
    name: 'name',
    type: 'type',
    value: 'value',
    label: 'floatingLabelText',
    placeholder: 'hintText',
    disabled: 'disabled',
    error: 'errorText',
    onChange: 'onChange',
    onFocus: 'onFocus',
    onBlur: 'onBlur',
  },

};
