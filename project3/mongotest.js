var MongoClient = require('mongodb').MongoClient;
// not working in this one ↓ guess THIS is the old version?
// oh I know, you need to set the varable db so that the db.collection would work!
// can't set it in url like this → 'mongodb://localhost:27017/Database' that won't work! at least that's what I test??

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if(err) { return console.dir(err); }
  const db = client.db('Database');
  const collection = db.collection('accs');
  const data = {user: 'iris', pass: '1111'}
  // var docs = [{ type:"word", q:"he=他"}, { type:"word", q:"she=她"}, { type:"word", q:"it=它"} ];
  
  const getvalue = async (val) => {
    console.log(await collection.find(val).toArray());
  }
  // console.log(JSON.stringify(getvalue({})))
  getvalue({id: 1});
  const getvalue1 = async (val) => {
    items = await collection.find(val).toArray();
    console.log(items[0]);
    return items[0];
  }
  // console.log('1' + getvalue1({}));
  // console.log(JSON.stringify(collection.find({}).toArray()))
  
collection.aggregate([{ $group: { _id: null, maxId: { $max: "$id" } } }]).toArray((err, id) => {
  console.log('id:');
  console.log(id);
})

  collection.find(data).toArray(function(err, items) {
    if (items && items.length > 0) {
      console.log('hello');
      console.log(items);
    }
    client.close();
  });
});