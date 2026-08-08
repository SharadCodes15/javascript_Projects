const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You dont have access to create a music" });
    }
    req.user = decoded; // createing a new propertry
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorised" });
  }
}

async function authUser(req,res,next) {
    const token = req.cookies.token
    if(!token){
        res.status(401).json({message:"Unauthorised"})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role !== "user" && decoded.role !== "artist"){
            return res.status(403).json({message:"You dont have access to it"})
        }

        req.user = decoded,

        next()
    }
    catch(err){
        console.log(err);
        return res.status(401).json({message:"Unauthorised"});

    }
}

module.exports = {authArtist,authUser}
