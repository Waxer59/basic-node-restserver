const { Router } = require("express");
const { param, body } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    param("id", "No es un ID valido").isMongoId(),
    param("id", "No existe un usuario con ese ID").custom(existeUsuarioPorId),
    body("rol", "No es un rol valido").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    body("nombre").not().isEmpty(),
    body("password").isLength({
      min: 6,
    }),
    body("correo", "El correo no es valido").isEmail(),
    body("correo", "EL correo ya esta registrado").custom(emailExiste),
    body("rol", "No es un rol valido").custom(esRoleValido),
    validarCampos
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    param("id", "No es un ID valido").isMongoId(),
    param("id", "No existe un usuario con ese ID").custom(existeUsuarioPorId),
    validarCampos
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
