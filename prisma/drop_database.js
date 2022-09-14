export async function dropData() {
  for (const { tablename } of await this.prisma.$queryRaw(
    `SELECT tablename FROM pg_tables WHERE schemaname='${this.dbSchemaName}'`
  )) {
    await this.prisma.$queryRaw(
      `TRUNCATE TABLE \"${this.dbSchemaName}\".\"${tablename}\" CASCADE;`
    );
  }
  for (const { relname } of await this.prisma.$queryRaw(
    `SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='${this.dbSchemaName}';`
  )) {
    await this.prisma.$queryRaw(
      `ALTER SEQUENCE \"${this.dbSchemaName}\".\"${relname}\" RESTART WITH 1;`
    );
  }
}
