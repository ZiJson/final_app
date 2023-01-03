const Query = {
  Project: async (parent, { name }, { ProjectModel }) => {
    if (name) {
      let project = await ProjectModel.findOne({ name });
      return [project]
    }
    else {
      let projects = await ProjectModel.find();
      return projects
    }
  },
  User: async (parent, { name }, { UserModel }) => {
    let user = await UserModel.findOne({ name });
    return user
  }
};
export default Query;