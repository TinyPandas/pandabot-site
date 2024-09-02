import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    UserProfile: a.model({
        userId: a.string(),
        username: a.string()
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const userProfile = defineData({
    schema,
    name: "userProfileData",
    authorizationModes: {
        defaultAuthorizationMode: "userPool"
    }
})