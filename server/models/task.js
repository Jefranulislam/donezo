import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    priority: { type: String, default: "Normal", enum: ["High", "Medium", "Normal", "Low"] },
    stage: { type: String, default: "Normal", enum: ["todo", "in progress", "completed"] },
    activities: [{
        type: {
            type: String,
            default: "assigned",
            enum: ["assigned", "stated", "in progress", "bug", "Completed", "commented"]
        },
        activity: String,
        date: { type: Date, default: Date.now },
        by: { type: Schema.Types.ObjectId, ref: "User" }
    }],
    subTask: [
        {
            title: String,
            date: Date,
            tag: String,
        }
    ],
    assets: [String],
    team: [{
        type: Schema.Types.ObjectId, ref: "User"
    }],
    isTrashed: {
        type: Boolean, default: false
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;