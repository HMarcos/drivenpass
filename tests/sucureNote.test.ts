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
    })
});

afterAll(async () => {
    await prismaClient.$disconnect();
});