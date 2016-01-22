function notFound(err, req, res, next) {
  console.error("Failed API access: ", err.message);
  res.status(404).send(err.message);
}

module.exports = notFound;