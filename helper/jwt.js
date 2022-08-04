var jwt = require("jsonwebtoken");
const { options } = require("../routes/categories");
// function jwt() {
//   const secret = process.env.JWT_SECRET;
//   return expressJwt({ secret, algorithms: ["HS256"] }).unless({
//     path: [
//       {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
//       {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
//       `${api}/users/login`,
//       `${api}/users/register`,
//   ]
//   });
// }

// exports.requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ["HS256"],
//   userProperty: "auth",
// });
const auth = (req, res, next) => {
 try {
  
  let token = req.headers.authorization;
  if (token) {
     token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET);
  } else{
    res.status(401).json({ message: "Auth failed" });
  }
  next();

  req.userId=user.id;
 } catch (error) {
  
 }
};
module.exports = auth;

// module.exports = exports.requireSignin;
