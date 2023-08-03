const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { // comprobar si hay errores
    return res.status(400).json(errors);
  }

  next(); // si no hay errores pasar los argumentos
};

module.exports = {
  validarCampos,
};