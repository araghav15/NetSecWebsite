const {MongoClient}=  require('mongodb')

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect("mongodb+srv://userSK:DatabasePass19@cluster0.hhjwnou.mongodb.net/IndexOverview?retryWrites=true&w=majority")
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
}