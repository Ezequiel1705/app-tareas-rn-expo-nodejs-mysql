import { expect } from 'chai';
import supertest from 'supertest';
import app  from '../app.js';


const request = supertest(app);

describe("Test de integración de tareas", () => {
    it('GET /todos/:id should return status 200', async () => {
        const response = await request.get('/todos/1');
        expect(response.status).to.equal(200);
    });

    it('POST /todos should create a new todo', async () => {
        const response = await request.post('/todos').send({ user_id: 1, title: 'Test todo'});
        expect(response.status).to.equal(201);
        expect(response.body.user_id).to.equal(1);
        expect(response.body.title).to.equal('Test todo');
    });

    it('PUT /todos/:id should return status 200', async () => {
        const response = await request.put('/todos/1').send({ value: true});
        expect(response.status).to.equal(200);
    });

    it('DELETE /todos/:id should return status 200', async () => {
        const response = await request.delete('/todos/1');
        expect(response.status).to.equal(200)
    });
} )