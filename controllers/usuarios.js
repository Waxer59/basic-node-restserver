const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "No name", apikey, page, limit } = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  if (!isNaN(Number(limite)) == false || !isNaN(Number(desde)) == false) {
    res.json({
      msg: "La consulta introducida no es valida",
    });
  } else {
    const [total, usuarios] = await Promise.all([
      await Usuario.countDocuments(query),
      await Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite)),
    ]);
  
    res.json({
      total,
      usuarios,
    });
  }
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO validar contra base de datos

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto);
  res.json(usuario);
};

const usuariosPost = async (req, res) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Gyardar en DB

  await usuario.save();

  res.json({
    msg: "post API - controlador",
    usuario,
  });
};

const usuariosDelete = async(req, res) => {
  const {id} = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete(id);

  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

  res.json(usuario);
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
};
