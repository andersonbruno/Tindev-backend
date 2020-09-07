import { Schema, model, Model, Document } from 'mongoose';

const DevSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    bio: String,
    avatar: {
        type: String,
        require: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        Ref: 'Dev'
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        Ref: 'Dev'
    }]
},{
    timestamps: true
});

interface IDevSchema extends Document {
    name: string;
    user: string;
    bio: string;
    avatar: string;
}

export interface IDev extends IDevSchema {
    likes?: IDevSchema["_id"];
    dislikes?: IDevSchema["_id"];
}

export interface IDev_populated extends IDevSchema {
    likes?: IDevSchema;
    dislikes?: IDevSchema;
}

export default model<IDev>('Dev', DevSchema);