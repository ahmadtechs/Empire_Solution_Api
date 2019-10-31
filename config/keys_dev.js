module.exports = {

    mongoURI: 'mongodb+srv://empire-solution:empire-solution@cluster0-dlzvf.mongodb.net/test',
  
    mongoCFG: {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      ssl: true,
      replicaSet: 'Cluster0-shard-0',
      authSource: 'admin',
      retryWrites: true,
    }
  }
  
  