const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const User = require('./models/user')
const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Middleware
app.use(cors({
  origin: 'http://localhost:8000', // Replace with your client's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type'], // Allowed headers
}));

app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();
// MongoDB connection
const mongoURI = process.env.MONGO_URL
const PORT = 8001;
const JWT_SECRET = process.env.JWT_SECRET
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let collection;

async function connectToDatabase() {
  try {
    await client.connect();
    collection = client.db("EduNotes").collection("userData");
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

// Routes
app.get('/', (req, res) => {
  console.log("hello");
  res.send('Hello from the server!');
});

app.post('/createAccount', cors(), async (req, res) => {
  // NEED TO ENCRYPT PASSWORD --> need to hash passwords
  const { email, password: plainTextPassword } = req.body

  if (!email || typeof email !== 'string') {
    return res.json({ status: 'error', error: 'Invalid username' })
  }

  if (!plainTextPassword || typeof plainTextPassword !== 'string') {
    return res.json({ status: 'error', error: 'Invalid password' })
  }

  if (plainTextPassword.length < 5) {
    return res.json({ status: 'error', error: 'Password too short. Should be at least 6 characters' })
  }

  const password = await bcrypt.hash(plainTextPassword, 10)

  try {
    const user = new User({
      email,
      password
    })
    // await user.save();
    await collection.insertOne(user); // Insert the request payload into the database
    const token = jwt.sign({ id: user._id, email: user.email },
      JWT_SECRET)
    res.cookie('token', token, { expire: new Date() + 1 })
    res.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error("Error accessing endpoint:", error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response to the client
  }
});

app.post('/login', cors(), async (req, res) => {
  const { email, password } = req.body

  const user = await collection.findOne({ email })

  if (!user) {
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user._id, email: user.email },
      JWT_SECRET
    ) // want bare minimum information
    // res.cookie('token', token, { expire: new Date() + 1 })
    return res.json({ status: 'ok', data: token })
  }
  else {
    return res.json({ status: 'error', error: 'Invalid username/password' })
  }

});

app.get('/signOut', cors(), async (req, res) => {
  res.clearCookie("token")
  return res.json({ message: "User signout successful" })
})

app.post('/changePassword', cors(), async (req, res) => {
  const { token } = req.body
  const user = jwt.verify(token, JWT_SECRET)
  res.json({ status: 'ok' })
})

app.post('/addClass', cors(), async (req, res) => {
  const className = req.body.class
  const token = req.body.token
  const {id, email, iat} = jwt.verify(token, JWT_SECRET)
  collection = client.db("EduNotes").collection("classes");
  try {
    const classData = {
      email: email,
      class: className,
      notes: []
    };
    await collection.insertOne(classData); // Insert the request payload into the database
    res.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error("Error accessing endpoint:", error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response to the client
  }
});

app.post('/getClasses', cors(), async (req, res) => {
  const {token} = req.body
  const {id, email, _} = jwt.verify(token, JWT_SECRET)

  collection = client.db("EduNotes").collection("classes");

  try {
    const query = {email: email}
    const cursor = collection.find(query)
    classes = []
    await cursor.forEach(doc => {
      classes.push(doc.class);
    });
    res.json(classes);
  } catch (error) {
    console.error("Error accessing endpoint:", error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response to the client
  }
});

app.post('/getNotes', cors(), async (req, res) => {
  const {token} = req.body
  const {id, email, _} = jwt.verify(token, JWT_SECRET)

  collection = client.db("EduNotes").collection("notes");

  try {
    const query = {email:email}
    const cursor = collection.find(query)
    notes = []
    await cursor.forEach(doc => {
      notess.push(doc.class);
    });
    print("notes ", notes)
    res.json(notes);
  } catch (error) {
    console.error("Error accessing endpoint:", error); // Log the error
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response to the client
  }
});

// Start the server
async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();