import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { userProfile } from './data/resource';

defineBackend({
  auth,
  userProfile,
});
