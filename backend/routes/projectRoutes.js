import express  from "express";

import checkAuth from "../middleware/checkAuth.js";

import { 
    getProjects, 
    newProject, 
    getProject, 
    editProject, 
    deleteProject, 
    addColab, 
    deleteColab, 
    getTasks
} from "../controllers/projectController.js"

const router = express.Router();

router
    .route("/")
    .get(checkAuth, getProjects)
    .post(checkAuth, newProject)


router
    .route("/:id")
    .get(checkAuth, getProject)
    .put(checkAuth, editProject)
    .delete(checkAuth, deleteProject)

router.get("/tasks/:id", checkAuth, getTasks)
router.post("/add-colab/:id",checkAuth, addColab)
router.post("/delete-colab",checkAuth,deleteColab)

export default router