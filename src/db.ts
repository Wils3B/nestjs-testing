const StormDB = require('stormdb');

const engine = new StormDB.localFileEngine('./db.json');
const db = new StormDB(engine);

export default db;
