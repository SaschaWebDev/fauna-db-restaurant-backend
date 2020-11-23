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
