import { ProjectModel, UserModel } from "../models/db.js";

const validateProject = async (name, content) => {
    let project = await ProjectModel.findOne({ name });
    if (!project)
        project = await new ProjectModel
            ({ name, content }).save();
    return project
};
const checkOutProject = async (name, content="empty") => {
    let poject = await validateProject(name, content );
    return poject
}
const checkOutUser = async (name, contact="empty", intro="") => {
    let user = await UserModel.findOne({name});
    if(!user){
        user = await new UserModel({
            name,
            contact,
            intro
        }).save()
    }
    return user
}

const Mutation = {

    createProject: async (parent, { name, content }, {ProjectModel}) => {
        let project = await ProjectModel.findOne({name});
        if(project) return new Error(
            "Error: Project title already exists!"
          )
        return checkOutProject(name, content);
    },
    createUser: (parent, { name, contact, intro }) => {
        let user = checkOutUser(name, contact, intro);
        return user
    },
    addUser: async (parent, { projectName, username }, {ProjectModel}) => {
        let user = await checkOutUser(username);
        let project = await ProjectModel.findOneAndUpdate({name:projectName},{$push: {users:user}})
        return project
    },
    removeProject: async (parent, { name }, {ProjectModel}) =>{
        try {
            await ProjectModel.deleteOne({name})
        }
        catch(e){
            return "error"
        }
        return "Success"
    }
};
export { Mutation as default };