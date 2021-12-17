const app = require("./../app")
const request = require("supertest")
const { TestWatcher } = require("jest")

describe("Je test les endpoints de base",()=>{
    test("should return 200 for the endpoint (/)", async ()=>{
        const res = await request(app).get("/")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("<h1>Bienvenue</h1>")
        expect(res.headers["content-type"]).toBe("text/html")
    })
    
    test("should return 200 for the endpoint (/page)", async ()=>{
        const res = await request(app).get("/page")
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("<h1>Bienvenue sur la page d'accueil</h1>")
        expect(res.headers["content-type"]).toBe("text/html")
    })
})
