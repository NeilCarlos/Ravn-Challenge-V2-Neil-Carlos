import {Pool} from 'pg';

export const pool = new Pool({
    user: 'neilcarlos',
    host: 'localhost',
    password: '',
    database: 'tinystoredatabase02',
    port: 5432
});