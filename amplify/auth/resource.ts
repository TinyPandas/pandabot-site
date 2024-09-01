import { defineAuth, secret } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: "auth0",
          /**
           * Since in Amplify, the TypeScript definition of 
           * clientId and clientSecret is BackendSecret,
           * we need to store the values in Amplify's secret manager.
           */
          clientId: secret("authClient"),
          clientSecret: secret("authSecret"),
          issuerUrl: "https://dev-wvc4ao3ybzbt1ioa.us.auth0.com",
          scopes: ["openid", "profile", "email", "name"],
        },
      ],
      logoutUrls: [
        "http://localhost:5173",
        "https://pandabot.gg",
      ],
      callbackUrls: [
        "http://localhost:5173",
        "https://pandabot.gg",
      ],
    }
  }
});
