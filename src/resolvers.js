
const { buildDCF } = require("./services/DCF")

// dummy dcf data

module.exports = {
  Query: {
    dcf: (_, { id }, { dataSources }) => {
      return dataSources.dcfAPI.mockFindOne(id);
    },
    // forecast: ({ parent }) => {

    // }
  },
  Mutation: {
    createDCF: (_,  { dcfData }, { dataSources }) => {
      
      const newDcf = buildDCF(dcfData);

      return dataSources.dcfAPI.insertOne(newDcf)
    },
    // updateDCF: (_, { updateData }, { dataSources }) => {
    //   return;
    // }
  }
}

