# Validator

![enter image description here](https://travis-ci.org/beeblebrox3/validator.svg)

## Summary
This is a simple JavaScript tool to validate forms without use any other library/framework.

## Example
This package use some of the HTML default attributes to create validation and add the `data-validation` to allow you to specify custom rules.

Let's create a simple form to understand how to use it.

```html
<form>
	<label for="name">Name</label>
	<input type="text" name="name" id="name" required />
	
	<label for="email">Email</label>
	<input type="email" name="email" id="email" required />

	<label for="username">Username</label>
	<input type="text" name="username" id="username" required data-validation="alphanumeric" />
		
	<input type="submit" value="signup" />
</form>
```

On this markup, we use `required` and `type` attributes to define some validation rules and the `data-validation` to a custom one. Now we need some JS code to do the validation on form submission.

```javascript
var form = document.forms[0];
var validator = new Validator(form);

form.onsubmit = function () {
	if (validator.validate()) {
	    alert('Form valid :)');
	} else {
	    alert('Form invalid :(');
	    return false;
	}
}
```
We create an instance of `Validator` and pass to it the form that we want to validate. When the form is submitted we call the `validate()` method to determine if data is or isn't valid and take the appropriate actions.

### Callbacks
You can specify what to do when a field is valid or invalid after validation. Let's change the previous code to add classes that indicate the state of the fields after validation.

```javascript
var form = document.forms[0];
var validator = new Validator(form, {}, function () {
	this.classList.add('invalid');
	this.classList.remove('valid');
}, function () {
	this.classList.add('valid');
	this.classList.remove('invalid');
});

form.onsubmit = function () {
	if (validator.validate()) {
	    alert('Form valid :)');
	} else {
	    alert('Form invalid :(');
	    return false;
	}
}
```

The code is almost the same as before, but when we create the `Validator` instance, we supply two functions as third and fourth parameter. The third parameter is a callback when the field is invalid. The fourth is called  when the field is valid.

## API
### Constructor
> `new Validator(form, messages, onError, onSuccess);`

#### Arguments
Name | Type | Default value | Description
---|---|---|---
form (required)| Element | | The form that will be validated. <br />*Example:* `document.forms[0]`
messages | object | {} | Validation rules can have messages to indicate users what is wrong. The messages argument allow you to customize those messages. The keys of the object are the names of the rules and the value is the messages itself.
onError | function | | Called when a field is invalid.<br />The `this` object will be the invalid `Element` (like an input).<br /> One argument is passed, called errors. Is an object and the keys are the name of the rules that broke. The values are objects with the properties `message` and `rule`, which are the message of the specific rule and the specification of the rule (it's arguments) respectively. 
onSuccess | function | | Called when a field is valid.<br />The `this` object will be the valid `Element` (like an input).

### Methods
#### validate
This method checks the form and validates all the field that have rules. Returns a boolean.

### Default rules

> **Important:** `value` is always trimmed before validation!

#### length
Checks if `value` has the specified length.

- **Usage**: `data-validation="length:min"`
- **Arguments**: `min` {integer}
- **Example**: `data-validation="length:10"` (string with 10 characters)

#### notEmpty
Checks if `value` has at least one character. 

- **Usage**: `data-validation="notEmpty"` or use the `required` HTML attribute

#### digits
Checks if `value` has only digits. 

- **Usage**: `data-validation="digits"`

#### digitsBetween
Checks if `value` has only digits and the length is between the specified values

- **Usage**: `data-validation="digitsBetween:min,max"`
- **Arguments**: `min` {integer}, `max` {integer}
- **Example**: `data-validation="digitsBetween:4|10"` (string with only digits and length between 4 and 10)

#### numeric
Checks if `value` is numeric. Accepts decimals too.

- **Usage**: `data-validation="numeric:type"`
- **Arguments**: `type` {char} (`c` for comma or `d` to dot to separate decimals. Default value is `d`)
- **Example**: `data-validation="numeric:c"` (numeric with comma to separate decimals)

#### email
Checks if `value` is a valid email

- **Usage**: `data-validation="email"` or `<input type="email" />`

#### alphanumeric
Checks if `value` has only letters and numbers. 

- **Usage**: `data-validation="alphanumeric`

#### alpha
Checks if `value` has only letters. 

- **Usage**: `data-validation="alpha"`

#### cpf
Checks if `value`is a valid CPF number.

- **Usage**: `data-validation="cpf"`

#### cnpj
Checks if `value` if a valid CNPJ number.

- **Usage**: `data-validation="cnpj"`

#### min
Checks if `value` is greater tham specified. If the input has to be a number (using rule numeric) the value will be compared. If is a string, the length will be compared.

- **Usage**: `data-validation="min:min"`
- **Arguments**: `min` {integer}
- **Example**: `data-validation="numeric|min:10"` (an integer bigger than 10)

#### max
Checks if `value` is greater than specified. If the input has to be a number (using rule numeric) the value will be compared. If is a string, the length will be compared.

- **Usage**: `data-validation="max:max"`
- **Arguments**: `max` {integer}
- **Example**: `data-validation="numeric|max:10"` (an integer minor than 10)

#### checked
This rule must be used with checkboxes. Given a collection of checkboxes with the same name, this rule will check if the specified amount of them are checked.

- **Usage**: `data-validation="checked:min,max"`
- **Arguments**: `min` {integer} (the minimum amount of checked elements), `max`{integer} (the maximum amount of checked elements. Must be grater than *min*)
- **Example**: `data-validation="checked:1,3"` (at least one and up to three checked)

### Creating custom rules
You can create your own rules using the Validator prototype.
Let's create a rule that checks if the value of the input is equal to some other provided value.

```javascript
Validator.prototype.rule_stringEquals(element, compareTo) {
	'use strict';
	
	return element.value === compareTo;
}
```

```html
<input type="text" data-validation="stringEquals:bola" />
```

On this example, the input will be valid only if the value is **bola**.

> The validation rule must be prefixed with `rule_`. 

The first parameter is the element to be validated. The second is the list of arguments (`Array`).


----------


> Written with [StackEdit](https://stackedit.io/).