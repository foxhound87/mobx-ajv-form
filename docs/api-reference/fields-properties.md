# Fields Properties

| Property | Type | MobX Type | Info | Help |
|---|---|---|---|---|
| **submitting** | boolean | computed | Check if the field is in submitting state. | - |
| **validating** | boolean | computed | Check if the field is in validation state. | - |
| **bindings** | string | computed | The key of the registered bindings to use for the current field. | [help](../bindings/README.md) |
| **observers** | object | - | The mobx observers to listen on Fields Props or Fields Map changes. | [help](../extra/mobx-events.md#using-observers--interceptors-objects) |
| **interceptors** | object | - | The mobx interceptors to listen on Fields Props or Fields Map changes. | [help](../extra/mobx-events.md#using-observers--interceptors-objects) |
| **size** | int | computed | Number of contained Fields. | - |
| **path** | string | - | Field path (for nested fields). | - |
| **key** | string | - | Field key (same of `name` if not provided) | - |
| **name** | string | - | Field name (same of `key` if not provided). | - |
| **type** | string | - | Field type (default: `text`). | - |
| **label** | string | computed | Field label. If it is not specified, the `name` will be returned instead. | - |
| **placeholder** | string | computed | Field placeholder. | - |
| **default** | boolean | computed | The default/initial value of the field. | - |
| **disabled** | boolean | computed | The disabled state of the field. | - |
| **value** | mixed | computed | Computed value of the field. | - |
| **focused** | boolean | computed | Check if the field is focused. | - |
| **touched** | boolean | computed | Check if the field is touched. | - |
| **changed** | boolean | computed | Check if the field is changed. | - |
| **related** | boolean | computed | Get Related fields for validation. | - |
| **rules** | boolean | computed | Get DVR Validation Rules. | - |
| **validators** | boolean | computed | Get VJF Validation Functions. | - |
| **validateWith** | string | computed | Field prop to validate instead `value`. | - |
| **isValid** | boolean | computed | Check if the field is valid. | - |
| **isDirty** | boolean | computed | Check if the field is dirty. | - |
| **isPristine** | boolean | computed | Check if the field is pristine. | - |
| **isDefault** | boolean | computed | Check if the field is to default value. | - |
| **isEmpty** | boolean | computed | Check if the field is empty. | - |
| **hasError** | boolean | computed | Check if the field has errors. | - |
| **error** | string | computed | Field error message. | - |
| **options** | object | computed | Individual Field Options, with fallback on Form Options. | - |
| **extra** | mixed | computed | Additional extra data for the field (useful for a select input). | - |
| **files** | string | computed | Use the `onDrop` Event Handler to retrieve the files data. | - |
| **hasNestedFields** | boolean | computed | Check if the field has Nested Fields. | - |
| **hasIncrementalKeys** | boolean | computed | Check if the nested fields have incremental keys. | - |
