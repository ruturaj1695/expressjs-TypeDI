import "reflect-metadata";
import Container from "typedi";
import { App } from "./app";
import { userDatabaseInjection } from "./user/databaseInjection/userDatabase.injection";

main();

async function main() {
  // eslint-disable-next-line no-console
  console.log("Start main function");
  await initializeDependencyInjection();
  const app: App = Container.get(App);
  app.listen();
}

async function initializeDependencyInjection() {
  await Promise.all([userDatabaseInjection()]);
}
