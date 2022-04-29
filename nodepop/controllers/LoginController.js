'use strict';

const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

class LoginController {
  // login post desde API que retorna JWT
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email });

      // si no lo encuentro o no coincide la contraseña --> error
      if (!usuario || !(await usuario.comparePassword(password))) {
        res.json({ error: 'invalid credentials' });
        return;
      }

      // generamos un JWT
      jwt.sign(
        { _id: usuario._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '2d',
        },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          // delvovemos el token generado
          res.json({ token: jwtToken });
        },
      );
    } catch (err) {
      next(err);
    }
  }
}
module.exports = LoginController;
