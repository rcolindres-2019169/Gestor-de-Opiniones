'use strict'

import Post from './post.model.js'
import User from '../user/user.model.js'
import Category from '../category/category.model.js'
import {  checkUpdatePost } from '../utils/validator.js'

export const save =  async (req,res)=>{
    try{
        let data = req.body
        let user = await User.findOne({_id: data.user })
        if(!user) return res.status(404).send({message: 'User not found'})
        let category = await Category.findOne({_id: data.category})
        if(!category) return res.status(404).send({message: 'Category not found'})
        let post = new Post(data)
        await post.save()
        return res.send({message: `Public post succesfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error public post', err: err})
    }
}

export const update = async (req,res) =>{
    try{
        let { id } = req.params
        let data = req.body
        let user = await User.findOne({_id: data.user })
        if(!user) return res.status(404).send({message: 'User not found'})
        let category = await Category.findOne({_id: data.category})
        if(!category) return res.status(404).send({message: 'Category not found'})
        let update = checkUpdatePost(data, id)
        if(!update) return res.status(400).send({message: 'Have submitted some data that cannot be updated or missing data'})
        let updatedPost = await Post.findOneAndUpdate(
            {_id: id},
            data, 
            {new: true}
        )
        if(!updatedPost) return res.status(401).send({message: 'Post not found and not updated'})
        return res.send({message: 'Updated post', updatedPost})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating post'})
    }
}


export const deleteU = async (req,res)=>{
    try{ 
        let { id } = req.params
        let deletedPost = await Category.findOneAndDelete({_id: id})
        if(!deletedPost) return res.status(404).send({message: 'Post not found and not deleted'})
        return res.send({message: `Post with tittle ${deletedPost.tittle} deleted successfully`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error deleting post'})
    }
}