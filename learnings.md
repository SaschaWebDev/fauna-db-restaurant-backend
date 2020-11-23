## Learnings

Documentation about learnings while finishing the project.

### FaunaDB

- Fauna was made by ex-twitter engineers and is trying to combine the best features out of relation databases like security (acid) and the scalability of noSQL databases
- It runs completely in the cloud and you have to sign up on fauna.com to get the database running
- Fauna offers CRUD and GraphQL requests
- Fauna supports `Multitenancy` which allows a database to have unlimited child databases so that databases can have scopes for access rights on the data like required in organizations
- Collections are behaving like in document driven databases (mongodb/firestore) as folder which contain documents. When querying data the uninteresting documents will be filtered out.
- Fauna offers history tracking on database changes. On updates it will archive the old state and work on a copy of it for storing the updates.
- Data is stored in key: value format and can be queried by key

```
{
  name: "spaghetti carbonara",
  price: 12.99
}
```

- After storing the document a unique `ref id` will be assigned to the document. This reference is used to join data together from multiple colletions.

```
{
  "ref": Ref(Collection("meals"), "283010324538327559"),
  "ts": 1606158527800000,
  "data": {
    "name": "spaghetti carbonara",
    "price": 12.99
  }
}
```

- This reference can be used to save it in documents of other collections
- For accessing data you can upload a graphql schema to fauna and it will automatically create the collections and indexes to retrieve the data

## FQL

- Fauna also owns a custom query language called FQL (fauna query language) which can be installed in local shell or be used on the fauna.com shell online
- FQL is functional and flexible
- Reading a single document is as easy as

```
Get(
  Ref(Collection("meals"), "283010324538327559")
)
```

- Hovering over the `i` symbol in the shell will tell how many bytes where transfered
- Seaching an index is as easy as

```
Get(
  Match(Index("meal_by_name"), "lasagne")
)
```

## Index

- An `Index` can be used to defined how to query data from a collection. A user for example could be fetched by username or email instead of document/ref id.
- The index can be named for example `meal_by_name`
- A or many `Term(s)` can be used to define what keys in the collection should be searched for. In this case it is `data.name`
- You can also state `Values` that should be returned so the index can be searched by the name of the meal but returns the price
