import server from '../../server';
import request from 'supertest';
import User from '../../models/Dev';

beforeEach(async () => {
    await User.deleteMany({});
});

beforeAll(async() => {
    await new Promise(resolve => setTimeout(() => resolve(), 5000));
});

describe("Create User", () => {

    it("should receive a valid git username and create a new user", async () => {
        const response = await request(server).post("/devs").send({username: 'andersonbruno'});
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });
    
    it("should receive an invalid git username and return an error", async () => {
        const response = await request(server).post("/devs").send({username: '32178632187367821'}); 
    
        expect(response.status).toBe(404);
    });
    
    it("should return the user from DB if user already registed", async() => {
        const firstResponse = await request(server).post("/devs").send({username: 'andersonbruno'});
    
        const secondResponse = await request(server).post("/devs").send({username: 'andersonbruno'});
        
        expect(firstResponse.body._id).toBe(secondResponse.body._id);
    });

});

describe("List Users", () => {

    it("should receive a valid user id and return all users witch doesn't receive a like or dislike", async () => {
        const user = await request(server).post("/devs").send({username: 'andersonbruno'});
        await request(server).post("/devs").send({username: 'kurocaelum'});
        await request(server).post("/devs").send({username: 'pedror14'});

        const response = await request(server).get("/devs").set('user', user.body._id);

        expect(response.body.length).toBe(2);
    });

    it("should receive an invalid user id and return an error", async () => {
        const response = await request(server).get("/devs").set('user', '32187321987231');

        expect(response.status).toBe(401);
    });

});
