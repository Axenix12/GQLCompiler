import { getAuths } from "./jwtFunctions/getAuth";

async function context({ req, res }) {
  if (req.body.operationName === 'IntrospectionQuery') {
    return; // This is a security vulnerability to allow introspection query (the Apollo UI) to still function in this test environment, this should be deleted and the NODE_ENV environment variable is set to production to turn it off
  }

  const token = req.headers.authorization || null;
  const { user, newToken } = await getAuths(token);
  res.set('authorization', newToken);
  console.log(user.Roles.Roles);
  return { user };
}

export { context };
