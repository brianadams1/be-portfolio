import Joi from "joi";
import { isString100, isString255, isText, isURI } from "./mainValidation.js";

export const isProfile = Joi.object({
  email: isString100.email().lowercase().required().label("Email"),
  firstName: isString100.required().label("Firstname"),
  lastName: isString100.required().label("Lastname"),
  avatar: Joi.string().max(255).optional().label("Avatar"),
  dob: Joi.date().less("now").required().label("Date Of Birth"),
  address: isText.required().label("Address"),
  city: isString100.required().label("City"),
  country: isString100.required().label("Country"),
  job: isString100.required().label("Job"),
  phone: isString100.required().label("Phone"),
  bio: isText.label("Bio").allow(null, ""),
  website: isURI.label("Website").allow(null, ""),
  github: isURI.label("Gihub").allow(null, ""),
  gitlab: isURI.label("Gitlab").allow(null, ""),
  instagram: isURI.label("Instagram").allow(null, ""),
  facebook: isURI.label("Facebook").allow(null, ""),
  twitter: isURI.label("Twitter").allow(null, ""),
  linkedin: isURI.label("LinkedIn").allow(null, ""),
  discord: isURI.label("Discord").allow(null, ""),
});
