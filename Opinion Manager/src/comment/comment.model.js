import  {Schema, model}  from 'mongoose';

const commentSchema = Schema({
  content: { 
    type: String, 
    required: true 
},
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
},
  date: { 
    type: Date, 
    default: Date.now
 },
});

export default model ('comment', commentSchema)