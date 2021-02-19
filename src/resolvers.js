
const { buildDCF } = require("./services/DCF")
const { GraphQLScalarType, Kind } = require('graphql');
// dummy dcf data

// const dateScalar = new GraphQLScalarType({
//   name: 'Date',
//   description: 'Date custom scalar type',
//   serialize(value) {
//     return new Date(value);
//   },
//   parseValue(value) {
//     return value.getTime();
//   }
// });

module.exports = {
  Query: {
    dcf: (_, { id }, { dataSources }) => {
      return dataSources.dcfAPI.mockFindOne(id);
    },
    // forecast: ({ parent }) => {

    // }
  },
  Mutation: {
    createDCF: async (_,  { dcfData }, { dataSources }) => {      

      const newDcf = buildDCF(dcfData);

      try {
        const newRecord = await dataSources.DCFStore.insertOne(newDcf);
        console.log(newRecord);
        return newRecord
      } catch(err) {
        console.log(err);
      }
    },
  }
}

