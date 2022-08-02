const mongoose = require('mongoose')

const connectDB = () => {
    return mongoose.connect(process.env.DBLink).then((result) => {
        console.log(`DB connected on ....... ${result.connections[0].host}`);
    }).catch(err => console.log('fail to connect DB', err))
}


module.exports = connectDB