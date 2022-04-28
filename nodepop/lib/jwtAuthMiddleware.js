'use strict';

const jwt = require('jsonwebtoken');

// módulo que exporta un middleware

module.exports = (req, res, next) => {
  // recoger el jwtToken de la cabecera, o de la query-string, o del body
  const jwtToken =
    req.get('Authorization') || req.query.token || req.body.token;

  // comprobar que me han dado un token
  if (!jwtToken) {
    const error = new Error('no token provided');
    error.status = 401;
    next(error);
    return;
  }

  // comprobar que el token es válido
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      const error = new Error('invalid token');
      error.status = 401;
      next(error);
      return;
    }

    req.apiUserId = payload._id;

    // si es válido, continuar
    next();
  });
};
