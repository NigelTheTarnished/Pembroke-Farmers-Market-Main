const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/farmers_market', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to MongoDB');
    process.exit(0);
})
.catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});
