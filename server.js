const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Nessy58:Fenerbahce1@cluster0.xhm1b4k.mongodb.net/task-tracking-system?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  
  const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    creationDate: { type: Date, default: Date.now },
    dueDate: { type: Date },
    status: { type: String, default: 'offen' }
  });
  app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/tasks', async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: 'Bad request' });
    }
  });
  app.use((req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
  });
    
  
  const Task = mongoose.model('Task', taskSchema);



app.listen(port, () => {
    console.log('Server hoert auf den port 3000');
});