// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cors());

// // MongoDB Connection - Replace this string with your MongoDB Atlas connection string
// const MONGODB_URI = 'mongodb+srv://Monish:Monish2119@cluster0.mtydlwf.mongodb.net/counter_db';

// mongoose.connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Error connecting to MongoDB:', err));

// // Define counter schema and model
// const counterSchema = new mongoose.Schema({
//     count: { type: Number, default: 0 }
// },{ collection: 'counters' });
// const Counter = mongoose.model('Counter', counterSchema);

// // Routes
// app.get('/api/counter', async (req, res) => {
//     console.log("Reached GET method")
//     try {
//         const counter = await Counter.findOne();
//         console.log(counter);
//         res.json(counter);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// app.post('/api/counter/increment', async (req, res) => {
//     try {
//         let counter = await Counter.findOne();
//         if (!counter) {
//             counter = new Counter();
//         }
//         counter.count++;
//         await counter.save();
//         res.json(counter);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// app.post('/api/counter/decrement', async (req, res) => {
//     try {
//         let counter = await Counter.findOne();
//         if (!counter) {
//             counter = new Counter();
//         }
//         counter.count--;
//         await counter.save();
//         res.json(counter);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGODB_URI = 'mongodb+srv://Monish:Monish2119@cluster0.mtydlwf.mongodb.net/counter_db';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define counter schema and model
const counterSchema = new mongoose.Schema({
    type: { type: String, required: true },
    count: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Load initial counter values from the database or set them to zero
let mainCounterValue = 0;
let myCounterValue = 0;

Counter.findOne({ type: 'main' })
    .then(counter => {
        if (counter) {
            mainCounterValue = counter.count;
        }
    })
    .catch(err => console.error('Error loading main counter value:', err));

Counter.findOne({ type: 'mycounter' })
    .then(counter => {
        if (counter) {
            myCounterValue = counter.count;
        }
    })
    .catch(err => console.error('Error loading my counter value:', err));

// Routes

app.get('/api/counter', async (req, res) => {
    try {
        const counter = await Counter.findOne({ type: 'main' });
        res.json(counter || { count: mainCounterValue });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/increment', async (req, res) => {
    try {
        let counter = await Counter.findOne({ type: 'main' });
        if (!counter) {
            counter = new Counter({ type: 'main' });
        }
        counter.count++;
        await counter.save();
        mainCounterValue = counter.count;
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/counter/decrement', async (req, res) => {
    try {
        let counter = await Counter.findOne({ type: 'main' });
        if (!counter) {
            counter = new Counter({ type: 'main' });
        }
        counter.count--;
        await counter.save();
        mainCounterValue = counter.count;
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get('/api/mycounter', async (req, res) => {
    try {
        const counter = await Counter.findOne({ type: 'mycounter' });
        res.json(counter || { count: myCounterValue });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/mycounter/increment', async (req, res) => {
    try {
        let counter = await Counter.findOne({ type: 'mycounter' });
        if (!counter) {
            counter = new Counter({ type: 'mycounter' });
        }
        counter.count++;
        await counter.save();
        myCounterValue = counter.count;
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.post('/api/mycounter/decrement', async (req, res) => {
    try {
        let counter = await Counter.findOne({ type: 'mycounter' });
        if (!counter) {
            counter = new Counter({ type: 'mycounter' });
        }
        counter.count--;
        await counter.save();
        myCounterValue = counter.count;
        res.json(counter);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
