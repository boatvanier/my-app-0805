export default {
  test: {
    input: {
      target: 'http://localhost:8080/v3/api-docs',
    },
    output: {
      mode: 'tags-split',       // split output files by tags
      target: './src/api',      // output folder for generated code
      schemas: './src/api/model', // where to put generated types
      client: 'react-query',    // generate React Query hooks
    },
  },
};
