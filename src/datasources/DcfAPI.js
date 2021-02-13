const { MongoDataSource } = require('apollo-datasource-mongodb')

const DCF_COLLECTION = 'DCF';

class DcfAPI extends MongoDataSource {
  constructor( store ) {
    super(store)
    this.store = store
  }

  mockFindOne(id) {
    const mockDCF = {
    }

    return mockDCF
  }

  findOneById(dcfId) {
    return this.store.findOneById(dcfId);
  }

  async insertOne( dcfInput ) {
    try {
      const dcf = await this.store.insertOne( dcfInput )


      return dcf;

    } catch(error) {
      
      console.log(error)
      return;
    }
  }
}




module.exports = DcfAPI;