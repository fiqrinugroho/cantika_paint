const request = require("supertest");
const app = require("../app/index");
const dotenv = require("dotenv");
dotenv.config();

var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
var result = "";

for (var i = 0; i < 4; i++) {
  var randomIndex = Math.floor(Math.random() * characters.length);
  result += characters.charAt(randomIndex);
}
var randomString = result


describe("API Get All Item Data", () => {
  it("success", async () => {
    const response = await request(app).get("/api/item/getAll");
    expect(response.statusCode).toBe(200);
  });
});

describe("API Get Item By Id", () => {
  it("success", async () => {
    const response = await request(app).get("/api/item/get/1");
    expect(response.statusCode).toBe(200);
  });
});

describe("API Get Item By Branch Id", () => {
  it("success", async () => {
    const response = await request(app).get("/api/item/branch/1");
    expect(response.statusCode).toBe(200);
  });
});

describe("API Get Item Using Filter Type and Branch", () => {
  it("success", async () => {
    const response = await request(app).get("/api/item/filter?type=super&branchId=2");
    expect(response.statusCode).toBe(200);
  });
});

describe("API Search Item By Color and Branch", () => {
  it("success", async () => {
    const response = await request(app).get("/api/item/search?color=white&branchId=2");
    expect(response.statusCode).toBe(200);
  });
});

describe("API Create Item", () => {
  it("Success Create New Item", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const item = {
      color: `rainbow${randomString}`,
      type: "pro",
      stock: 25,
      branchId: 2
    };
    const response = await request(app)
      .post("/api/item/add")
      .set("Authorization", "Bearer " + token)
      .send(item);
    expect(response.statusCode).toBe(201);
  });

  it("Failed: Color Can't be Empty", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const item = {
      color: "",
      type: "super",
      stock: 25,
      branchId: 4
    };
    const response = await request(app)
      .post("/api/item/add")
      .set("Authorization", "Bearer " + token)
      .send(item);
    expect(response.statusCode).toBe(400);
  });

  it("Failed: Invalid Token", async () => {
    const token =
    "";
   
    const item = {
      color: "test",
      type: "super",
      stock: 25,
      branchId: 4
    };
    const response = await request(app)
      .post("/api/item/add")
      .set("Authorization", "Bearer " + token)
      .send(item);
    expect(response.statusCode).toBe(401);
  });

  it("Failed : Only Admin can Access", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Ik11aGFtbWFkIFNhZGRhbSBIdXNzZWluIiwidXNlcm5hbWUiOiJhZGFtIiwicm9sZUlkIjoyLCJicmFuY2hJZCI6MiwiaWF0IjoxNjkyNzcyNTgwfQ.3Dnke9pibTReA7Jdy8JsgzY-mI4caS3Hgx5oxYOOJWk";
  
    const item = {
      color: "test",
      type: "super",
      stock: 25,
      branchId: 4
    };
    const response = await request(app)
      .post("/api/item/add")
      .set("Authorization", "Bearer " + token)
      .send(item);
  
    expect(response.statusCode).toBe(403);
  });
});

describe("API Edit Item", () => {
  it("Success", async () => {
       const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
    const item = {
      color: "test",
      type: "super",
      stock: 25,
      branchId: 3
    };
    const response = await request(app).put("/api/item/update/1")
      .set("Authorization", "Bearer " + token)
      .send(item);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : Data Not Found", async () => {
       const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
    const item = {
      color: "test",
      type: "super",
      stock: 25,
      branchId: 3
    };
    const response = await request(app).put("/api/item/update/9999")
      .set("Authorization", "Bearer " + token)
      .send(item);
    expect(response.statusCode).toBe(404);
  });

  it("Failed : Only Admin can Access", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";
  
    const item = {
      color: "test",
      type: "super",
      stock: 25,
      branchId: 3
    };
    const response = await request(app).put("/api/item/update/1")
      .set("Authorization", "Bearer " + token)
      .send(item);
  
    expect(response.statusCode).toBe(403);
  });

  it("Failed : Invalid Token", async () => {
    const token =
    "";
    const item = {
      color: "test",
      type: "super",
      stock: 25,
      branchId: 3
    };
    const response = await request(app).put("/api/item/update/1")
      .set("Authorization", "Bearer " + token)
      .send(item);
    expect(response.statusCode).toBe(401);
  });
});

describe("API Delete Item", () => {
  it("Success", async () => {
       const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
    const response = await request(app).delete("/api/item/delete/4")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : Data Not Found", async () => {
       const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";

    const response = await request(app).delete("/api/item/delete/9999")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(404);
  });

  it("Failed : Only Admin can Access", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";

    const response = await request(app).delete("/api/item/delete/1")
      .set("Authorization", "Bearer " + token);
  
    expect(response.statusCode).toBe(403);
  });

  it("Failed : Invalid Token", async () => {
    const token =
    "";

    const response = await request(app).delete("/api/item/delete/1")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(401);
  });
});