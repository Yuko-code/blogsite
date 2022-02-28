const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('../models/blog');

mongoose.connect('mongodb://localhost:27017/blog-site',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected")
});

const seedDB = async() =>{
    const b =new Blog({
        title:'This is my third blog!',
        date:'23/2/22',
        text: 'This is my third blog, I hope you will enjoy.'
        }
    );
    await b.save();
}

seedDB().then(()=>{
    mongoose.connection.close();
});