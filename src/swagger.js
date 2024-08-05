const swaggerAutogen = require("swagger-autogen")();
require("dotenv").config();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/*.js:", "./main.js"]; 

const { SERVER_HOST } = process.env;

const doc = {
  info: {
    title: "Book Rent Server Api Collection", 
    description: "API documentation for Books Rent Service", 
    version: "1.0.0", 
    contact: {
      name: "Alemayehu Mekonen", 
      email: "alemayehu.dev@gmail.com", 
      url: "https://alemayehu.vercel.app", 
    },
  },
  host: SERVER_HOST, 
  basePath: "/", 
  schemes: ["http", "https"], 
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation has been generated successfully");
});
