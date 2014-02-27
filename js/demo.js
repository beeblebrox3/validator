var handleWithErrors = function (errors) {
    this.classList.remove('success');
    this.classList.add('error');
};

var handleWithSuccess = function () {
    this.classList.remove('error');
    this.classList.addClass('success');
};

var form = document.forms[0];
var validation = new Validator(form, {}, handleWithErrors, handleWithSuccess);

form.onsubmit = function () {
    validation.validate();
    
    return false;
}