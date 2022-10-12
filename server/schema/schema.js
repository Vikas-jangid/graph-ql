import {graphql} from "graphql";
import _ from "lodash";
import Author from "../models/authors.js";
import Book from "../models/books.js"

import {
   GraphQLObjectType,
   GraphQLString,
   GraphQLSchema,
   GraphQLID,
   GraphQLInt,
   GraphQLList,
   GraphQLNonNull
} from "graphql";

const BookType = new GraphQLObjectType({
   name:'Book',
   fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    genre:{type:GraphQLString},
    authorId:{type:GraphQLID},
    author:{
      type:AuthorType,
      resolve(parent, args){
         console.log(parent);
         // return _.find(authors, {id:parent.authorId});
         return Author.findById(parent.authorId);
      }
    }
   })
});

const AuthorType = new GraphQLObjectType({
   name:'Author',
   fields:()=>({
    id:{type:GraphQLID},
    name:{type:GraphQLString},
    age:{type:GraphQLInt},
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
         // return _.filter(books,{authorId:parent.id})
         return Book.findById({authorId:parent.id});

      }
    }
   })
});

const RootQuery = new GraphQLObjectType({
   name:'RootQueryType',
   fields:{
      book:{
         type:BookType,
         args:{id:{type:GraphQLID}},
         resolve(parent, args){
            //Code here to get the data from database or any other source  
            // return _.find(books,{id:args.id})
            return Book.findById(args.id);
         }
      },
      author:{
         type:AuthorType,
         args:{id:{type:GraphQLID}},
         resolve(parent, args){
            // return _.find(authors, {id:args.id})
            return Author.findById(args.id)
         }
      },
      books:{
         type: new GraphQLList(BookType),
         resolve(parent, args){
            // return books;
            return Book.find({});
         }
      },
      authors:{
         type: new GraphQLList(AuthorType),
         resolve(parnet, args){
            // return authors;
            return Author.find({});
         }
      }
   }
}); 

const Mutation = new GraphQLObjectType({
   name:"Mutation",
   fields:{
      addAuthor:{
         type: AuthorType,
         args:{
            name:{type: new GraphQLNonNull(GraphQLString)},
            age: {type: new GraphQLNonNull(GraphQLInt)},
         },
         resolve(parent, args) {
            let author = new Author({
                  name: args.name,
                  age: args.age
               });
            return author.save();
         }
      },
      addBook: {
         type: BookType,
         args: {
            name: {type: new GraphQLNonNull(GraphQLString)},
            genre: {type: new GraphQLNonNull(GraphQLString)},
            author:{type: new GraphQLNonNull(GraphQLString)}
         },
         resolve(parent, args) {
            let book = new Book({
               name: args.name,
               genre: args.genre,
               author:args.author
            });
            return book.save();
         }
      },
      deleteBook: {
         type: BookType,
         args: {
           id: { type: new GraphQLNonNull(GraphQLID)}
         },
         resolve(parent, args) {
           return Book.findByIdAndDelete(args.id);
         }
      }
   }
})

export default new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
})