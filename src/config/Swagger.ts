

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Dashboard API Microservice",
        version: "1.0.0",
        description: "A simple Express API that utilizes OpenAPI",
    },
};
const options = {
    swaggerDefinition,
    apis: ["Src/Routes/*.ts", "Dist/Routes/*.js"],
};

export default {
    options
}