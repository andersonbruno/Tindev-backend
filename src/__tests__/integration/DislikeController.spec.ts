import server from '../../server';
import request from 'supertest';
import User from '../../models/Dev';

beforeEach(async () => {
    await User.deleteMany({});
});

beforeAll(async() => {
    await new Promise(resolve => setTimeout(() => resolve(), 5000));
});

describe("Test Like", () => {
    
    it("should receive 2 valid users and add it to the likes array", async () => {
        const loggedUser = await request(server).post("/devs").send({username: 'andersonbruno'});
        const targetUser = await request(server).post("/devs").send({username: 'kurocaelum'});
        
        const response = await request(server).post(`/devs/${targetUser.body._id}/likes`).set('user', loggedUser.body._id);
    
        expect(response.body.likes).toContain(targetUser.body._id);
    });

    it("should receive an invalid logged user and return an error", async () => {
        const targetUser = await request(server).post("/devs").send({username: 'kurocaelum'});

        const response = await request(server).post(`/devs/${targetUser.body._id}/likes`).set('user', '376215736215763215');

        expect(response.status).toBe(401);
    });

})