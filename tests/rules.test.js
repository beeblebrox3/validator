var validator = new Validator(document.createElement('form'));
var input = document.createElement('input');
var rule;

// TESTS
QUnit.test('test rule length', function (assert) {
    rule = validator.rule_length;

    input.value = '';
    assert.equal(false, rule.call(validator, input, 2));

    input.value = 'a';
    assert.equal(false, rule.call(validator, input, 2));

    input.value = 'aa';
    assert.equal(true, rule.call(validator, input, 2));

    input.value = 'aaa';
    assert.equal(false, rule.call(validator, input, 2));
});

QUnit.test('test rule notEmpty', function (assert) {
    rule = validator.rule_notEmpty;

    input.value = '';
    assert.equal(false, rule.call(validator, input));

    input.value = 'a';
    assert.equal(true, rule.call(validator, input));

    input.value = '0';
    assert.equal(true, rule.call(validator, input));
});

QUnit.test('test rule numeric', function (assert) {
    rule = validator.rule_numeric;

    input.value = '';
    assert.equal(false, rule(input));

    input.value = 'a';
    assert.equal(false, rule(input));

    input.value = '0';
    assert.equal(true, rule(input));

    input.value = '09';
    assert.equal(true, rule(input));

    input.value = '99';
    assert.equal(true, rule(input));

    input.value = '9a';
    assert.equal(false, rule(input));

    input.value = '9 ';
    assert.equal(false, rule(input));
});

QUnit.test('test rule email', function (assert) {
    rule = validator.rule_email;

    input.value = '';
    assert.equal(false, rule(input));

    input.value = 'name@domain.com';
    assert.equal(true, rule(input));

    input.value = 'first.last@domain.com';
    assert.equal(true, rule(input));

    input.value = 'first.middle.last@domain.com';
    assert.equal(true, rule(input));

    input.value = 'first_last@domain.com';
    assert.equal(true, rule(input));

    input.value = 'first9last@domain.com';
    assert.equal(true, rule(input));

    input.value = 'name@sub.domain.com';
    assert.equal(true, rule(input));

    input.value = 'name@domain.com.br';
    assert.equal(true, rule(input));

    input.value = 'name@www2.domain.com';
    assert.equal(true, rule(input));

    input.value = 'first name@domain.com';
    assert.equal(false, rule(input));

    input.value = 'firstname@sub domain.com';
    assert.equal(false, rule(input));

    input.value = 'name@domain.domain';
    assert.equal(false, rule(input));

    input.value = 'name@domain.c9';
    assert.equal(false, rule(input));

    input.value = 'name@domain.cc';
    assert.equal(true, rule(input));

    input.value = 'name@domain.com ';
    assert.equal(false, rule(input));

    input.value = ' name@domain.com';
    assert.equal(false, rule(input));
});

QUnit.test('test rule alphanumeric', function (assert) {
    rule = validator.rule_alphanumeric;

    input.value = '';
    assert.equal(true, rule(input));

    input.value = 'abcd';
    assert.equal(true, rule(input));

    input.value = 'ab cd';
    assert.equal(false, rule(input));

    input.value = 'ab3d';
    assert.equal(true, rule(input));

    input.value = '1234';
    assert.equal(true, rule(input));

    input.value = 'abcçd';
    assert.equal(false, rule(input));

    input.value = 'ab$cd';
    assert.equal(false, rule(input));
});

QUnit.test('test rule alpha', function (assert) {
    rule = validator.rule_alpha;

    input.value = '';
    assert.equal(true, rule(input));

    input.value = 'abcd';
    assert.equal(true, rule(input));

    input.value = 'ab cd';
    assert.equal(false, rule(input));

    input.value = 'ab3d';
    assert.equal(false, rule(input));

    input.value = '1234';
    assert.equal(false, rule(input));

    input.value = 'abcçd';
    assert.equal(false, rule(input));

    input.value = 'ab$cd';
    assert.equal(false, rule(input));
});

QUnit.test('test rule min', function (assert) {
    rule = validator.rule_min;

    input.value = '';
    assert.equal(false, rule.call(validator, input, 10, {'numeric': true}));

    input.value = 5;
    assert.equal(false, rule.call(validator, input, 10, {'numeric': true}));

    input.value = 10;
    assert.equal(true, rule.call(validator, input, 10, {'numeric': true}));

    input.value = 100;
    assert.equal(true, rule.call(validator, input, 10, {'numeric': true}));
});

QUnit.test('test rule max', function (assert) {
    rule = validator.rule_max;

    input.value = '';
    assert.equal(false, rule.call(validator, input, 10, {'numeric': true}));

    input.value = 5;
    assert.equal(true, rule.call(validator, input, 10, {'numeric': true}));

    input.value = 10;
    assert.equal(true, rule.call(validator, input, 10, {'numeric': true}));

    input.value = 100;
    assert.equal(false, rule.call(validator, input, 10, {'numeric': true}));
});

QUnit.test('test rule checked', function (assert) {
    rule = validator.rule_checked;

    input.value = '';
    assert.equal(false, rule.call(validator, input, [1,10]));

    input.value = 5;
    assert.equal(false, rule.call(validator, input, [1,10]));
});