require('dotenv').config();
const Hapi = require("@hapi/hapi");
const routes = require("../server/routes.js");
const loadModel = require("../services/loadModel.js");
const InputError = require("../exceptions/InputError.js");

(async () => {
    const server = Hapi.server({
        port: 8000,
        host: '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });

	const model = await loadModel();
	server.app.model = model;

	server.route(routes);

	server.ext("onPreResponse", function (request, h) {
        const response = request.response;
        
		if (response.isBoom && response.output.statusCode === 413) {
			const newResponse = h.response({
				status: "fail",
				message: "Payload content length greater than maximum allowed: 1000000",
			});
			newResponse.code(413);
			return newResponse;
		}

		if (response instanceof InputError) {
			const newResponse = h.response({
				status: "fail",
				message: `${response.message}`,
			});
			newResponse.code(response.statusCode);
			return newResponse;
		}

		if (response.isBoom) {
			const newResponse = h.response({
				status: "fail",
				message: response.message,
			});
			newResponse.code(response.output.statusCode);
			return newResponse;
		}

		return h.continue;
	});

	await server.start();
	console.log(`Server start at: ${server.info.uri}`);
})();