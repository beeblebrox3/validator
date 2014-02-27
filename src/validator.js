/*jslint nomen: true */

/**
 * Validator
 * @param {object} form
 * @param {object} messages
 * @param {function} onError
 * @returns {Validator}
 */
function Validator(form, messages, onError, onSuccess) {
    'use strict';

    this.errors = {};

    var defaultMessages = {
        notEmpty: 'this field cannot be empty',
        numeric: 'this field must be a number',
        email: 'this field must be an valid e-mail address',
        afterDate: 'this date is invalid',
        beforeDate: 'this date is invalid',
        alphanumeric: 'this field must contain only letters or numbers',
        alpha: 'this field must contain only letters',
        confirmed: 'this field is not confirmed',
        min: 'this field is lower than allowed',
        max: 'this field is higher than allowed'
    };

    this._form = form;
    this._elements = [];
    this._messages = this._merge(defaultMessages, messages);
    this.onError = onError;
    this.onSuccess = onSuccess;
    this.debug = false;
}

/**
 * checks all rules and call the callbacks :D
 * @returns {undefined}
 */
Validator.prototype.validate = function () {
    'use strict';

    this._setupRules();

    var i = 0,
        rule = 0,
        elements = this._elements,
        element = null,
        valid = true,
        numElements = elements.length,
        allValid = true;

    for (i = 0; i < numElements; i += 1) {
        element = elements[i];
        element.errors = {};
        element.isValid = true;

        for (rule in element.rules) {
            if (element.rules.hasOwnProperty(rule)) {
                if (typeof this['rule_' + rule] === 'function') {
                    valid = this['rule_' + rule](element.element, element.rules[rule]);

                    if (this.debug && valid) {
                        console.log('SUCCESS field ' + i + ' rule ' + rule + ' with value ' + element.element.value);
                    } else if (this.debug && !valid) {
                        console.log('ERROR field ' + i + ' rule ' + rule + ' with value ' + element.element.value);
                    }

                    if (!valid) {
                        element.errors[rule] = this._messages[rule];
                        element.isValid = false;
                        allValid = false;
                    }
                }
            }
        }

        if (!element.isValid && typeof this.onError === 'function') {
            this.onError.call(element.element, element.errors);
        } else if (element.isValid && typeof this.onSuccess === 'function') {
            this.onSuccess.call(element.element);
        }
    }

    return allValid;
};

/**
 * Analyse the form's elements for get the validation rules
 */
Validator.prototype._setupRules = function () {
    'use strict';

    var elements = this._form.querySelectorAll('input:not([type="submit"])'),
        i = 0,
        numElements = elements.length,
        element = {};

    // reset
    this._elements = [];

    for (i = 0; i < numElements; i += 1) {
        element = {
            element: elements[i],
            rules: this._extractRules(elements[i])
        };
        this._elements.push(element);
    }
};

/**
 * merges obj_a with obj_b
 * @param  {Object} obj_a source object
 * @param  {Object} obj_b new data
 * @return {Object}
 */
Validator.prototype._merge = function (obj_a, obj_b) {
    'use strict';

    var response = {},
        i = 0;

    for (i in obj_a) {
        if (obj_a.hasOwnProperty(i)) {
            response[i] = obj_a[i];
        }
    }

    for (i in obj_b) {
        if (obj_b.hasOwnProperty(i)) {
            response[i] = obj_b[i];
        }
    }

    return response;
};

Validator.prototype._extractRules = function (element) {
    'use strict';

    var custom_rules_txt = '',
        custom_rules = {},
        html_rules = {},
        i = 0,
        ruleName = '',
        ruleValues = '';

    // get html_rules
    switch (element.type) {
    case 'email':
        html_rules.email = true;
        break;
    case 'date':
        html_rules.date = true;
        break;
    case 'datetime':
        html_rules.datetime = true;
        break;
    case 'number':
        html_rules.numeric = true;
        break;
    }

    if (element.hasAttribute('required')) {
        html_rules.notEmpty = true;
    }

    // get custom rules
    if (element.hasAttribute('data-validation')) {
        custom_rules_txt = element.getAttribute('data-validation').split('|');

        for (i = 0; i < custom_rules_txt.length; i += 1) {
            custom_rules_txt[i] = custom_rules_txt[i].split(':');
            ruleName = custom_rules_txt[i][0];
            ruleValues = (custom_rules_txt[i][1] !== undefined) ? custom_rules_txt[i][1].split(',') : true;

            custom_rules[ruleName] = ruleValues;
        }
    }

    return this._merge(html_rules, custom_rules);
};

/**
 * checks if value of element is equals args
 * if args is an array, the method will use only the first position
 * @param {object} element
 * @param {mixed} length
 * @returns {Boolean}
 */
Validator.prototype.rule_length = function (element, length) {
    'use strict';

    if (length instanceof Array) {
        length = length[0];
    }

    if (isNaN(length)) {
        throw "ERROR (rule_length) | args[0] MUST be a number";
    }

    return element.value.length === parseInt(length, 10);
};

/**
 * checks if element has value
 * @param {object} element
 * @returns {Boolean}
 */
Validator.prototype.rule_notEmpty = function (element) {
    'use strict';
    return (element.value.length) ? true : false;
};

/**
 * checks if the value is numeric
 * @param {object} element
 * @returns {Boolean}
 */
Validator.prototype.rule_numeric = function (element) {
    'use strict';
    return !isNaN(element.value);
};

/**
 * checks if the value is an valid email
 * @param {object} element
 * @returns {Boolean}
 */
Validator.prototype.rule_email = function (element) {
    'use strict';
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(element.value);
};

/**
 * checks if the value is alphanumeric
 * @param {object} element
 * @returns {Boolean}
 */
Validator.prototype.rule_alphanumeric = function (element) {
    'use strict';

    var re = /^[a-z0-9]+$/i;
    return re.test(element.value);
};

/**
 * checks if value has only letters
 * @param {object} element
 * @returns {Boolean}
 */
Validator.prototype.rule_alpha = function (element) {
    'use strict';

    var re = /^[a-z]+$/i;
    return re.test(element.value);
};

/**
 * checks if elements value is euquals or greater than specified min
 * @param {object} element
 * @param {number} min
 * @returns {undefined}
 */
Validator.prototype.rule_min = function (element, min) {
    'use strict';

    if (min instanceof Array) {
        min = min[0];
    }

    if (isNaN(min)) {
        throw "ERROR (rule_min) | min MUST be a number";
    }

    if (!this.rule_numeric(element)) {
        return false;
    }

    return parseInt(element.value, 10) >= min;
};

/**
 * checks if elements value is euquals or minor than specified max
 * @param {object} element
 * @param {number} max
 * @returns {undefined}
 */
Validator.prototype.rule_max = function (element, max) {
    'use strict';

    if (max instanceof Array) {
        max = max[0];
    }

    if (isNaN(max)) {
        throw "ERROR (rule_max) | max MUST be a number";
    }

    if (!this.rule_numeric(element)) {
        return false;
    }

    return parseInt(element.value, 10) <= max;
};