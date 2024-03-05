const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { resolvers, typeDefs } = require('./graphql/index.ts');
const { context } = require('./middleware/context.js');


async function startServer() {
  dotenv.config();

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
