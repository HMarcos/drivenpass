import supertest from "supertest";
import app from "../src/app.js";
import prismaClient from "../src/config/database.js";
import secureNoteFactory from "./factories/secureNoteFactory.js";
import { admin_user } from "./factories/userFactory.js";


beforeEach(async () => {
    await prismaClient.$executeRaw`TRUNCATE TABLE secure_notes`;
    await prismaClient.$executeRaw`TRUNCATE TABLE sessions`;
});

describe("Secure Notes test suite", () => {
    it("create secure note for admin user", async () => {
        let response = await supertest(app).post('/sign-in').send(admin_user);
        const token = response.body.token;

        const newSecureNote = secureNoteFactory.createSecureNoteInfo();
        response = await supertest(app).post('/secure-notes').send(newSecureNote).set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(201);

        const savedSecureNote = await prismaClient.secureNote.findFirst({
            where: { title: newSecureNote.title }
        });
        expect(savedSecureNote).not.toBeNull();
    });

    it("get all secure notes for admin user", async () => {
        let response = await supertest(app).post('/sign-in').send(admin_user);
        const token = response.body.token;

        let newSecureNote = secureNoteFactory.createSecureNoteInfo();
        await supertest(app).post('/secure-notes').send(newSecureNote).set("Authorization", `Bearer ${token}`);

        newSecureNote = secureNoteFactory.createSecureNoteInfo();
        await supertest(app).post('/secure-notes').send(newSecureNote).set("Authorization", `Bearer ${token}`);

        response = await supertest(app).get(`/secure-notes`).set("Authorization", `Bearer ${token}`);
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveLength(2);

    });

    it("get a secure note for admin user", async () => {
        let response = await supertest(app).post('/sign-in').send(admin_user);
        const token = response.body.token;

        const newSecureNote = secureNoteFactory.createSecureNoteInfo();
        await supertest(app).post('/secure-notes').send(newSecureNote).set("Authorization", `Bearer ${token}`);

        const savedSecureNote = await prismaClient.secureNote.findFirst({
            where: {
                title: newSecureNote.title
            }
        });

        response = await supertest(app).get(`/secure-notes/${savedSecureNote.id}`).set("Authorization", `Bearer ${token}`);
        expect(response.body).not.toBeNull();

    });

    it("delete a secure note for admin user", async () => {
        let response = await supertest(app).post('/sign-in').send(admin_user);
        const token = response.body.token;

        const newSecureNote = secureNoteFactory.createSecureNoteInfo();
        await supertest(app).post('/secure-notes').send(newSecureNote).set("Authorization", `Bearer ${token}`);

        const savedSecureNote = await prismaClient.secureNote.findFirst({
            where: {
                title: newSecureNote.title
            }
        });

        response = await supertest(app).delete(`/secure-notes/${savedSecureNote.id}`).set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);

    });

    it("Get an invalid secure note, error 404", async () => {
        let response = await supertest(app).post('/sign-in').send(admin_user);
        const token = response.body.token;

        response = await supertest(app).get(`/secure-notes/100`).set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(404);

    });
});

afterAll(async () => {
    await prismaClient.$disconnect();
});