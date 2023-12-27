export const logging = (req, res, next) => {
  let time = new Date().toLocaleDateString();
  const log = {
    time: time,
    method: req.method,
    path: req.path,
    query: req.query,
    cookies: req.signedCookies,
    protocol: req.protocol,
    body: req.body,
  };
  console.info(log);
  // save to database
  console.log("===============================");
  console.log("Waiting to save log to database");
  next();
};
