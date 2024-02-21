import Joi from "joi";
import { isString100,  isText, isURI } from "./mainValidation.js";

const nonRequired = {
  avatar: Joi.string().max(255).optional().label("Avatar"),
  bio: isText.label("Bio").allow(null, ""),
  website: isURI.label("Website").allow(null, ""),
  github: isURI.label("Github").allow(null, ""),
  gitlab: isURI.label("Gitlab").allow(null, ""),
  instagram: isURI.label("Instagram").allow(null, ""),
  facebook: isURI.label("Facebook").allow(null, ""),
  twitter: isURI.label("Twitter").allow(null, ""),
  linkedin: isURI.label("LinkedIn").allow(null, ""),
  discord: isURI.label("Discord").allow(null, ""),
};
const isCreateProfile = Joi.object({
  email: isString100.email().lowercase().required().label("Email"),
  firstName: isString100.required().label("Firstname"),
  lastName: isString100.required().label("Lastname"),
  dob: Joi.date().less("now").required().label("Date Of Birth"),
  address: isText.required().label("Address"),
  city: isString100.required().label("City"),
  country: isString100.required().label("Country"),
  job: isString100.required().label("Job"),
  phone: isString100.required().label("Phone"),
  ...nonRequired,
});
const isUpdateProfile = Joi.object({
  email: isString100.email().lowercase().label("Email"),
  firstName: isString100.label("Firstname"),
  lastName: isString100.label("Lastname"),
  dob: Joi.date().less("now").label("Date Of Birth"),
  address: isText.label("Address"),
  city: isString100.label("City"),
  country: isString100.label("Country"),
  job: isString100.label("Job"),
  phone: isString100.label("Phone"),
  ...nonRequired,
});

export { isCreateProfile, isUpdateProfile };
