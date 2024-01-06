import Joi from 'joi'
import { isString100, isText, isURI } from './mainValidation.js'

export const isProfile = Joi.object({
    email: isString100.email().lowercase().required().label("Email"),
    firstName: isString100.required().label("Firstname"),
    lastName: isString100.required().label("Lastname"),
    dob: Joi.date().less('now').required().label("Date Of Birth"),
    address: isText.required().label("Address"),
    bio: isText.label("Bio"),
    website: isURI.label("Website"),
    github: isURI.label("Gihub"),
    gitlab: isURI.label("Gitlab"),
    instagram: isURI.label("Instagram"),
    facebook: isURI.label("Facebook"),
    twitter: isURI.label("Twitter"),
    linkedin: isURI.label("LinkedIn"),
    discord: isURI.label("Discord")
})