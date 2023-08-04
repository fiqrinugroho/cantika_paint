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
    throw new ApiError(httpStatus.NOT_FOUND, "user tidak ditemukan");
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
      "password yang anda masukan salah"
    );
  }
};

const registerNewEmployee = async (reqBody) => {
  const { fullName, username, password, branchId } = reqBody;

  // validasi data yang kosong
  if (!username)
    throw new ApiError(httpStatus.BAD_REQUEST, "username tidak boleh kosong");
  if (!fullName)
    throw new ApiError(httpStatus.BAD_REQUEST, "nama tidak boleh kosong");
  if (!branchId)
    throw new ApiError(httpStatus.BAD_REQUEST, "silahkan pilih cabang untuk user");
  if (!password)
    throw new ApiError(httpStatus.BAD_REQUEST, "password tidak boleh kosong");

  const user = await authRepository.findUsername(username);
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "username telah digunakan");
  }
  // validasi minimum password length
  const passswordLength = password.length >= 8;
  if (!passswordLength) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "password minimal 8 karakter"
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

const editUser = async (reqBody, id) => {
  const { username, fullName, branchId, roleId, password } = reqBody
  
  if(password){
    // validasi minimum password length
    const passswordLength = password.length >= 8;
    if (!passswordLength) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "password minimal 8 karakter"
      );
    }

    const hash = encryptPassword(password);
    let newUser = {
      fullName,
      username,
      branchId,
      roleId,
      password: hash,
    };
    const update = await authRepository.updateUserById(newUser, id);
    if (!update)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "gagal mengupdate user");
  }else{
    let newUser = {
      fullName,
      username,
      branchId,
      roleId,
    }
    const update = await authRepository.updateUserById(newUser, id);
    if (!update)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "gagal mengupdate user");
  }
}
const changePassword = async (reqBody, id) => {
  const { newPassword, password } = reqBody
  if (newPassword === password)
    throw new ApiError(httpStatus.BAD_REQUEST, "password baru tidak boleh sama dengan password sebelumnya");
  // validasi minimum password length
  const passswordLength = newPassword.length >= 8;
  if (!passswordLength) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "password minimal 8 karakter"
    );
  }
  const user = await authRepository.findById(id);
  const isPasswordCorrect = verifyPassword(password, user.password);
  if (!isPasswordCorrect)
    throw new ApiError(httpStatus.BAD_REQUEST, "password yang anda masukan salah");

  const hash = encryptPassword(newPassword);
  const updatePassword = await authRepository.updatePassword(hash, id)
  if(!updatePassword)
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "gagal merubah password");

  const newUser = await authRepository.findById(id);
  return newUser
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

const deleteUserById = async (id) => {
  const user = await authRepository.findById(id);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Tidak Ditemukan");
  } else {
    return await authRepository.deleteUser(id);
  }
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
  getAllUser,
  editUser,
  changePassword,
  deleteUserById
};
