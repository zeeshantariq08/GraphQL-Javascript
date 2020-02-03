 const express = require('express')
 const expressGraphQl = require('express-graphql')

 const{
 	GraphQLSchema,
 	GraphQLObjectType,
 	GraphQLString,
 	GraphQLList,
 	GraphQLInt,
 	GraphQLNonNull,

 }=require('graphql')

const authors = [
	{
		id:1,
		name:"J.K.Rowling"
		
	},
	{
		id:2,
		name:"J.R.R Tolkien"
	},
	{
		id:3,
		name:"Brent Weeks"
	},
]


const books = [
	{
		id:1,
		name:"Harry Potter and the Chamber of Secrets",
		authorId:1
	},
	{
		id:2,
		name:"The Fellowship of the Ring",
		authorId:2
	},
	{
		id:3,
		name:"The Return of the King",
		authorId:3
	},
]

const AuthorType = new GraphQLObjectType({
	name:"Author",
	description:"This Represent a List of Authors",
	fields:()=>({
		id:{type:GraphQLNonNull(GraphQLInt)},
		name:{type:GraphQLString}
	})
})

const BookType = new GraphQLObjectType({
	name:"Book",
	description:"This Represent a Book written by an author",
	fields:()=>({
		id:{type:GraphQLNonNull(GraphQLInt)},
		name:{type:GraphQLString},
		authorId:{type:GraphQLNonNull(GraphQLInt)},
		author:{
			type:AuthorType,
			resolve:(books)=>{
				return authors.find(author => author.id === books.authorId)
			}
		}
	})
})

const RootQueryType = new GraphQLObjectType({
	name:"Query",
	description:"Root Query",
	fields:()=>({
		books:{
			type:new GraphQLList(BookType),
			description:"List of All Books",
			resolve:()=> books
		},
		authors:{
			type:new GraphQLList(AuthorType),
			description:"List of All Authors",
			resolve:()=> authors
		},

	})
})

const schema = new GraphQLSchema({
	query:RootQueryType
})



 // const schema = new GraphQLSchema({
 // 	query: new GraphQLObjectType({
 // 		name:'HelloWorld',
 // 		fields:()=>({
 // 			message:{
 // 				type: GraphQLString,
 // 				resolve:() => 'Hello World'
 // 			}
 			
 // 		})
 // 	})
 // })
 const app = express()

 app.use('/graphql',expressGraphQl({
 	schema:schema,
 	graphiql:true
 }))
 app.listen(5000,()=>console.log('Server Running'))