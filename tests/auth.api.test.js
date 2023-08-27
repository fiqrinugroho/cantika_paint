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

describe("API Login", () => {
  it("Success login", async () => {
    const user = {
      username : "irwan",
      password: "qwerty123",
    };
    const response = await request(app).post("/api/auth/login").send(user);
    expect(response.statusCode).toBe(200);
  });

  it("Failed login : wrong password", async () => {
    const failedUser = {
      username : "irwan",
      password: "1234",
    };
    const response = await request(app).post("/api/auth/login").send(failedUser);
    expect(response.statusCode).toBe(400);
  });

  it("Failed login : user not registered", async () => {
    const failedUser = {
      username : "joker",
      password: "1234656",
    };
    const response = await request(app).post("/api/auth/login").send(failedUser);
    expect(response.statusCode).toBe(404);
  });
});

describe("API Admin Register New User", () => {

  it("Success register", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";

    const newUser = {
      fullName: `fiqri ${randomString}`,
      username: `fiqri${randomString}`,
      branchId: 2,
      password: "qwerty123",
    };
    const response = await request(app).post("/api/auth/register")
      .set("Authorization", "Bearer " + token)
      .send(newUser);
    expect(response.statusCode).toBe(201);
  });

  it("Failed register : username already taken", async () => {
       const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";

    const failedNewUser = {
      fullName: "Irwan Dinata",
      userName: "irwan",
      branchId: 2,
      password: "qwerty123",
    };
    const response = await request(app).post("/api/auth/register")
      .set("Authorization", "Bearer " + token)
      .send(failedNewUser);
    expect(response.statusCode).toBe(400);
  });
});

describe("API Get All User", () => {
  it("Success", async () => {
       const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";

    const response = await request(app).get("/api/auth/user")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : Only Admin can Access", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Ik11aGFtbWFkIFNhZGRhbSBIdXNzZWluIiwidXNlcm5hbWUiOiJhZGFtIiwicm9sZUlkIjoyLCJicmFuY2hJZCI6MiwiaWF0IjoxNjkyNzcyNTgwfQ.3Dnke9pibTReA7Jdy8JsgzY-mI4caS3Hgx5oxYOOJWk";

    const response = await request(app).get("/api/auth/user")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(403);
  });

  it("Failed : Invalid Token", async () => {
    const token =
    "";

    const response = await request(app).get("/api/auth/user")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(401);
  });
});

describe("API Delete User", () => {
  it("Success", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjEsImJyYW5jaElkIjowLCJpYXQiOjE2ODY3MjY5NTN9.1rVUvSMTL9HRch4zTKt3XS4mI6Imk92RvHC4oZlEoto";
  
    const response = await request(app).delete("/api/auth/delete/10")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : User Not Found", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjEsImJyYW5jaElkIjowLCJpYXQiOjE2ODY3MjY5NTN9.1rVUvSMTL9HRch4zTKt3XS4mI6Imk92RvHC4oZlEoto";
    const response = await request(app).delete("/api/auth/delete/9999")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(404);
  });

  it("Failed : Only Admin can Access", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Ik11aGFtbWFkIFNhZGRhbSBIdXNzZWluIiwidXNlcm5hbWUiOiJhZGFtIiwicm9sZUlkIjoyLCJicmFuY2hJZCI6MiwiaWF0IjoxNjkyNzcyNTgwfQ.3Dnke9pibTReA7Jdy8JsgzY-mI4caS3Hgx5oxYOOJWk";
  
    const response = await request(app).delete("/api/auth/delete/7")
      .set("Authorization", "Bearer " + token);
  
    expect(response.statusCode).toBe(403);
  });

  it("Failed : Invalid Token", async () => {
    const token =
    "";
  
    const response = await request(app).delete("/api/auth/delete/7")
      .set("Authorization", "Bearer " + token);
    expect(response.statusCode).toBe(401);
  });
});

describe("API Edit User", () => {
  it("Success", async () => {
       const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
    const User = {
      fullName: "Fiqri Nugroho",
      username: "fiqri",
      branchId: 2,
      roleId  : 2,
      password: "qwerty123",
    };
    const response = await request(app).put("/api/auth/editUser/7")
      .set("Authorization", "Bearer " + token)
      .send(User);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : Password minimum 8 character", async () => {
       const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Iklyd2FuIERpbmF0YSIsInVzZXJuYW1lIjoiaXJ3YW4iLCJyb2xlSWQiOjIsImJyYW5jaElkIjoyLCJpYXQiOjE2OTI3NzUyNTR9.QcslFp4UnzGx_b9u-vAEE0hGCg2qhddUmR16G4lff2M";
    const User = {
      fullName: "Fiqri Nugroho",
      username: "fiqri",
      branchId: 2,
      roleId  : 2,
      password: "123",
    };
    const response = await request(app).put("/api/auth/editUser/7")
      .set("Authorization", "Bearer " + token)
      .send(User);
    expect(response.statusCode).toBe(400);
  });

  it("Failed : Only Admin can Access", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";
  
    const User = {
      fullName: "Fiqri Nugroho",
      username: "fiqri",
      branchId: 2,
      roleId  : 2,
      password: "qwerty123",
    };
    const response = await request(app).put("/api/auth/editUser/7")
      .set("Authorization", "Bearer " + token)
      .send(User);
  
    expect(response.statusCode).toBe(403);
  });

  it("Failed : Invalid Token", async () => {
    const token =
    "";
    const User = {
      fullName: "Fiqri Nugroho",
      username: "fiqri",
      branchId: 2,
      roleId  : 2,
      password: "qwerty123",
    };
    const response = await request(app).put("/api/auth/editUser/7")
      .set("Authorization", "Bearer " + token)
      .send(User);
    expect(response.statusCode).toBe(401);
  });
});

describe("API Change Password User", () => {
  it("Success", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";
    const userPasword = {
      newPassword : "qwerty1234",
      password: "qwerty123",
    };
    const response = await request(app).put("/api/auth/changePassword")
      .set("Authorization", "Bearer " + token)
      .send(userPasword);
    expect(response.statusCode).toBe(200);
  });

  it("Failed : New Password Same as the Old Password", async () => {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";
    const userPasword = {
      newPassword : "qwerty1234",
      password: "qwerty1234",
    };
    const response = await request(app).put("/api/auth/changePassword")
      .set("Authorization", "Bearer " + token)
      .send(userPasword);
    expect(response.statusCode).toBe(400);
  });

  it("Failed : Password minimum 8 character", async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6ImZpcXJpIiwidXNlcm5hbWUiOiJmaXFyaSIsInJvbGVJZCI6MiwiYnJhbmNoSWQiOjIsImlhdCI6MTY5MzExODM5OH0.tH7OCFnJgiGeuxnsq4WAV2xXOZyL6xADtn1PnBT9Ggo";
    const userPasword = {
      newPassword : "123",
      password: "qwerty1234",
    };
    const response = await request(app).put("/api/auth/changePassword")
      .set("Authorization", "Bearer " + token)
      .send(userPasword);
    expect(response.statusCode).toBe(400);
  });

  it("Failed : Invalid Token", async () => {
    const token =
    "";
    const userPasword = {
      newPassword : "12345678",
      password: "qwerty1234",
    };
    const response = await request(app).put("/api/auth/changePassword")
      .set("Authorization", "Bearer " + token)
      .send(userPasword);
    expect(response.statusCode).toBe(401);
  });
});