function Validator(e,t,r,i){"use strict";this.errors={};var a={afterDate:"this date is invalid",alpha:"this field must contain only letters",alphanumeric:"this field must contain only letters or numbers",beforeDate:"this date is invalid",checked:"this field cannot be empty",cnpj:"this is not a valid cnpj number",confirmed:"this field is not confirmed",cpf:"this is not a valid cpf number",digits:"this field must be a digit",digitsBetween:"this is not a valid number",email:"this field must be an valid e-mail address",length:"this field must be an specific length",min:"this field is lower than allowed",max:"this field is higher than allowed",notEmpty:"this field cannot be empty",numeric:"this field must be a number"};this._form=e,this._form.setAttribute("novalidate","novalidate"),this._elements=[],this._messages=this._merge(a,t),this.onError=r,this.onSuccess=i,this.debug=!1}Validator.prototype.validate=function(){"use strict";this._setupRules();var e=0,t=0,r=this._elements,i=null,a=!0,n=r.length,s=!0,l=!1;for(e;n>e;e+=1){if(i=r[e],i.errors={},i.isValid=!0,l=!1,i.element.name.length&&(this.errors[i.element.name]={},l=this.errors[i.element.name]),i.element.value.length||i.rules.hasOwnProperty("notEmpty"))for(t in i.rules)i.rules.hasOwnProperty(t)&&"function"==typeof this["rule_"+t]&&(a=this["rule_"+t](i.element,i.rules[t],i.rules),this.debug&&a?console.log("SUCCESS field "+e+" rule "+t+" with value "+i.element.value):this.debug&&!a&&console.log("ERROR field "+e+" rule "+t+" with value "+i.element.value),a||(i.errors[t]={message:this._messages[t],rule:i.rules[t]},i.isValid=!1,s=!1),l&&!a&&(l[t]=this._messages[t]));"{}"===JSON.stringify(l)&&delete this.errors[i.element.name],i.isValid||"function"!=typeof this.onError?i.isValid&&"function"==typeof this.onSuccess&&this.onSuccess.call(i.element):this.onError.call(i.element,i.errors)}return s},Validator.prototype._setupRules=function(){"use strict";var e,t=this._form.querySelectorAll("input, select, textarea"),r=0,i=t.length,a={},n={};for(this._elements=[],r;i>r;r+=1)e=t[r].name,"submit"===a.type||""===t[r].name||n.hasOwnProperty(e)||(a={element:t[r],rules:this._extractRules(t[r])},this._elements.push(a),n[e]=!0)},Validator.prototype._merge=function(e,t){"use strict";var r={},i=0;for(i in e)e.hasOwnProperty(i)&&(r[i]=e[i]);for(i in t)t.hasOwnProperty(i)&&(r[i]=t[i]);return r},Validator.prototype._extractRules=function(e){"use strict";var t="",r={},i={},a=0,n="",s="";switch(e.type){case"email":i.email=!0}if(e.hasAttribute("required")&&"select"!==e.tagName&&"checkbox"!==e.type&&"radio"!==e.type&&(i.notEmpty=!0),e.hasAttribute("data-validation"))for(t=e.getAttribute("data-validation").split("|"),a;a<t.length;a+=1)t[a]=t[a].split(":"),n=t[a][0],s=void 0!==t[a][1]?t[a][1].split(","):!0,r[n]=s;return this._merge(i,r)},Validator.prototype._trim=function(e){"use strict";return"function"==typeof String.prototype.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},Validator.prototype.rule_length=function(e,t){"use strict";if(t instanceof Array&&(t=t[0]),isNaN(t))throw"ERROR (rule_length) | args[0] MUST be a number";return e.value=this._trim(e.value),e.value.length===parseInt(t,10)},Validator.prototype.rule_notEmpty=function(e){"use strict";return e.value=this._trim(e.value),e.value.length?!0:!1},Validator.prototype.rule_digits=function(e){"use strict";var t=/^([0-9]){1,}$/;return t.test(e.value)},Validator.prototype.rule_digitsBetween=function(e,t){"use strict";var r,i=e.value,a=/[^\d]+/g,n=/^([0-9]){1,}$/,s=1,l=s;if(i=i.replace(a,""),t instanceof Array){if(s=t[0],l=t[1],isNaN(s)||0===s.length)throw"ERROR (rule_min) | min MUST be a valid number";if(isNaN(l)||0===l.length)throw"ERROR (rule_max) | max MUST be a valid number";if(r=i.length,s>l)throw"ERROR (rule_max) | max MUST be equal or higher than min.";return s>r||r>l?!1:n.test(i)}throw"ERROR (range) | DEFINE the range."},Validator.prototype.rule_numeric=function(e,t){"use strict";var r=/(^([0-9\.]){1,})(\,){0,1}([0-9]*){1}$/i,i=/(^([0-9\,]){1,})(\.){0,1}([0-9]*){1}$/i;return t instanceof Array&&(t=t[0]),"c"===t?r.test(e.value):i.test(e.value)},Validator.prototype.rule_email=function(e){"use strict";var t=/^([a-z0-9\._]){1,}@(([a-z0-9\._]{1,})\.){1,}([a-z]{2,3})$/i;return t.test(e.value)},Validator.prototype.rule_alphanumeric=function(e){"use strict";var t=/^[a-z0-9]+$/i;return e.value.length?t.test(e.value):!0},Validator.prototype.rule_alpha=function(e){"use strict";var t=/^[a-z]+$/i;return e.value.length?t.test(e.value):!0},Validator.prototype.rule_cpf=function(e){"use strict";var t,r=e.value,i=/[^\d]+/g,a=0,n=0,s=0;if(r=this._trim(r),r=r.replace(i,""),11!=r.length||"00000000000"===r||"11111111111"===r||"22222222222"===r||"33333333333"===r||"44444444444"===r||"55555555555"===r||"66666666666"===r||"77777777777"===r||"88888888888"===r||"99999999999"===r)return!1;for(n;9>n;n+=1)a+=parseInt(r.charAt(n))*(10-n);if(t=11-a%11,(10===t||11===t)&&(t=0),t!=parseInt(r.charAt(9)))return!1;for(a=0,s;10>s;s+=1)a+=parseInt(r.charAt(s))*(11-s);return t=11-a%11,(10===t||11===t)&&(t=0),t!==parseInt(r.charAt(10))?!1:!0},Validator.prototype.rule_cnpj=function(e){"use strict";var t,r,i,a,n=e.value,s=/[^\d]+/g,l=12,u=l-7,o=0;if(n=this._trim(n),n=n.replace(s,""),14!=n.length||"00000000000000"==n||"11111111111111"==n||"22222222222222"==n||"33333333333333"==n||"44444444444444"==n||"55555555555555"==n||"66666666666666"==n||"77777777777777"==n||"88888888888888"==n||"99999999999999"==n)return!1;for(t=n.substring(0,l),r=n.substring(l),a=l;a>=1;a-=1)o+=t.charAt(l-a)*u--,2>u&&(u=9);if(i=2>o%11?0:11-o%11,i!=r.charAt(0))return!1;for(l+=1,u=l-7,t=n.substring(0,l),o=0,a=l;a>=1;a-=1)o+=t.charAt(l-a)*u--,2>u&&(u=9);return i=2>o%11?0:11-o%11,i!=r.charAt(1)?!1:!0},Validator.prototype.rule_min=function(e,t,r){"use strict";if(t instanceof Array&&(t=t[0]),isNaN(t))throw"ERROR (rule_min) | min MUST be a number";return e.value=this._trim(e.value),r.hasOwnProperty("numeric")?this.rule_numeric(e)?"c"===r.numeric[0]?parseFloat(e.value.replace(/,/,"."))>=parseInt(t,10):parseFloat(e.value)>=parseInt(t,10):!1:parseInt(e.value.length,10)>=parseInt(t,10)},Validator.prototype.rule_max=function(e,t,r){"use strict";if(t instanceof Array&&(t=t[0]),isNaN(t))throw"ERROR (rule_max) | max MUST be a number";return e.value=this._trim(e.value),r.hasOwnProperty("numeric")?this.rule_numeric(e)?"c"===r.numeric[0]?parseFloat(e.value.replace(/,/,"."))<=parseInt(t):parseFloat(e.value)<=parseInt(t):!1:parseInt(e.value.length,10)<=parseInt(t)},Validator.prototype.rule_checked=function(e,t){"use strict";var r=this._form.querySelectorAll('input[name="'+e.name+'"]:checked').length,i=1,a=0;if(t instanceof Array&&(i=t[0]?parseInt(t[0]):0,a=t[1]?parseInt(t[1]):0),isNaN(i))throw"ERROR (rule_min) | min MUST be a number";if(isNaN(a))throw"ERROR (rule_max) | max MUST be a number";if(a>0&&i>a)throw"ERROR (rule_min) | min MUST be small than max";return i>r?!1:a>0&&r>a?!1:!0};