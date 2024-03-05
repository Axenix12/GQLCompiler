import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { keyCloak } from './fakeKeycloak.js';
import { fetchRoleUsersByCACIdentifier } from './badPractice.js';
import dotenv from 'dotenv';

export async function getAuths(pretoken) {
  dotenv.config()
  const token = pretoken ?? (await keyCloak());
  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 }
      }
    });
  }

  const permissions = jwt.decode(token);
  const user =
    permissions.Roles.SignedIn === 'False'
      ? await fetchRoleUsersByCACIdentifier()
      : permissions;
  const newExpTime =
    Math.floor(Date.now() / 1000) + 60 * 15; // use env variable
  user.exp = newExpTime;
  const newToken = jwt.sign(user, process.env.JWT_SECRET);
  return { user, newToken };
}
