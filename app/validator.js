const jsonschema = require('jsonschema');

module.exports = {
    validateEvent: function (event) {
        var validator = new jsonschema.Validator();
        var timestampInMilli = Date.now();
        var deltaInMilli = 60 * 1000;

        var schema = {
            "type": "object",
            "properties": {
                "userid": { "type": "string" },
                "pageid": { "type": "string" },
                "timestamp": {
                    "type": "integer",
                    "minimum": timestampInMilli - deltaInMilli,
                    "maximum": timestampInMilli + deltaInMilli
                },
                "browser": { "type": "string" },
                "country": { "type": "string" }
            },
            "required": ["userid", "pageid", "timestamp", "browser", "country"]
        };

        var result = validator.validate(event, schema);
        if (result.errors.length > 0) {
            console.log(`validation error: ${result.errors[0]}`);
            return false;
        }
        return true;
    }
};


