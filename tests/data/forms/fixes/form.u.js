import validatorjs from 'validatorjs';
import { Form } from '../../../../src';
import dvr from '../../../../src/validators/DVR';

const fields = [
    'from',
    'to',
];

const rules = {
    from: 'before_or_equal:to',
    to: 'after:from',
};

const labels = {
    from: 'FROM',
    to: 'TO',
};

const plugins = {
    dvr: dvr(validatorjs)
};

const values = {
    from: new Date(2021, 7),
    to: new Date(2021, 6),
}

class NewForm extends Form {
    options() {
        return {
            validateOnInit: true,
            showErrorsOnInit: true
        };
    }
}

export default new NewForm({ fields, rules, labels, values }, { plugins, name: 'Fixes-U' })