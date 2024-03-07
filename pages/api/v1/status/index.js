import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseQueryVersion = await database.query("SHOW server_version;");
  const databaseVersion = databaseQueryVersion.rows[0].server_version;

  const databaseMaxConnsQuery = await database.query("SHOW max_connections;");
  const databaseMaxConns = databaseMaxConnsQuery.rows[0].max_connections;

  const databaseName = request.query.databaseName;
  const query = `SELECT count(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}';`;
  console.log(query);
  const databaseOpenedConnsQuery = await database.query(query);
  const databaseOpenedConns = databaseOpenedConnsQuery.rows[0].count;


  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConns),
        opened_connections: databaseOpenedConns,
      },
    },
  });
}

export default status;
