import Joi from 'joi'
import { isString100, isString255, isText, isURI } from './mainValidation.js'

export const isProfile = Joi.object({
    email: isString100.email().lowercase().required().label("Email"),
    firstName: isString100.required().label("Firstname"),
    lastName: isString100.required().label("Lastname"),
    avatar: Joi.string().max(255).optional().label("Avatar"),
    dob: Joi.date().less('now').required().label("Date Of Birth"),
    address: isText.required().label("Address"),
    city: isString100.required().label("City"),
    country: isString100.required().label("Country"),
    job: isString100.required().label("Job"),
    phone: isString100.required().label("Phone"),
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