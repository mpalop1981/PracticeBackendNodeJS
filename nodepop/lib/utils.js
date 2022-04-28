function isAPIRequest(req) {
  return req.originalUrl.startsWith('/api/');
}

module.exports = isAPIRequest;
