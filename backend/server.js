import app from "./app.js";

import connectToDb  from "./src/config/db/db.js";

app.listen(process.env.PORT, async (error) => {
  if (error) {
    console.log("server crashed!!");
    return;
  } else {
    await connectToDb();
    console.log(`server is running at http://localhost:${process.env.PORT}`);
  }
});
