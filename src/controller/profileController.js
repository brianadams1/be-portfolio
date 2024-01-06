import { Prisma } from "../app/prisma.js";
import { Validate } from "../app/validate.js";
import { isProfile } from "../validation/profileValidation.js";

// GET METHOD PROFILE
const get = async (req, res, next) => {
  try {
    // CHECK TO DATABASE
    let profile = await Prisma.profile.findFirst();

    // IF DATA IS EMPTY, SEND DUMMY DATA
    if (!profile) {
      profile = {
        email: "example@email.com",
        firstName: "-",
        lastName: "-",
        dob: "1900-01-01",
        address: "-",
      };
    }

    // IF DATA IS EXIST, SEND DATA
    res.status(200).json({
      message: "SUCCESS GET PROFILE DATA",
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// PUT METHOD PROFILE
const put = async (req, res, next) => {
  try {
    // CHECK TO DATABASE
    let profile = await Prisma.profile.findFirst();

    // GET INPUTTED DATA
    let datas = req.body;

    // VALIDATE THE DATAS
    datas = Validate(isProfile, datas);

    let dataProfile = {};

    // IF DATA IS EMPTY, CREATE NEW DATA FROM INPUT
    if (!profile) {
      dataProfile = await Prisma.profile.create({
        data: datas,
      });
    } else {
      // IF EXIST, UPDATE
      dataProfile = await Prisma.profile.update({
        where: {
          email: profile.email,
        },
        data: datas,
      });

    }

    res.status(200).json({
      message: "DATAS HAS BEEN UPDATED",
      data: dataProfile,
    });
  } catch (error) {
    next(error);
  }
};

export default { get, put };
