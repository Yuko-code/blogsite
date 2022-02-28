const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

mongoose.connect('mongodb://localhost:27017/blog-site',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected")
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/blogs',async(req,res) => {
    const blogs = await Blog.find({});
    res.render('blogs/index',{blogs})

})

app.get('/makeblog', async(req, res)=>{
    const blog = new Blog({
        title: 'My first blog',
        date: '22/2/22',
        text: 'This is my first blog post, I hope you will enjoy.'
    });
    await blog.save();
    res.send(blog)
})

app.get('/blogs/new',(req, res)=>{
    res.render('blogs/new');
})

app.post('/blogs', async(req, res)=>{
    const blog = new Blog(req.body.blog);
    await blog.save();
    res.redirect(`/blogs/${blog._id}`);
})

app.get('/blogs/:id', async(req, res) =>{
    const blog=await Blog.findById(req.params.id)
    res.render('blogs/show',{blog});
})

app.listen(3000, ()=>{
    console.log('serving on port 3000')
})