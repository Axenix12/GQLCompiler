import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; // eslint-disable-line n/file-extension-in-import

import { typeDefs } from './graphql/typedefs.ts'; 
import { resolvers } from './graphql/resolvers.ts';
import { context } from './middleware/context.ts'


async function startServer() {

  const app = express();

  const apollo = new ApolloServer({
    typeDefs,
    resolvers
  });

  await apollo.start();

  app.use(
    express.json(),
    expressMiddleware(apollo, {
      path: '/graphql',
      context
    })
  );

  app.get('/health', (_, response) => {
    response.status(200).send('Okay!');
  });

  app.listen(process.env.BACKEND_PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${process.env.BACKEND_PORT}/graphql`
    )
  );
}

startServer();
