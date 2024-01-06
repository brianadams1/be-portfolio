import Joi from 'joi'
import { isString100, isText } from './mainValidation.js'

export const isProfile = Joi.object({
    email: isString100.email().lowercase().required().label("Email"),
    firstName: isString100.required().label("Firstname"),
    lastName: isString100.required().label("Lastname"),
    dob: Joi.date().less('now').required().label("Date Of Birth"),
    address: isText.required().label("Address"),
    bio: isString100.label("Bio"),
    website: isString100.label("Website"),
    github: isString100.label("Gihub"),
    gitlab: isString100.label("Gitlab"),
    instagram: isString100.label("Instagram"),
    facebook: isString100.label("Facebook"),
    twitter: isString100.label("Twitter"),
    linkedin: isString100.label("LinkedIn"),
    discord: isString100.label("Discord")
})