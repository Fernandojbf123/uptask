import Project from "../models/Project.js";

const getProjects = async (req,res) => {
    try {
        const projects = await Project.find().where("createdBy").equals(req.user._id)
        res.status(200).json(projects)    
    } catch (error) {
        return res.status(403).json({msg: error.message})
    }
    
};

const newProject = async (req,res) => {
    const project = new Project(req.body);
    project.createdBy = req.user._id;
    try {
        const storedProject = await project.save();
        return res.status(200).json(storedProject);
    } catch (error) {
        res.status(404).json({msg: error.message})
    }
};

const getProject = async (req,res) => {
    const { id } = req.params;
    try {
        const project = await Project.findById(id)    
        if (!project) {
            const error = new Error("Project was not found")
            return res.status(404).json({msg: error.message})
        }
        
        if( project.createdBy.toString() !== req.user._id.toString() ){
            const error = new Error("Invalid action")
            return res.status(403).json({msg: error.message})
        }

        return res.status(200).json(project)

    } catch (error) {
        console.log(error.message)
        return res.status(401).json(error.message)
    }
};



const editProject = async (req,res) => {
    const {id} = req.params;
    try {
        const project = await Project.findById(id);
        if (!project) {
            const error = new Error("Project was not found")
            return res.status(404).json({msg: error.message})
        }
        
        if(project.createdBy.toString() !== req.user._id.toString() ){
            const error = new Error("Invalid action")
            return res.status(403).json({msg: error.message})
        }

        project.name = req.body.name || project.name
        project.description = req.body.description || project.description
        project.deliveryDate = req.body.deliveryDate || project.deliveryDate
        project.client = req.body.client || project.client

        const storedProject = await project.save()
        return res.status(200).json(storedProject)
        
    } catch (error) {
        return res.status(400).json({msg: error.message})
    }

};

const deleteProject = async (req,res) => {
    const {id} = req.params;
    try {
        const project = await Project.findById(id);

        if (!project) {
            const error = new Error("Project was not found")
            res.status(404).json({msg: error.message})
        }
        
        if(project.createdBy.toString() !== req.user._id.toString() ){
            const error = new Error("Invalid action")
            return res.status(401).json({msg: error.message})
        }
   
        await project.deleteOne();
        res.status(200).json({ msg: "Project deleted" });

    } catch (error) {
        res.status(401).json({msg: error.message})
    }

};

const addColab = async (req,res) => {
    
};

const deleteColab = async (req,res) => {
    
};

const getTasks = async (req,res) => {
    
};

export { 
    getProjects, 
    newProject, 
    getProject, 
    editProject, 
    deleteProject, 
    addColab, 
    deleteColab, 
    getTasks
};