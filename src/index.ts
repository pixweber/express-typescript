import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";
import dataSource from "./config/database";

const PORT = process.env.PORT || 8000;

async function main() {
  const app: Application = express();

  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(express.static("public"));

  app.use("/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json"
      }
    })
  );

  app.use(Router);

  await dataSource.initialize();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main().catch(console.error);
