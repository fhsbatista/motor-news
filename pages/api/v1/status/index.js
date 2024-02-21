function status(request, response) {
  response.status(200).json({ "primeiro endpoint": "OK" });
}

export default status;
