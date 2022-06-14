module.exports = function (app) {
    const expressSwagger = require('express-swagger-generator')(app);

    let options = {
        swaggerDefinition: {
            info: {
                description: 'This is a telephone api documentation',
                title: 'Swagger',
                version: '1.0.0',
            },
            host: 'localhost:3000',
            basePath: '/v1',
            produces: [
                "application/json"
            ],
            schemes: ['http'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'query',
                    name: 'token',
                    description: "",
                }
            }
        },
        basedir: __dirname, //app absolute path
        files: ['../routes/v1/*.js'] //Path to the API handle folder
    };
    expressSwagger(options)

};