import { getAuths } from "./jwtFunctions/getAuth";
import { Request, Response } from 'express';

interface User {
  // Define user properties here
  Roles: {
    Roles: string[]; // Example property, adjust according to your user object structure
  };
}

interface AuthResponse {
  user: User;
  newToken: string;
}

async function context({ req, res }: { req: Request; res: Response }): Promise<{ user?: User } | null> {
  if (req.body.operationName === 'IntrospectionQuery') {
    return null; // Adjusted to return null for consistency with the expected return type
  }

  const token = req.headers.authorization || null;
  const { user, newToken } = await getAuths(token);
  res.set('authorization', newToken);
  console.log(user.Roles.Roles);
  return { user };
}

export { context };
