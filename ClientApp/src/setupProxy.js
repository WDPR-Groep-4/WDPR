const { createProxyMiddleware } = require("http-proxy-middleware");
const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_URLS
    ? env.ASPNETCORE_URLS.split(";")[0]
    : "http://localhost:25568";

const context = [
    "/weatherforecast",
    "/api/auth/verifieer",
    "/api/auth/bevestig",
    "/api/auth/login",
    "/api/auth/registreer",
    "/api/auth/wachtwoordvergeten",
    "/api/auth/resetwachtwoord",
    "/api/account",
    "/api/rollen/start",
    "/api/voorstelling",
    "/api/planning",
    "/api/betaal/setup",
    "/api/betaal/verify",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false,
        headers: {
            Connection: "Keep-Alive",
        },
    });

    app.use(appProxy);
};
