const request = require("supertest");
const app = require("../app/index");
const dotenv = require("dotenv");
dotenv.config();

describe("API Get All transaction Data", () => {
  it("success", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";
  
    const response = await request(app).get("/api/transaction/get")
    .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });
});

describe("API Get transaction by Date", () => {
  it("success", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";

    const response = await request(app).get("/api/transaction/search?date=2023-07-03&&branchId=2")
    .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });
});

describe("API Create Transaction", () => {
  it("Success Create New Transaction", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const transaction = {
        itemId: 504,
        branchId: 1,
        out: 1,
        date: "2023-07-03"
    };
    const response = await request(app)
      .post("/api/transaction/add")
      .set("Authorization", "Bearer " + token)
      .send(transaction);
    expect(response.statusCode).toBe(201);
  });

  it("Failed : Double Data", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const transaction = {
        itemId: 501,
        branchId: 1,
        out: 1,
        date: "2023-07-03"
    };
    const response = await request(app)
      .post("/api/transaction/add")
      .set("Authorization", "Bearer " + token)
      .send(transaction);
    expect(response.statusCode).toBe(400);
  });

  it("Failed: Out Can't be Empty", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const transaction = {
        itemId: 500,
        branchId: 1,
        out: 5,
        date: "2023-07-03"
    };
    const response = await request(app)
      .post("/api/transaction/add")
      .set("Authorization", "Bearer " + token)
      .send(transaction);
    expect(response.statusCode).toBe(400);
  });

  it("Failed: Invalid Token", async () => {
    const token =
    "";
   
    const transaction = {
        itemId: 500,
        branchId: 1,
        out: 5,
        date: "2023-07-03"
    };
    const response = await request(app)
      .post("/api/transaction/add")
      .set("Authorization", "Bearer " + token)
      .send(transaction);
    expect(response.statusCode).toBe(401);
  });

});

describe("API Update Transaction", () => {
  it("Success Update Transaction", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const transaction = {
        out: 5,
    };
    const response = await request(app)
      .put("/api/transaction/update/1")
      .set("Authorization", "Bearer " + token)
      .send(transaction);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : Data Not Found", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const transaction = {
        out: 5,
    };
    const response = await request(app)
      .put("/api/transaction/update/9999")
      .set("Authorization", "Bearer " + token)
      .send(transaction);
    expect(response.statusCode).toBe(404);
  });

  it("Failed: Out Can't be Empty", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const transaction = {
        out: "",
    };
    const response = await request(app)
      .put("/api/transaction/update/1")
      .set("Authorization", "Bearer " + token)
      .send(transaction);
    expect(response.statusCode).toBe(400);
  });

  it("Failed: Invalid Token", async () => {
    const token =
    "";
   
    const transaction = {
        out: 5,
    };
    const response = await request(app)
      .put("/api/transaction/update/1")
      .set("Authorization", "Bearer " + token)
      .send(transaction);
    expect(response.statusCode).toBe(401);
  });

});

describe("API Delete Transaction", () => {
  it("Success Delete Transaction", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const response = await request(app)
      .delete("/api/transaction/delete/4")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : Data Not Found", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const response = await request(app)
      .delete("/api/transaction/delete/9999")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(404);
  });

  it("Failed: Invalid Token", async () => {
    const token =
    "";
    const response = await request(app)
      .delete("/api/transaction/delete/1")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(401);
  });

});
