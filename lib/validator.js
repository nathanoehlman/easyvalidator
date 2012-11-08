var _ = require('lodash'),
    revalidator = require('revalidator'),
    formats = {
        url: { type: 'url' },
        email: { type: 'email' },
        ip: { type: 'ip-address' },
        ipv6: { type: 'ipv6' },
        datetime: { type: 'date-time' },
        date: { type: 'date' },
        time: { type: 'time' },
        color: { type: 'color' },
        hostname: { type: 'host-name' },
        utc: { type: 'utc-millisec' },
        regex: { type: 'regex' }
    };

function EasyValidator(fields) {    
    
    var validator = this;
    validator.properties = {};    
    _.each(fields, validator.add.bind(validator));
}

EasyValidator.prototype.validate = function(obj, opts) {  
    return revalidator.validate(obj, {properties: this.properties}, opts);    
}

EasyValidator.prototype.add = function(field) {
    this.properties[field] = {
        type: 'string',
        required: true
    };
    return this;
}

EasyValidator.prototype.format = function(field, format, opts) {
    if (!this.properties[field]) this.add(field);    
    this.properties[field]['format'] = format;
    if (opts) {
        this.properties[field] = _.extend(this.properties[field], opts);
    }
    return this;
}

// Bind convenience methods
_.each(formats, function(value, key) {
    EasyValidator.prototype[key] = function(field, format, opts) {
        return this.format(field, value.type, opts);
    };
});


module.exports = function(fields) {
    return new EasyValidator(fields);
}