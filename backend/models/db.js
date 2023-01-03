import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:
            [true, 'Name field is required.']
    },
    contact: {
        type: String,
        required:
            [true, 'Contact field is required.']
    },
    intro: {
        type: String,
    }
});
const UserModel = mongoose.model('User', UserSchema)


const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required:
            [true, 'Name field is required.']
    },
    content: {
        type: String,
        required:
            [true, 'Contact field is required.']
    },
    users: [{
        name: {
            type: String,
            required:
                [true, 'Name field is required.']
        },
        contact: {
            type: String,
            required:
                [true, 'Contact field is required.']
        },
        intro: {
            type: String,
        }
    }]
});
const ProjectModel =
    mongoose.model('Project', ProjectSchema)

export {ProjectModel, UserModel}