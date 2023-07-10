// import models
const { user, role, branch, } = require("../models");

// membuat user baru
const createUser = (createArgs) => {
  return user.create(createArgs);
};

// untuk mencari data sesuai dengan username user
const findUsername = (username) => {
  // cari user berdasarkan email
  const find = user.findOne({
    where: {
      username,
    },
    include: [
    {
      model: role,
    },
    {
      model: branch,
    },
  ]
  });
  return find;
};

const getAllUser = () => {
  return user.findAll({attributes: { exclude: ["password",], },});
}

const findByBranch = (id) => {
  // cari user berdasarkan branch id
  const find = user.findOne({
    where: {
      id,
    },
    include: {
      model: role,
    },
  });
  return find; 
};

module.exports = {
  createUser,
  findUsername,
  findByBranch,
  getAllUser,
};
