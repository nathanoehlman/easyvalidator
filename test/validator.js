var should = require('chai').should(),
    easyvalidator = require('..');

describe('Easy validator', function() {
    
    it('should be able to create a simple validator', function(done) {
        
        var validator = easyvalidator(['name', 'description']),
            obj = {name: 'test'},
            result = validator.validate(obj);
        
        result.valid.should.equal(false);
        result.errors[0].should.have.property('attribute', 'required');
        result.errors[0].should.have.property('property', 'description');
        result.errors.length.should.equal(1);        
        done();
        
    });
    
    
    it('should be able to chain formats', function(done) {
        
        var validator = easyvalidator(['name']).email('email').add('description'),
            obj = { name: 'test', email: '123123'},
            result = validator.validate(obj);
        
        result.valid.should.equal(false);
        result.errors[0].should.have.property('attribute', 'format');
        result.errors[0].should.have.property('property', 'email');
        result.errors.length.should.equal(2);
        
        done();
    });
});