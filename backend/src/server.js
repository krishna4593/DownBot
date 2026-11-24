import { app } from "./app.js";
import { config } from "./config/env.js";
import { connectDatabase } from "./config/db.js";

await connectDatabase();
app.listen(config.port, () => console.log(`Downbot backend listening on port ${config.port}`));
