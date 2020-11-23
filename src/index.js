const app = require("express")();

const faunadb = require("faunadb");

const client = new faunadb.Client({
  secret: "",
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

// endpoint for GET a meal by id
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

// endpoint for POST a new ingredient by id
app.post("/ingredient", async (req, res) => {
  // resource belongs to user would be like this
  // user: Select("ref", Get(Match(Index("users_by_name"), "username"))),
  // (very similar to join)
  const data = {
    meal: Select("ref", Get(Match(Index("meal_by_name"), "lasagne"))),
    name: "tomato",
    price: 0.3,
  };

  const doc = await client
    .query(Create(Collection("ingredients"), { data }))
    .catch((e) => console.log(e));

  res.send(doc);
});

// example response
/* 
{
    "ref": {
        "@ref": {
            "id": "283017955895149061",
            "collection": {
                "@ref": {
                    "id": "ingredients",
                    "collection": {
                        "@ref": {
                            "id": "collections"
                        }
                    }
                }
            }
        }
    },
    "ts": 1606165805630000,
    "data": {
        "meal": {
            "@ref": {
                "id": "283010567607681543",
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
        "name": "onion",
        "price": 0.12
    }
}
 */

// endpoint for GET many ingredients with pagination
app.get("/ingredient", async (req, res) => {
  const docs = await client.query(
    Paginate(
      Match(
        Index("ingredients_by_meal"),
        Select("ref", Get(Match(Index("meal_by_name"), "lasagne")))
      )
    )
  );
  res.send(docs);
});
