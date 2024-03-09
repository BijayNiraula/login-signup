const errorHanderMidleware = (err, req, res, next) => {
  if (err) {
    console.log(err);
    const status = err.status || 500;
    if (status == 500) {
      res
        .status(status)
        .send({ status: "error", message: "Internal server error" });
    } else {
      res.status(status).send({ status: "error", message: err.message });
    }
  } else {
    next();
  }
};
export default errorHanderMidleware;
