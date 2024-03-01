import  {Schema, model}  from 'mongoose';

const commentSchema = Schema({
  content: { 
    type: String, 
    required: true 
},
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
},
  date: { 
    type: Date, 
    default: Date.now
 },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    required: true
  },
});

export default model ('comment', commentSchema)