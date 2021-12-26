const app = require("./../app")
const request = require("supertest")

describe("Je test les endpoints Category",()=>{
    test("should return 200 for the endpoint GET (/api/category/)", async ()=>{
        const res = await request(app).get("/api/category/")
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    test("should return 200 for the endpoint GET (/api/category/:id)", async ()=>{
        const res = await request(app).get("/api/category/61c8fe68b8d5acf9a85d99e0")
        expect(res.statusCode).toBe(200)
        expect(res.body._id).toBe("61c8fe68b8d5acf9a85d99e0")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    test("should return 201 for the endpoint POST (/api/category/)", async ()=>{
        let category = {
            name: 'Test',
        }

        const res = await request(app).post("/api/category/")
        .send(category)
        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe("Catégorie ajouté avec succès !")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    test("should return 201 for the endpoint PUT (/api/category/:id)", async ()=>{
        let category = {
            name: 'Test 2',
        }

        const res = await request(app).put("/api/category/61c8fe89976cd062d36425ce")
        .send(category)
        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe("Catégorie modifié avec succès !")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    test("should return 200 for the endpoint DELETE (/api/category/:id)", async ()=>{

        const res = await request(app).delete("/api/category/61bcca2dff42835cf2152263")
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Catégorie supprimé avec succès !")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })
})

describe("Je test les endpoints Produit",()=>{
    test("should return 200 for the endpoint GET (/api/product/)", async ()=>{
        const res = await request(app).get("/api/product/")
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    test("should return 200 for the endpoint GET (/api/product/:id)", async ()=>{
        const res = await request(app).get("/api/product/61c8d129764c74397d41aa16")
        expect(res.statusCode).toBe(200)
        expect(res.body._id).toBe("61c8d129764c74397d41aa16")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    test("should return 201 for the endpoint POST (/api/product/)", async ()=>{
        let product = {
            name: 'Test',
            brandName: 'test',
            nutriGrade: 'test',
            image: 'test',
        }

        const res = await request(app).post("/api/product/")
        .send(product)
        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe("Produit ajouté avec succès !")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    test("should return 201 for the endpoint PUT (/api/product/:id)", async ()=>{
        let product = {
            name: 'Test',
            brandName: 'test',
            nutriGrade: 'test',
            image: 'test',
        }

        const res = await request(app).put("/api/product/61c8d129764c74397d41aa16")
        .send(product)
        expect(res.statusCode).toBe(201)
        expect(res.body.message).toBe("Produit modifié avec succès !")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    test("should return 200 for the endpoint DELETE (/api/product/:id)", async ()=>{

        const res = await request(app).delete("/api/product/61bcca2dff42835cf2152263")
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Produit supprimé avec succès !")
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })

    test("should return 200 for the endpoint GET (/api/product/name/:name)", async ()=>{

        const res = await request(app).get("/api/product/name/te")
        expect(res.statusCode).toBe(200)
        expect(res.headers["content-type"]).toBe("application/json; charset=utf-8")
    })
})