import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection: Connection;
let adminToken: string;

describe('List Categories Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();
        const password = await hash('admin', 8);

        await connection.query(`
        INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXXX')
        `);

        const { body: responseToken } = await request(app)
            .post('/sessions')
            .send({
                email: 'admin@rentx.com',
                password: 'admin',
            });

        adminToken = responseToken.token;

        await request(app)
            .post('/categories')
            .send({
                name: 'Automated windows',
                description:
                    'Windows rolls down or up with a click of a button!',
            })
            .set({
                Authorization: `Bearer ${adminToken}`,
            });

        await request(app)
            .post('/categories')
            .send({
                name: 'Four doors',
                description: 'Cars have four doors!',
            })
            .set({
                Authorization: `Bearer ${adminToken}`,
            });

        await request(app)
            .post('/categories')
            .send({
                name: 'Manual shift',
                description: 'Manual shift for more control of the car!',
            })
            .set({
                Authorization: `Bearer ${adminToken}`,
            });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('Should be able to list all categories', async () => {
        const response = await request(app).get('/categories');

        console.log(response.body);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });
});
