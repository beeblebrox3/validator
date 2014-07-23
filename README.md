Validator
=========

This is a simple JavaScript tool to validate forms without use any other library/framework.

  - Support IE8+;
  - Only Javascript;
  - Many ways of validation;
  - You decide how show error messages;
  - Customize message errors.

**Important Note:**

  - All fields with validation have needs a name.


Installation
--------------
Only include the file on bottom of your page:

```html
<script type="text/javascript" src="validator.js"></script>
```

Call the function when your form submit:
```js
var form = document.forms[0],
	validator = new Validator(form, {}, 'error', 'success');

form.onsubmit = function () {
	validator.validate();
}
```

Function Validator
--------------------

```js
Validator(form, {}, 'error', 'success');
```

* First option is the form element;
* Second option are an object with the customized error messages;

    ```json
        Ex: {
            afterDate: 'Change the original message.',
            alpha: 'Change the original message.',
            alphanumeric: 'Change the original message.',
            beforeDate: 'Change the original message.',
            checked: 'Change the original message.',
            cnpj: 'Change the original message.',
            confirmed: 'Change the original message.',
            cpf: 'Change the original message.',
            digits: 'Change the original message.',
            digitsBetween: 'Change the original message.',
            email: 'Change the original message.',
            length: 'Change the original message.',
            min: 'Change the original message.',
            max: 'Change the original message.',
            notEmpty: 'Change the original message.',
            numeric: 'Change the original message.'*
        }
    ```
* Third option is the callback error;
* Fourth option is the callback success;


Usage
-------

#### Required Field:
Just include the required="required" in your input (works in input, textarea and select). You can use this option combine with all others.

```html
<input type="text" name="input_name" required="required" value="Your Text Here" />

<textarea name="textarea_name" required="required">Your Text Here</textarea>

<select name="select_name" required="required">
  <option></option>
  <option value="001">Option 001</option>
  <option value="002">Option 002</option>
  <option value="003">Option 003</option>
</select>
```

----------

#### Text length:
You can define how many words the user can be write in your field text. The exact amount, the minimum and maximum.

Must have 3 caracters:

```html
<input type="text" name="input_name" data-validation="length:3" value="Your Text Here" />
```

Min = 5 and Max = 10:

```html
<input type="text" name="input_name" data-validation="min:5|max:10" value="Your Text Here" />

<textarea name="textarea_name" data-validation="min:5|max:10">Your Text Here</textarea>
```

----------

#### Digits Field:
This validation accepts only digits numbers, no decimal number. Your field can be a type text or number, it's your decision.
	
* Ex: value="200" return true;
* Ex: value="200.20" return false;
* Ex: value="100,51" return false;

```html
<input type="number" name="input_name" data-validation="digits" value="200" />
```

You can define the minimum and the maximum digits accepts, example:

```html
<input type="number" name="input_name" data-validation="digits|min:5|max:10" value="8" />
```

----------

#### Digits Between Field:
This validation accepts characters and numbers, however, when validate it will only count the numbers and ignore the rest. You need specify minimun value, however use data-validation="digits". Your field can be a type text or number, it's your decision. See the examples:

* Ex: digitsBetween:10 => accepts minimun 10 numbers (ignoring the others caracters);
* Ex: digitsBetween:10,50 => accepts minimun 10 numbers and maximum 50 numbers (ignoring the others caracters);

```html
<input type="text" name="input_name" data-validation="digitsBetween:8" value="65.903-040" />

<input type="number" name="input_name" data-validation="digitsBetween:10,50" value="1234567890" />
```

You can use to validade phone numbers and zip-codes or others necessities, if you have.

----------

#### Numeric Field:
This validation accepts only numbers, with decimal or not. You can define, if you want, how the validation works, if comma separation or dot. See the examples:

* Ex: numeric => Use the default validation (1000.50). This validation accepts "1,000.50".
* Ex: numeric:c => Use the comma validation (1000,50). This validation accepts "1.000,50".

```html
<input type="text" name="input_name" data-validation="numeric" value="1,000.50" />

<input type="text" name="input_name" data-validation="numeric:c" value="1.000,50" />
```

**Obs: Don't use type="number" with this validation. Your navigator can be distort the float validation.**

----------

You can use this combined with minimum (min) and maximum (max) validation and validate if a number is in a range.

```html
<input type="text" name="input_name" data-validation="numeric|min:10" value="22" />

<input type="text" name="input_name" data-validation="numeric|min:10|max:50" value="33" />

<input type="text" name="input_name" data-validation="numeric|max:50" value="50.01" />

<input type="text" name="input_name" data-validation="numeric:c|max:50" value="50,01" />
```

----------

#### Email Field:
This validation accepts type="email" and data-validation="email". This will validate if a e-mail address is valid or not.

```html
<input type="email" name="input_name" value="example@yourdomain.com" />

<input type="text" name="input_name" data-validation="email" value="example@yourdomain.com" />
```

----------

#### CNPJ Field:
This validation, common among Brazilians developers, validates if a CNPJ number is valid and correct when doing the calculation. This validation accepts fields with mask or not.

```html
<input type="text" name="input_name" data-validation="cnpj" value="56.855.350/0001-94" />

<input type="text" name="input_name" data-validation="cnpj" value="56855350000194" />
```

----------

#### CPF Field:
This validation, common among Brazilians developers, validates if a CPF number is valid and correct when doing the calculation. This validation accepts fields with mask or not.

```html
<input type="text" name="input_name" data-validation="cnpj" value="123.456.789-09" />

<input type="text" name="input_name" data-validation="cnpj" value="12345678909" />
```

----------

#### Radio Field:
This validation checks if radio field is checked or not. By including this validation, the function will assume that is a required field. If not is a required field, don't include data-validation="checked".

```html
<input type="radio" name="input_name" data-validation="checked" value="001"><label>Value 001</label>
<input type="radio" name="input_name" data-validation="checked" value="002"><label>Value 002</label>
<input type="radio" name="input_name" data-validation="checked" value="003"><label>Value 003</label>
<input type="radio" name="input_name" data-validation="checked" value="004"><label>Value 004</label>
<input type="radio" name="input_name" data-validation="checked" value="005"><label>Value 005</label>
```

----------

#### Checkbox Field:
This validation checks if a checkbox field is checked or not. By including this validation, the function will assume that is a required field. If not is a required field, don't include data-validation="checked". You can define, however, how many checkbox will need's be checked to make this a valid field.

```html
<input type="checkbox" name="input_name" data-validation="checked" value="001"><label>Value 001</label>
```

In this particular case it is necessary to score at least 1 and at most 3 checkboxs. You can define that rule only in firts field, if you want.
```html
<input type="checkbox" name="input_name" data-validation="checked:1,3" value="001"><label>Value 001</label>
<input type="checkbox" name="input_name" data-validation="checked" value="002"><label>Value 002</label>
<input type="checkbox" name="input_name" data-validation="checked" value="003"><label>Value 003</label>
<input type="checkbox" name="input_name" data-validation="checked" value="004"><label>Value 004</label>
<input type="checkbox" name="input_name" data-validation="checked" value="005"><label>Value 005</label>
```

License
--------
[MIT/GPL2 Licensed][1]


  [1]: http://en.wikipedia.org/wiki/MIT_License