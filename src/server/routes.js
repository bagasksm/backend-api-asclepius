const { postPredictHandler, getPredictHandler } = require("../server/handler");

const routes = [
	{
		path: "/predict",
		method: "POST",
		handler: postPredictHandler,
		options: {
			payload: {
				allow: "multipart/form-data",
				multipart: true,
			},
		},
	},
	{
		path: "/predict/histories",
		method: "GET",
		handler: getPredictHandler,
		options: {},
	},
];

module.exports = routes;