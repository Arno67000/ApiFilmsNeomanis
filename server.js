const http = require('http');
const app = require('./app');

require ('dotenv').config();

const PORT = process.env.APP_PORT || 3000;

app.set('port', PORT);
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port : ${PORT}`));

