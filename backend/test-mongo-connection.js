const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Test by creating a test collection
        await mongoose.connection.db.createCollection('test_collection');
        console.log('Test collection created successfully');
        
        // Insert a test document
        const testDoc = await mongoose.connection.db.collection('test_collection').insertOne({
            test: 'test document',
            timestamp: new Date()
        });
        console.log('Test document inserted:', testDoc.insertedId);
        
        // Clean up
        await mongoose.connection.db.dropCollection('test_collection');
        console.log('Test collection dropped');
        
        // Close connection
        await mongoose.connection.close();
        console.log('Connection closed successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        console.error('Stack trace:', error.stack);
        process.exit(1);
    }
};

connectDB();
