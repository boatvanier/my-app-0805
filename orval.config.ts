import { defineConfig } from 'orval';

export default defineConfig({
  test: {
    input: {
      target: 'http://localhost:8080/v3/api-docs',
    },
    output: {
      mode: 'tags-split',         
      target: './src/api',        
      schemas: './src/api/model', 
      client: 'react-query',
      override: {
        mutator: {
          path: './src/axiosInstance.ts',
          name: 'axiosInstance',
        },
      },
    },
  },
});
