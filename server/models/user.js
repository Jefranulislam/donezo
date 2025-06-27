import { Schema } from "mongoose";


const userSchema = new Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    role: {type: String, required: true},
    email: {type: String, required: true,unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default:false},
    task: [{type: Schema.Types.ObjectId, ref: "Task"}],
    isActive: [{type: Boolean, default: true}],
},{
    timestamps: true
});


userSchema.pre("Save", async function (next) {
    if(!this.isModified("Password")){
        next();
    }

    const salt = await bcrypt.getSalt();
    this.password  = await bcrypt.hash(this.password, salt);
    
});


userSchema.method.matchPassword = async (enteredPassword ) => {
    return await bcrypt.compare(enteredPassword, this.password);
}


export default userSchema;