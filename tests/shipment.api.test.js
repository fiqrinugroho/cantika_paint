const request = require("supertest");
const app = require("../app/index");
const dotenv = require("dotenv");
dotenv.config();

describe("API Get All shipment Data", () => {
  it("success", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";
  
    const response = await request(app).get("/api/shipment/get")
    .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });
});

describe("API Get shipment by Date", () => {
  it("success", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";

    const response = await request(app).get("/api/shipment/search?date=2023-07-03&&branchId=2")
    .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });
});

describe("API Create shipment", () => {
  it("Success Create New shipment", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const shipment = {
        itemId: 501,
        branchId: 1,
        add: 5,
        date: "2023-07-04"
    };
    const response = await request(app)
      .post("/api/shipment/add")
      .set("Authorization", "Bearer " + token)
      .send(shipment);
    expect(response.statusCode).toBe(201);
  });

  it("Failed : Double Data", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const shipment = {
        itemId: 500,
        branchId: 1,
        add: 5,
        date: "2023-07-04"
    };
    const response = await request(app)
      .post("/api/shipment/add")
      .set("Authorization", "Bearer " + token)
      .send(shipment);
    expect(response.statusCode).toBe(400);
  });

  it("Failed: add Can't be Empty", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const shipment = {
        itemId: 500,
        branchId: 1,
        add: 5,
        date: "2023-07-03"
    };
    const response = await request(app)
      .post("/api/shipment/add")
      .set("Authorization", "Bearer " + token)
      .send(shipment);
    expect(response.statusCode).toBe(400);
  });

  it("Failed: Invalid Token", async () => {
    const token =
    "";
   
    const shipment = {
        itemId: 500,
        branchId: 1,
        add: 5,
        date: "2023-07-03"
    };
    const response = await request(app)
      .post("/api/shipment/add")
      .set("Authorization", "Bearer " + token)
      .send(shipment);
    expect(response.statusCode).toBe(401);
  });

});

describe("API Update shipment", () => {
  it("Success Update shipment", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const shipment = {
        add: 5,
    };
    const response = await request(app)
      .put("/api/shipment/update/1")
      .set("Authorization", "Bearer " + token)
      .send(shipment);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : Data Not Found", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const shipment = {
        add: 5,
    };
    const response = await request(app)
      .put("/api/shipment/update/9999")
      .set("Authorization", "Bearer " + token)
      .send(shipment);
    expect(response.statusCode).toBe(404);
  });

  it("Failed: add Can't be Empty", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const shipment = {
        add: "",
    };
    const response = await request(app)
      .put("/api/shipment/update/1")
      .set("Authorization", "Bearer " + token)
      .send(shipment);
    expect(response.statusCode).toBe(400);
  });

  it("Failed: Invalid Token", async () => {
    const token =
    "";
   
    const shipment = {
        add: 5,
    };
    const response = await request(app)
      .put("/api/shipment/update/1")
      .set("Authorization", "Bearer " + token)
      .send(shipment);
    expect(response.statusCode).toBe(401);
  });

});

describe("API Delete shipment", () => {
  it("Success Delete shipment", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const response = await request(app)
      .delete("/api/shipment/delete/3")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : Data Not Found", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
   
    const response = await request(app)
      .delete("/api/shipment/delete/9999")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(404);
  });

  it("Failed: Invalid Token", async () => {
    const token =
    "";
    const response = await request(app)
      .delete("/api/shipment/delete/1")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(401);
  });

});
