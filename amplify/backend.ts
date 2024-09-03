import { auth } from './auth/resource';
import { defineBackend } from '@aws-amplify/backend';
import { userProfile } from './data/resource';

defineBackend({
  auth,
  userProfile,
});
