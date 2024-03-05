import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; // eslint-disable-line n/file-extension-in-import
import dotenv from 'dotenv';
import { context } from './middleware/context.js'
import { typeDefs } from './graphql/typedefs.js'; 
import { resolvers } from './graphql/resolvers.js';



async function startServer() {
  dotenv.config()
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
