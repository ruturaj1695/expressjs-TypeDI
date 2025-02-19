import "reflect-metadata";
import dotenv from "dotenv";
import Container from "typedi";
import { App } from "./app";
import { userDatabaseInjection } from "./user/databaseInjection/userDatabase.injection";

dotenv.config();
main();

async function main() {
  try {
    // eslint-disable-next-line no-console
    console.log("Start main function");
    await initializeDependencyInjection();
    const app: App = Container.get(App);
    app.listen();
  } catch (error) {
    throw error;
  }
}

async function initializeDependencyInjection() {
  await Promise.all([userDatabaseInjection()]);
}
