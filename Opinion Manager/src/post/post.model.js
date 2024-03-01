import  {Schema, model}  from 'mongoose';

const postSchema = Schema({
  tittle: { 
    type: String, 
    required: true 
},
  category: { 
    type: Schema.Types.ObjectId,
    ref: 'category', 
    required: true 
},
  content: 
  { type: String, 
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
comments: {
    type: Schema.Types.ObjectId, 
    ref: 'comment' },
    default: []
}
);

export default model ('post', postSchema)