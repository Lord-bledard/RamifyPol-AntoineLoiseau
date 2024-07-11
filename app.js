// Requiring modules
const express = require('express');
const path = require('path');

// Creating express object
const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname)));

// Route to serve the home page
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to serve combatIA.html
app.get('/combatIA', (req, res) => { 
    res.sendFile(path.join(__dirname, 'combatIA.html'));
});

// Route to serve combatJcJ.html
app.get('/combatJcJ', (req, res) => { 
    res.sendFile(path.join(__dirname, 'combatJcJ.html'));
});

// Route to serve autoCombat.html
app.get('/autoCombat', (req, res) => { 
    res.sendFile(path.join(__dirname, 'autoCombat.html'));
});

// Route for autoCombat
app.get('/matchAuto', (req, res) => {
    const pokemon1 = req.query.pokemon1;
    const pokemon2 = req.query.pokemon2;
    res.sendFile(path.join(__dirname, 'matchAuto.html'));
});

// Route for IACombat
app.get('/matchIA', (req, res) => {
    const pokemon1 = req.query.pokemon1;
    const pokemon2 = req.query.pokemon2;
    console.log(pokemon2);
    res.sendFile(path.join(__dirname, 'matchIA.html'));
});

// Route for JcJCombat
app.get('/matchJcJ', (req, res) => {
    const pokemon1 = req.query.pokemon1;
    const pokemon2 = req.query.pokemon2;
    console.log(pokemon1);
    res.sendFile(path.join(__dirname, 'matchJcJ.html'));
});

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
