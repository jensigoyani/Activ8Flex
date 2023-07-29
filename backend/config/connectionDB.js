const mongoose = require('mongoose')

const URI = "mongodb+srv://health-fitness:ACTIV8FLEX@cluster0.b6ztwr4.mongodb.net/health-fitness?retryWrites=true&w=majority"

//MONGO DB CONNECTION
const connectionDB = async () => {
    try {
        await mongoose.connect(URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`Database is connected!!!`)
    } catch (error) {
        console.error(`Error: ${error} `)
        process.exit(1) //passing 1 - will exit the proccess with error
    }
}
        
module.exports = connectionDB
