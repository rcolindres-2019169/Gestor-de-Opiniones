'use stict'

import Post from '../post/post.model.js'
import User from '../user/user.model.js'
import Comment from './comment.model.js'
import { checkUpdatePost } from '../utils/validator.js'

export const save =  async (req,res)=>{
    try{
        let data = req.body
        let user = await User.findOne({_id: data.user })
        if(!user) return res.status(404).send({message: 'User not found'})
        let post = await Post.findOne({_id: data.post})
        if(!post) return res.status(404).send({message: 'Post not found'})
        let comment = new Comment(data)
        await comment.save()
        return res.send({message: `Public comment succesfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error public comment', err: err})
    }
}

export const update = async (req,res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let uid = req.user._id
        let update = checkUpdatePost(data, id)
        //let comment = await Comment.findOne({_id: id, user: uid})
        //if(!comment) return res.status(400).send({message: 'Comment not found'})
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedComment = await Post.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        //if(!updatedComment) return res.status(401).send({message: 'Comment not found and not updated'})
        return res.send({message: 'Updated comment', updatedComment})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating comment'})
    }
}


export const deleteU = async (req,res)=>{
    try{ 
        let { id } = req.params
        let uid = req.user._id

        let comment = await Comment.findOne({_id: id, user: uid})
        if(!comment)
        return res.status(404).send({message: 'Comment not found and not deleted'})
        let deletedComment = await Comment.findOneAndDelete({_id: id, user: uid})
        if(!deletedComment) return res.status(404).send({message: 'Error deleting comment'})
        return res.send({message: `Comment deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting comment'})
    }
}