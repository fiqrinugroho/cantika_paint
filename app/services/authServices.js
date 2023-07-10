const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const authRepository = require("../repositories/authRepository");
const { JWT_SIGNATURE_KEY, } = require("../../config/application");

const login = async (reqBody) => {
  const { username, password, } = reqBody;
  const user = await authRepository.findUsername(username);

  // gagal melanjutkan karena username nya tidak ada
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  // check password user, jika success login dapat response yang isinya TOKEN
  const isPasswordCorrect = verifyPassword(password, user.password);
  if (user && isPasswordCorrect) {
    const accessToken = createToken(user);
    return {
      id: user.id,
      name: user.fullName,
      roleId: user.roleId,
      role: user.role.roleName,
      branchId: user.branchId,
      location: user.branch.location,
      accessToken,
    };
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "The password you entered is incorrect"
    );
  }
};

const registerNewEmployee = async (reqBody) => {
  const { fullName, username, password, branchId} = reqBody;

  // validasi data yang kosong
  if (!username)
    throw new ApiError(httpStatus.BAD_REQUEST, "username cannot be empty");
  if (!fullName)
    throw new ApiError(httpStatus.BAD_REQUEST, "full name cannot be empty");
  if (!branchId) 
    throw new ApiError(httpStatus.BAD_REQUEST, "last name cannot be empty");
  if (!password)
    throw new ApiError(httpStatus.BAD_REQUEST, "password cannot be empty");

  const user = await authRepository.findUsername(username);
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "username already used");
  }
  // validasi minimum password length
  const passswordLength = password.length >= 8;
  if (!passswordLength) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "minimum password length must be 8 charater or more"
    );
  }

  const hash = encryptPassword(password);
  const createUser = {
    fullName,
    username,
    branchId,
    password: hash,
  };
  // membuat user
  await authRepository.createUser(createUser);
  // mencari user yang baru dibuat
  const newUser = await authRepository.findUsername(username);
  const accessToken = createToken(newUser);
  return {
    id: newUser.id,
    name: newUser.fullName,
    username: newUser.username,
    roleId: newUser.roleId,
    role: newUser.role.roleName,
    branchId: newUser.branchId,
    location: newUser.branch.location,
    accessToken,
  };
};

const getAllUser = async () => {
  const getUser = await authRepository.getAllUser();
  return getUser;
}

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.fullName,
      username: user.username,
      roleId: user.roleId,
      branchId: user.branchId,
    },
    JWT_SIGNATURE_KEY
  );
};

// const decodeToken = (token) => {
//   return jwt.verify(token, JWT_SIGNATURE_KEY);
// };

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const verifyPassword = (password, encryptedPassword) => {
  return bcrypt.compareSync(password, encryptedPassword);
};

module.exports = {
  login,
  registerNewEmployee,
  getAllUser
};
