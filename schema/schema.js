const graphql = require("graphql");

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLInt,
	GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parentValue, args) {
				return _.find(authors, { id: parentValue.authorId });
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parentValue, args) {
				return _.filter(books, { authorId: parentValue.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLString } },
			resolve(parentValue, args) {
				return;
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(parentValue, args) {
				return books;
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parentValue, args) {
				return authors;
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
