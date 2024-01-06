import { Prisma } from "../app/prisma.js";

const profileMessage = { message: "OK from Profile Page", status: 200 };

// GET METHOD PROFILE
const get = async (req, res, next) => {
  try {
    
    // CHECK TO DATABASE
    let profile = await Prisma.profile.findFirst()
  
    // IF DATA IS EMPTY, SEND DUMMY DATA
    if(!profile) {
      profile = 'DUMMY DATAS'
    }
  
    // IF DATA IS EXIST, SEND DATA
    res.status(200).json({
      message:"SUCCESS GET PROFILE DATA",
      data: profile
    });
  } catch (error) {
    next(error)
  }
};

// PUT METHOD PROFILE
const put = (req, res, error) => {
  try {
    
    res.status(200).json(
      {
        message: "",
      }
    );
  } catch (error) {
  next(error)    
  }
};


export default { get, put};
