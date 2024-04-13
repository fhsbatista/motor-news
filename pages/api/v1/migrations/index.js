import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const defaultOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    dryRun: true,
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const migrations = await migrationRunner({
      ...defaultOptions,
    });
    response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      ...defaultOptions,
      dryRun: false,
    });
    const statusCode = migrations.length > 0 ? 201 : 200;
    response.status(statusCode).json(migrations);
  }

  return response.status(405).end();
}
