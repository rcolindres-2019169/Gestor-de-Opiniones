'use stict'

import Post from './post.model.js'
import { checkUpdate } from '../utils/validator.js'

export const save =  async (req,res)=>{
    try{
        let data = req.body
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
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedComment = await Post.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedComment) return res.status(401).send({message: 'Comment not found and not updated'})
        return res.send({message: 'Updated comment', updatedComment})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating comment'})
    }
}


export const deleteU = async (req,res)=>{
    try{ 
        let { id } = req.params
        let deletedComment = await Category.findOneAndDelete({_id: id})
        if(!deletedComment) return res.status(404).send({message: 'Comment not found and not deleted'})
        return res.send({message: `Comment with tittle ${deletedComment.tittle} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting comment'})
    }
}