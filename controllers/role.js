const Role = require("../models/role");

const rolePost = async (req, res) => {
  const { rol } = req.body;

  const existeRole = await Role.findOne({ rol });

  if (!rol || existeRole) {
    return res.status(400).json({
      msg: "El rol ya esta registrado"
    });
  }

  const roleDB = new Role({ rol });

  await roleDB.save();

  return res.status(201).json({
    msg: "Rol creado"
  });
};

const roleGet = async (req, res) => {
  const roles = await Role.find();

  return res.json({
    roles
  });
};

module.exports = {
  rolePost,
  roleGet
};
