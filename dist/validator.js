function Validator(t,e,r,i){"use strict";this.errors={};var a={notEmpty:"this field cannot be empty",numeric:"this field must be a number",email:"this field must be an valid e-mail address",afterDate:"this date is invalid",beforeDate:"this date is invalid",alphanumeric:"this field must contain only letters or numbers",alpha:"this field must contain only letters",confirmed:"this field is not confirmed",min:"this field is lower than allowed",max:"this field is higher than allowed"};this._form=t,this._form.setAttribute("novalidate","novalidate"),this._elements=[],this._messages=this._merge(a,e),this.onError=r,this.onSuccess=i,this.debug=!1}Validator.prototype.validate=function(){"use strict";this._setupRules();var t=0,e=0,r=this._elements,i=null,a=!0,s=r.length,n=!0;for(t=0;s>t;t+=1){if(i=r[t],i.errors={},i.isValid=!0,i.element.value.length||i.rules.hasOwnProperty("notEmpty"))for(e in i.rules)i.rules.hasOwnProperty(e)&&"function"==typeof this["rule_"+e]&&(a=this["rule_"+e](i.element,i.rules[e]),this.debug&&a?console.log("SUCCESS field "+t+" rule "+e+" with value "+i.element.value):this.debug&&!a&&console.log("ERROR field "+t+" rule "+e+" with value "+i.element.value),a||(i.errors[e]=this._messages[e],i.isValid=!1,n=!1));i.isValid||"function"!=typeof this.onError?i.isValid&&"function"==typeof this.onSuccess&&this.onSuccess.call(i.element):this.onError.call(i.element,i.errors)}return n},Validator.prototype._setupRules=function(){"use strict";var t=this._form.querySelectorAll("input"),e=0,r=t.length,i={};for(this._elements=[],e=0;r>e;e+=1)"submit"!=i.type&&(i={element:t[e],rules:this._extractRules(t[e])},this._elements.push(i))},Validator.prototype._merge=function(t,e){"use strict";var r={},i=0;for(i in t)t.hasOwnProperty(i)&&(r[i]=t[i]);for(i in e)e.hasOwnProperty(i)&&(r[i]=e[i]);return r},Validator.prototype._extractRules=function(t){"use strict";var e="",r={},i={},a=0,s="",n="";switch(t.type){case"email":i.email=!0;break;case"date":i.date=!0;break;case"datetime":i.datetime=!0;break;case"number":i.numeric=!0}if(t.hasAttribute("required")&&(i.notEmpty=!0),t.hasAttribute("data-validation"))for(e=t.getAttribute("data-validation").split("|"),a=0;a<e.length;a+=1)e[a]=e[a].split(":"),s=e[a][0],n=void 0!==e[a][1]?e[a][1].split(","):!0,r[s]=n;return this._merge(i,r)},Validator.prototype.rule_length=function(t,e){"use strict";if(e instanceof Array&&(e=e[0]),isNaN(e))throw"ERROR (rule_length) | args[0] MUST be a number";return t.value.length===parseInt(e,10)},Validator.prototype.rule_notEmpty=function(t){"use strict";return t.value.length?!0:!1},Validator.prototype.rule_numeric=function(t){"use strict";var e=/^([0-9]){1,}$/;return e.test(t.value)},Validator.prototype.rule_email=function(t){"use strict";var e=/^([a-z0-9\.]){1,}@([a-z0-9]){1,}\.([a-z0-9]){2,3}$/i;return e.test(t.value)},Validator.prototype.rule_alphanumeric=function(t){"use strict";var e=/^[a-z0-9]+$/i;return e.test(t.value)},Validator.prototype.rule_alpha=function(t){"use strict";var e=/^[a-z]+$/i;return e.test(t.value)},Validator.prototype.rule_min=function(t,e){"use strict";if(e instanceof Array&&(e=e[0]),isNaN(e))throw"ERROR (rule_min) | min MUST be a number";return this.rule_numeric(t)?parseInt(t.value,10)>=e:!1},Validator.prototype.rule_max=function(t,e){"use strict";if(e instanceof Array&&(e=e[0]),isNaN(e))throw"ERROR (rule_max) | max MUST be a number";return this.rule_numeric(t)?parseInt(t.value,10)<=e:!1};