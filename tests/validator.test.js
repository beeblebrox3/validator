var $ = {
    mk: function (element, value, attrs) {
        element = document.createElement(element);
        if (value !== undefined) {
            element.value = value;
        }

        if (attrs !== undefined) {
            for(var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    element.setAttribute(attr, attrs[attr]);
                }
            }
        }

        return element;
    }
};

QUnit.test('test complex form', function (assert) {
    var form = $.mk('form');

    form.appendChild(
        $.mk('input', 'hello world', {required: true, name: 'input_a'}) // valid
    ).appendChild(
        $.mk('input', '', {required: true, name: 'input_b'}) // invalid
    ).appendChild(
        $.mk('input', 'aa', {required: true, name: 'input_c', 'data-validation': 'length:3'}) // invalid
    ).appendChild(
        $.mk('input', 'abc', {required: true, name: 'input_d', 'data-validation': 'length:3'}) // valid
    ).appendChild(
        $.mk('input', 'aa', {required: true, name: 'input_e', type: 'number'}) // invalid
    ).appendChild(
        $.mk('input', '33', {required: true, name: 'input_f', type: 'number'}) // valid
    ).appendChild(
        $.mk('input', 'aa aa', {required: true, name: 'input_g', 'data-validation': 'alphanumeric'}) // invalid
    ).appendChild(
        $.mk('input', 'abc2', {required: true, name: 'input_h', 'data-validation': 'alphanumeric'}) // valid
    ).appendChild(
        $.mk('input', 'a4', {required: true, name: 'input_i', 'data-validation': 'alpha'}) // invalid
    ).appendChild(
        $.mk('input', 'abc', {required: true, name: 'input_j', 'data-validation': 'alpha'}) // valid
    ).appendChild(
        $.mk('input', '0', {required: true, name: 'input_k', 'data-validation': 'min:10'}) // invalid
    ).appendChild(
        $.mk('input', '10', {required: true, name: 'input_l', 'data-validation': 'min:10'}) // valid
    ).appendChild(
        $.mk('input', '100', {required: true, name: 'input_m', 'data-validation': 'min:10'}) // valid
    ).appendChild(
        $.mk('input', '0', {required: true, name: 'input_n', 'data-validation': 'max:10'}) // valid
    ).appendChild(
        $.mk('input', '10', {required: true, name: 'input_o', 'data-validation': 'max:10'}) // valid
    ).appendChild(
        $.mk('input', '100', {required: true, name: 'input_p', 'data-validation': 'max:10'}) // invalid
    ).appendChild(
        $.mk('input', 'aaa@domain.com', {required: true, name: 'input_q', 'data-validation': 'email'}) // valid
    );

    var validator = new Validator(form);
    assert.equal(false, validator.validate());

    assert.equal(false, validator.errors.hasOwnProperty('input_a'));
    assert.equal(true, validator.errors.hasOwnProperty('input_b'));
    assert.equal(true, validator.errors.hasOwnProperty('input_c'));
    assert.equal(false, validator.errors.hasOwnProperty('input_d'));
    assert.equal(true, validator.errors.hasOwnProperty('input_e'));
    assert.equal(false, validator.errors.hasOwnProperty('input_f'));
    assert.equal(true, validator.errors.hasOwnProperty('input_g'));
    assert.equal(false, validator.errors.hasOwnProperty('input_h'));
    assert.equal(true, validator.errors.hasOwnProperty('input_i'));
    assert.equal(false, validator.errors.hasOwnProperty('input_j'));
    assert.equal(true, validator.errors.hasOwnProperty('input_k'));
    assert.equal(false, validator.errors.hasOwnProperty('input_l'));
    assert.equal(false, validator.errors.hasOwnProperty('input_m'));
    assert.equal(false, validator.errors.hasOwnProperty('input_n'));
    assert.equal(false, validator.errors.hasOwnProperty('input_o'));
    assert.equal(true, validator.errors.hasOwnProperty('input_p'));
    assert.equal(false, validator.errors.hasOwnProperty('input_q'));
});