// import models
const { user, role, branch, } = require("../models");

// membuat user baru
const createUser = (createArgs) => {
  return user.create(createArgs);
};

// untuk mencari data sesuai dengan username user
const findUsername = (username) => {
  // cari user berdasarkan username
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
// untuk mencari data sesuai dengan username user
const findUsernameAndId = (username, id) => {
  // cari user berdasarkan username
  const find = user.findOne({
    where: {
      [Op.and]: [
        {username},
        { id }
      ]
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

const updateUserById = async (updateArgs, id) => {
  const {fullName, username, password, roleId, branchId,} = updateArgs
  if(password){
    return await user.update({fullName, username, password, roleId, branchId,}, { 
      where: { id, }, 
      include: [
        {
          model: role,
        },
        {
          model: branch,
        },
      ]
    });
  }else {
    return await user.update({fullName, username, roleId, branchId,}, { 
      where: { id, }, 
      include: [
        {
          model: role,
        },
        {
          model: branch,
        },
      ]
    });
  }

};

const updatePassword = (password, id) => {
  const updated = user.update({password},{
    where: {
      id,
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
  return updated;
};

const getAllUser = () => {
  return user.findAll({attributes: { exclude: ["password",], },});
}

const findById = (id) => {
  // cari user berdasarkan branch id
  const find = user.findOne({
    where: {
      id,
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
const deleteUser = async (id) => {
  return await user.destroy({ 
    where: { id, }, 
  });
};


module.exports = {
  createUser,
  findUsername,
  findUsernameAndId,
  findById,
  getAllUser,
  updateUserById,
  updatePassword,
  deleteUser
};
