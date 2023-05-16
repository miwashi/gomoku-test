const app = require('./server.js')
require('dotenv').config();

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`);
})