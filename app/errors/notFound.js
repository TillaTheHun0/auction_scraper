function notFound(req, res) {
  res.status(404).json({error: "endpoint not found"});
}

module.exports = notFound;