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
        $.mk('input', '33', {required: true, name: 'input_f', type: 'number', 'data-validation': 'digits'}) // valid
    ).appendChild(
        $.mk('input', 'aa aa', {required: true, name: 'input_g', 'data-validation': 'alphanumeric'}) // invalid
    ).appendChild(
        $.mk('input', 'abc2', {required: true, name: 'input_h', 'data-validation': 'alphanumeric'}) // valid
    ).appendChild(
        $.mk('input', 'a4', {required: true, name: 'input_i', 'data-validation': 'alpha'}) // invalid
    ).appendChild(
        $.mk('input', 'abc', {required: true, name: 'input_j', 'data-validation': 'alpha'}) // valid
    ).appendChild(
        $.mk('input', '0', {required: true, name: 'input_k', 'data-validation': 'numeric|min:10'}) // invalid
    ).appendChild(
        $.mk('input', '10', {required: true, name: 'input_l', 'data-validation': 'numeric|min:10'}) // valid
    ).appendChild(
        $.mk('input', '100', {required: true, name: 'input_m', 'data-validation': 'numeric|min:10'}) // valid
    ).appendChild(
        $.mk('input', '0', {required: true, name: 'input_n', 'data-validation': 'numeric|max:10'}) // valid
    ).appendChild(
        $.mk('input', '10', {required: true, name: 'input_o', 'data-validation': 'numeric|max:10'}) // valid
    ).appendChild(
        $.mk('input', '100', {required: true, name: 'input_p', 'data-validation': 'numeric|max:10'}) // invalid
    ).appendChild(
        $.mk('input', 'aaa@domain.com', {required: true, name: 'input_q', 'data-validation': 'email'}) // valid
    ).appendChild(
        $.mk('input', 'abc', {name: 'input_r', 'data-validation': 'checked', 'type': 'checkbox'}) // invalid
    ).appendChild(
        $.mk('input', 'abc', {name: 'input_s', 'data-validation': 'checked', 'type': 'checkbox', 'checked': 'checked'}) // valid
    ).appendChild(
        $.mk('input', 'abc', {name: 'input_t', 'data-validation': 'checked:1,2', 'type': 'checkbox'}) // valid
    ).appendChild(
        $.mk('input', 'def', {name: 'input_t', 'data-validation': 'checked:1,2', 'type': 'checkbox', 'checked': 'checked'}) // valid
    ).appendChild(
        $.mk('input', 'ghi', {name: 'input_t', 'data-validation': 'checked:1,2', 'type': 'checkbox', 'checked': 'checked'}) // valid
    ).appendChild(
        $.mk('input', '100.05', {name: 'input_u', 'type': 'number', 'data-validation': 'numeric'}) // valid
    ).appendChild(
        $.mk('input', '100,05', {name: 'input_v', 'type': 'number', 'data-validation': 'numeric:c'}) // valid
    ).appendChild(
        $.mk('input', '123.456.789-09', {name: 'input_w', 'type': 'text', 'data-validation': 'cpf'}) // valid
    ).appendChild(
        $.mk('input', '12345678909', {name: 'input_x', 'type': 'text', 'data-validation': 'cpf'}) // valid
    ).appendChild(
        $.mk('input', '66666666666', {name: 'input_y', 'type': 'text', 'data-validation': 'cpf'}) // invalid
    ).appendChild(
        $.mk('input', '56.855.350/0001-94', {name: 'input_z', 'type': 'text', 'data-validation': 'cnpj'}) // valid
    ).appendChild(
        $.mk('input', '56.855,350/0001', {name: 'input_aa', 'type': 'text', 'data-validation': 'cnpj'}) // invalid
    ).appendChild(
        $.mk('input', '56855350000194', {name: 'input_ab', 'type': 'text', 'data-validation': 'cnpj'}) // valid
    ).appendChild(
        $.mk('input', '66.855.350/0001-94', {name: 'input_ac', 'type': 'text', 'data-validation': 'cnpj'}) // invalid
    ).appendChild(
        $.mk('input', '65903040', {name: 'input_ad', 'type': 'text', 'data-validation': 'digitsBetween:8,8'}) // valid
    ).appendChild(
        $.mk('input', '65.903-040', {name: 'input_ae', 'type': 'text', 'data-validation': 'digitsBetween:8,8'}) // valid
    ).appendChild(
        $.mk('input', '65.903-04', {name: 'input_af', 'type': 'text', 'data-validation': 'digitsBetween:8,8'}) // invalid
    ).appendChild(
        $.mk('input', '(16) 99977-8145', {name: 'input_ag', 'type': 'text', 'data-validation': 'digitsBetween:10,11'}) // valid
    ).appendChild(
        $.mk('input', '(16) 9977-8145', {name: 'input_ah', 'type': 'text', 'data-validation': 'digitsBetween:10,11'}) // valid
    ).appendChild(
        $.mk('input', '16999778145', {name: 'input_ai', 'type': 'text', 'data-validation': 'digitsBetween:10,11'}) // valid
    ).appendChild(
        $.mk('input', '(16) 99977-81455', {name: 'input_aj', 'type': 'text', 'data-validation': 'digitsBetween:10,11'}) // invalid
    ).appendChild(
        $.mk('input', 'aaa@domain.com', {required: true, name: 'input_ak', 'type': 'email'}) // valid
    ).appendChild(
        $.mk('input', 'hehehehehe', {required: true, name: 'input_al', 'data-validation': 'min:5|max:10'}) // valid
    ).appendChild(
        $.mk('input', 'hehehehehehe', {name: 'input_am', 'data-validation': 'min:5|max:10'}) // invalid
    ).appendChild(
        $.mk('input', 'abc', {name: 'input_an', 'data-validation': 'checked:1,1', 'type': 'checkbox'}) // invalid
    ).appendChild(
        $.mk('input', 'def', {name: 'input_an', 'data-validation': 'checked:1,1', 'type': 'checkbox', 'checked': 'checked'}) // invalid
    ).appendChild(
        $.mk('input', 'ghi', {name: 'input_an', 'data-validation': 'checked:1,1', 'type': 'checkbox', 'checked': 'checked'}) // invalid
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
    assert.equal(true, validator.errors.hasOwnProperty('input_r'));
    assert.equal(false, validator.errors.hasOwnProperty('input_s'));
    assert.equal(false, validator.errors.hasOwnProperty('input_t'));
    assert.equal(false, validator.errors.hasOwnProperty('input_u'));
    assert.equal(false, validator.errors.hasOwnProperty('input_v'));
    assert.equal(false, validator.errors.hasOwnProperty('input_w'));
    assert.equal(false, validator.errors.hasOwnProperty('input_x'));
    assert.equal(true, validator.errors.hasOwnProperty('input_y'));
    assert.equal(false, validator.errors.hasOwnProperty('input_z'));
    assert.equal(true, validator.errors.hasOwnProperty('input_aa'));
    assert.equal(false, validator.errors.hasOwnProperty('input_ab'));
    assert.equal(true, validator.errors.hasOwnProperty('input_ac'));
    assert.equal(false, validator.errors.hasOwnProperty('input_ad'));
    assert.equal(false, validator.errors.hasOwnProperty('input_ae'));
    assert.equal(true, validator.errors.hasOwnProperty('input_af'));
    assert.equal(false, validator.errors.hasOwnProperty('input_ag'));
    assert.equal(false, validator.errors.hasOwnProperty('input_ah'));
    assert.equal(false, validator.errors.hasOwnProperty('input_ai'));
    assert.equal(true, validator.errors.hasOwnProperty('input_aj'));
    assert.equal(false, validator.errors.hasOwnProperty('input_ak'));
    assert.equal(false, validator.errors.hasOwnProperty('input_al'));
    assert.equal(true, validator.errors.hasOwnProperty('input_am'));
    assert.equal(true, validator.errors.hasOwnProperty('input_an'));
});