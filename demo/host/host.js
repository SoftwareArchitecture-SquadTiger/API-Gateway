import express from 'express';

const host = express();
host.use(express.json());

// Sample Data
const charities = [
    { id: 1, name: 'Charity A', description: 'Help for Charity A' },
    { id: 2, name: 'Charity B', description: 'Help for Charity B' },
];

// Routes
// Get all charities
host.get('/charities', (req, res) => {
    res.json(charities);
});

// Get charity by ID
host.get('/charities/:id', (req, res) => {
    const charity = charities.find((c) => c.id === parseInt(req.params.id));
    if (!charity) return res.status(404).json({ error: 'Charity not found' });
    res.json(charity);
});

// Add a new charity
host.post('/charities', (req, res) => {
    const { name, description } = req.body;
    const newCharity = { id: charities.length + 1, name, description };
    charities.push(newCharity);
    res.status(201).json(newCharity);
});

export default host;
