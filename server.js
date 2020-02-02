 const express = require('express')
 const expressGraphQl = require('express-graphql')

 const{
 	GraphQLSchema,
 	GraphQLObjectType,
 	GraphQLString
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

 const schema = new GraphQLSchema({
 	query: new GraphQLObjectType({
 		name:'HelloWorld',
 		fields:()=>({
 			message:{
 				type: GraphQLString,
 				resolve:() => 'Hello World'
 			}
 			
 		})
 	})
 })
 const app = express()

 app.use('/graphql',expressGraphQl({
 	schema:schema,
 	graphiql:true
 }))
 app.listen(5000,()=>console.log('Server Running'))