/*jslint browser: true, devel: true, nomen: true */

/**
 * Validator
 * @param {object} form element
 * @param {object} messages
 * @param {function} onError
 * @param {function} onSuccess
 */
function Validator(form, messages, onError, onSuccess) {
    'use strict';

    this.errors = {};

    var defaultMessages = {
        afterDate: 'this date is invalid',
        alpha: 'this field must contain only letters',
        alphanumeric: 'this field must contain only letters or numbers',
        beforeDate: 'this date is invalid',
        checked: 'this field cannot be empty',
        cnpj: 'this is not a valid cnpj number',
        confirmed: 'this field is not confirmed',
        cpf: 'this is not a valid cpf number',
        digits: 'this field must be a digit',
        digitsBetween: 'this is not a valid number',
        email: 'this field must be an valid e-mail address',
        length: 'this field must be an specific length',
        min: 'this field is lower than allowed',
        max: 'this field is higher than allowed',
        notEmpty: 'this field cannot be empty',
        numeric: 'this field must be a number'
    };

    this._form = form;
    this._form.setAttribute('novalidate', 'novalidate');
    this._elements = [];
    this._messages = this._merge(defaultMessages, messages);
    this.onError = onError;
    this.onSuccess = onSuccess;
    this.debug = false;
}

/**
 * checks all rules and call the callbacks
 * @returns boolean
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
        allValid = true,
        storeGlobalErros = false;

    for (i = 0; i < numElements; i += 1) {
        element = elements[i];
        element.errors = {};
        element.isValid = true;
        storeGlobalErros = false;

        if (element.element.name.length) {
            this.errors[element.element.name] = {};
            storeGlobalErros = this.errors[element.element.name];
        }

        // validates if is filled or is required
        if (element.element.value.length || element.rules.hasOwnProperty('notEmpty')) {
            for (rule in element.rules) {
                if (element.rules.hasOwnProperty(rule)) {
                    if (typeof this['rule_' + rule] === 'function') {
                        valid = this['rule_' + rule](element.element, element.rules[rule], element.rules);

                        if (this.debug && valid) {
                            console.log('SUCCESS field ' + i + ' rule ' + rule + ' with value ' + element.element.value);
                        } else if (this.debug && !valid) {
                            console.log('ERROR field ' + i + ' rule ' + rule + ' with value ' + element.element.value);
                        }

                        if (!valid) {
                            element.errors[rule] = {
                                'message': this._messages[rule],
                                'rule': element.rules[rule]
                            };
                            element.isValid = false;
                            allValid = false;
                        }

                        if (storeGlobalErros && !valid) {
                            storeGlobalErros[rule] = this._messages[rule];
                        }
                    }
                }
            }
        }

        if (JSON.stringify(storeGlobalErros) === '{}') {
            delete this.errors[element.element.name];
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

    var elements = this._form.querySelectorAll('input, select, textarea'),
        i = 0,
        numElements = elements.length,
        element = {},
        name,
        names = {};

    // reset
    this._elements = [];

    for (i = 0; i < numElements; i += 1) {
        // Element name...
        name = elements[i].name;

        if (element.type === 'submit' || elements[i].name === '' || names.hasOwnProperty(name) ||
            elements[i].className.match(/\bnovalidate\b/)) {
            continue;
        }

        element = {
            element: elements[i],
            rules: this._extractRules(elements[i])
        };

        this._elements.push(element);
        names[name] = true;
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

/**
 *
 * @param {object} element
 * @returns {Validator.prototype@call;_merge}
 */
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
    }

    if (element.hasAttribute('required') && element.tagName !== 'select' &&
        element.type !== 'checkbox' &&  element.type !== 'radio') {
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
 * Similar a trim function of javascript.
 * @param str
 * @returns string
 * @private
 */
Validator.prototype._trim = function (str) {
    "use strict";

    if (typeof String.prototype.trim === 'function') {
        return str.trim();
    }

    return str.replace(/^\s+|\s+$/g, '');

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

    // Make trim in value.
    element.value = this._trim(element.value);

    return element.value.length === parseInt(length, 10);
};

/**
 * checks if element has value
 * @param {object} element
 * @returns {Boolean}
 */
Validator.prototype.rule_notEmpty = function (element) {
    'use strict';

    // Make trim in value.
    element.value = this._trim(element.value);

    return (element.value.length) ? true : false;
};

/**
 * checks if the value is a digit
 * @param {object} element
 * @returns {Boolean}
 */
Validator.prototype.rule_digits = function (element) {
    'use strict';

    var re = /^([0-9]){1,}$/;
    return re.test(element.value);
};

/**
 * check if the value have the number specify of digits.
 * Important: Define Min and Max, ever!
 * @param element
 * @param {array} range
 * @returns {boolean}
 */
Validator.prototype.rule_digitsBetween = function(element, range) {
    'use strict';

    var digits = element.value,
        clean = /[^\d]+/g,
        regexp = /^([0-9]){1,}$/,
        min = 1,
        max = min,
        length;

    // Clean the element
    digits = digits.replace(clean, '');

    // Check if array
    if (range instanceof Array) {
        min = range[0];
        max = range[1];

        // Display min error
        if (isNaN(min) || min.length === 0) {
            throw "ERROR (rule_min) | min MUST be a valid number";
        }

        // Display max error
        if (isNaN(max) || max.length === 0) {
            throw "ERROR (rule_max) | max MUST be a valid number";
        }

        // Define digits length...
        length = digits.length;

        // Check min and max
        if (min > max) {
            throw "ERROR (rule_max) | max MUST be equal or higher than min.";
        }

        // Compare...
        if (length < min || length > max) {
            return false;
        }

        // Return true if number of digits is ok!
        return regexp.test(digits);

    }

    throw "ERROR (range) | DEFINE the range.";

};

/**
 * checks if the value is numeric
 * Default is dot validation
 * Use: numeric:c for comma validation
 * @param {object} element
 * @param {string} type
 * @returns {Boolean}
 */
Validator.prototype.rule_numeric = function (element, type) {
    'use strict';

    var comma = /(^([0-9\.]){1,})(\,){0,1}([0-9]*){1}$/i,
        dot = /(^([0-9\,]){1,})(\.){0,1}([0-9]*){1}$/i;

    if (type instanceof Array) {
        type = type[0];
    }

    if (type === 'c') {
        return comma.test(element.value);
    }

    return dot.test(element.value);
};

/**
 * checks if the value is a valid email
 * @param {object} element
 * @returns {Boolean}
 */
Validator.prototype.rule_email = function (element) {
    'use strict';

    var re = /^([a-z0-9\._]){1,}@(([a-z0-9\._]{1,})\.){1,}([a-z]{2,3})$/i;
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
    if (!element.value.length) {
        return true;
    }
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
    if (!element.value.length) {
        return true;
    }
    return re.test(element.value);
};

/**
 * check if cpf is a valid number...
 * @param element
 * @returns {boolean}
 */
Validator.prototype.rule_cpf = function (element) {
    'use strict';

    var cpf = element.value,
        regexp = /[^\d]+/g,
        sum = 0,
        over,
        i = 0,
        j = 0;

    // Make trim in value.
    cpf = this._trim(cpf);

    // Remove cpf Mask!
    cpf = cpf.replace(regexp, '');

    // First validate invalid numbers...
    if (cpf.length != 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999"){
        return false;
    }

    // Checking first nine digits
    for (i; i < 9; i += 1) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    over = 11 - (sum % 11);

    if (over === 10 || over === 11) {
        over = 0;
    }

    if (over != parseInt(cpf.charAt(9))) {
        return false;
    }

    // Reset Sum...
    sum = 0;

    // Checking again...
    for (j; j < 10; j += 1) {
        sum += parseInt(cpf.charAt(j)) * (11 - j);
    }

    over = 11 - (sum % 11);

    if (over === 10 || over === 11) {
        over = 0;
    }

    // Checking the last digit..
    if (over !== parseInt(cpf.charAt(10))) {
        return false;
    }
    // Return true if number is ok!
    return true;

};

/**
 * check if cnpj number is valid
 * @param element
 * @returns {boolean}
 */
Validator.prototype.rule_cnpj = function (element) {
    'use strict';

    var cnpj = element.value,
        regexp = /[^\d]+/g,
        size = 12,
        position = (size - 7),
        sum = 0,
        numbers,
        digits,
        result,
        i;

    // Make trim in value.
    cnpj = this._trim(cnpj);

    // Remove CNPJ mask.
    cnpj = cnpj.replace(regexp, '');

    // Return false to knows errors
    if (cnpj.length != 14 ||
        cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999") {
        return false;
    }

    // Validate Digits
    numbers = cnpj.substring(0, size);
    digits = cnpj.substring(size);

    for (i = size; i >= 1; i -= 1) {
        sum += numbers.charAt(size - i) * position--;
        if (position < 2) {
            position = 9;
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;

    if (result != digits.charAt(0)) {
        return false;
    }

    // Redefine variables...
    size = size + 1;
    position = size - 7;
    numbers = cnpj.substring(0,size);
    sum = 0;

    for (i = size; i >= 1; i -= 1) {
        sum += numbers.charAt(size - i) * position--;
        if (position < 2) {
            position = 9;
        }
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    // Last verification...
    if (result != digits.charAt(1)) {
        return false;
    }
    // Return true if number is ok!
    return true;
};

/**
 * checks if elements value is euquals or greater than specified min
 * @param {object} element
 * @param {number} min
 * @param {object} rules
 * @returns {undefined}
 */
Validator.prototype.rule_min = function (element, min, rules) {
    'use strict';

    if (min instanceof Array) {
        min = min[0];
    }

    if (isNaN(min)) {
        throw "ERROR (rule_min) | min MUST be a number";
    }

    // String...
    element.value = this._trim(element.value);
    // Numeric...
    if (rules.hasOwnProperty('numeric')) {

        // Check the comma validation...
        if (rules.numeric[0] === 'c') {
            return parseFloat(element.value.replace(/,/, '.')) >= parseInt(min, 10);
        }

        return parseFloat(element.value) >= parseInt(min, 10);

    }

    return parseInt(element.value.length, 10) >= parseInt(min, 10);

};

/**
 * checks if elements value is euquals or minor than specified max
 * @param {object} element
 * @param {number} max
 * @param {object} rules
 * @returns {undefined}
 */
Validator.prototype.rule_max = function (element, max, rules) {
    'use strict';

    if (max instanceof Array) {
        max = max[0];
    }

    if (isNaN(max)) {
        throw "ERROR (rule_max) | max MUST be a number";
    }

    // String...
    element.value = this._trim(element.value);

    // Numeric...
    if (rules.hasOwnProperty('numeric')) {

        // Check the comma validation...
        if (rules.numeric[0] === 'c') {
            return parseFloat(element.value.replace(/,/, '.')) <= parseInt(max);
        }

        return parseFloat(element.value) <= parseInt(max);

    }

    return parseInt(element.value.length, 10) <= parseInt(max);
};


/**
 * Check if elements are be checked and compare total with min
 * and max value of checkeds. Use for checkbox and radio fields.
 * @param element
 * @param {array} range
 */
Validator.prototype.rule_checked = function (element, range) {
    'use strict';

    var total = this._form.querySelectorAll('input[name="' + element.name + '"]:checked').length,
        min = 1,
        max = 0;

    // Check if array
    if (range instanceof Array) {
        min = (range[0]) ? parseInt(range[0]) : 0;
        max = (range[1]) ? parseInt(range[1]) : 0;
    }

    // Display min error
    if (isNaN(min)) {
        throw "ERROR (rule_min) | min MUST be a number";
    }

    // Display max error
    if (isNaN(max)) {
        throw "ERROR (rule_max) | max MUST be a number";
    }

    // Check if values are set correctly
    if (max > 0 && min > max) {
        throw "ERROR (rule_min) | min MUST be small than max";
    }

    // Check min...
    if (total < min) {
        return false;
    }

    // Check max...
    if (max > 0 && total > max) {
        return false;
    }

    // If everything is fine!
    return true;
};
