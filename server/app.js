import express from "express";
import { graphqlHTTP } from "express-graphql";
import "./db.js";
import schema from "./schema/schema.js";


const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true

}));


app.listen(4000, ()=> {
    console.log('listening for request on 4000 port');
});
