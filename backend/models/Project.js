import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true,
        },
        description: {
            type: String,
            require: true,
            trim: true,
        },
        deliveryDate: {
            type: Date,
            default: Date.now(),
        },
        client: {
            type: String,
            require: true,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        colabs: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            }
        ],
    },
    {
        timestamps: true,
    }
)

const Project = mongoose.model("Project", projectSchema)

export default Project