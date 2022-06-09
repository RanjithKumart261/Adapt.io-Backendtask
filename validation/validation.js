const Joi = require('joi');

module.exports = {
    
    registerValidation(data){
        const schema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().min(6).required()
        })
        return schema.validate(data);
    },

    loginValidation(data){
        const schema = Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().min(6).required()
        })
        return schema.validate(data);
    },

    taskValidation(data){
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            status: Joi.string().required(),            
        })
        return schema.validate(data);
    }
}