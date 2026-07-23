#!/bin/sh
set -e

# POSTGRES_DB is normally created by the official image before init scripts run.
# Keep this script safe to rerun instead of failing when that database exists.
psql -v ON_ERROR_STOP=1 \
	--username "$POSTGRES_USER" \
	--dbname postgres \
	--set=db_name="$POSTGRES_DB" \
	--set=db_user="$POSTGRES_USER" <<-'EOSQL'
	SELECT format('CREATE DATABASE %I', :'db_name')
	WHERE NOT EXISTS (
		SELECT FROM pg_database WHERE datname = :'db_name'
	)\gexec

	SELECT format(
		'GRANT ALL PRIVILEGES ON DATABASE %I TO %I',
		:'db_name',
		:'db_user'
	)\gexec
EOSQL

