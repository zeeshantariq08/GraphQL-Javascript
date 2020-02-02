 const express = require('express')
 const expressGraphQl = require('express-graphql')
 const{
 	GraphQLSchema,
 	GraphQLObjectType,
 	GraphQLString
 }=require('graphql')
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