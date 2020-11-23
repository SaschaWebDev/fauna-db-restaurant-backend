const app = require("express")();

const faunadb = require("faunadb");

const client = new faunadb.Client({
  secret: "API-KEY-HERE",
});

const {
  Paginate,
  Get,
  Select,
  Match,
  Index,
  Create,
  Collection,
  Lambda,
  Var,
  Join,
  Ref,
} = faunadb.query;

// start with "node src"
app.listen(5000, () => console.log("API on localhost:5000"));

// endpoint for GET on meal by id
app.get("/meal/:id", async (req, res) => {
  // query can accept FQL commands
  const doc = await client.query(Get(Ref(Collection("meals"), req.params.id)));
  res.send(doc);
});

// example response
/* 
{
    "ref": {
        "@ref": {
            "id": "283010324538327559",
            "collection": {
                "@ref": {
                    "id": "meals",
                    "collection": {
                        "@ref": {
                            "id": "collections"
                        }
                    }
                }
            }
        }
    },
    "ts": 1606158527800000,
    "data": {
        "name": "spaghetti carbonara",
        "price": 12.99
    }
}
 */
