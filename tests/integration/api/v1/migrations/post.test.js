import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const responseBeforeMigrations = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(responseBeforeMigrations.status).toBe(201);

  const responseBeforeMigrationsBody = await responseBeforeMigrations.json();
  expect(Array.isArray(responseBeforeMigrationsBody)).toBe(true);
  expect(responseBeforeMigrationsBody.length).toBeGreaterThan(0);

  const responseAfterMigrations = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(responseAfterMigrations.status).toBe(200);

  const responseAfterMigrationsBody = await responseAfterMigrations.json();
  expect(Array.isArray(responseAfterMigrationsBody)).toBe(true);
  expect(responseAfterMigrationsBody.length).toBe(0);
});
