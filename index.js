const { ApolloServer, gql } = require('apollo-server');     
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
// const cors = require('cors');


// conectar a la base de datos

conectarDB();

// servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // cors: cors,
    context: ({req}) => {
        // console.log(req.headers['authorization']);

        // console.log(req.headers);
        
        const token = req.headers['authorization'] || '';

        if (token) {
            try {
                     
                // console.log(token);
                
                const usuario = jwt.verify(token.replace('Bearer ',''), process.env.SECRETA);
                
                // console.log(usuario);
                return {
                    usuario
                };
                
            } catch (error) {

                console.log('Hubo un error');
                console.log(error);
                
            }
        }
    }
}); 


// arrancar el servidor
server.listen({ port: process.env.PORT || 4000 }).then( ({url}) => {
    console.log(`servidor listo en la URL ${url}`);
    
});

// server.listen({ port: process.env.PORT || 4000 }).then( ({url}) => {
//     console.log(`Servidor listo en la URL ${url}`)
// } )