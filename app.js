import express from "express";
import bodyparser from "body-parser";

const app = express();
let posts= [];
const port = process.env.port || 3000;
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",(req,res)=>
{
    res.render("index");
});

app.get("/delete/:id",(req,res)=>{
    const id=req.params.id;
    posts=posts.filter(p => p.id!=id);
    res.redirect("/");
});
app.get("/edit/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = posts.find(p => p.id === postId);
    console.log(post);
  if (!post) {
    return res.send("❌ Post not found");
  }

  res.render("edits", { post });
});
app.post("/edit/:id", (req, res) => {
  const postId = Number(req.params.id);
     console.log(postId);
  const postIndex = posts.findIndex(p => p.id === postId);

  if (postIndex === -1) {
    return res.send("Post not found");
  }

  // update post
  posts[postIndex].title = req.body.title;
  posts[postIndex].content = req.body.content;

  res.redirect("/");
});

app.get("/new", (req, res) => {
  res.render("new"); // render views/new.ejs
   
});

app.post("/create",(req,res)=>
{
    const title = req.body.title;
    const content = req.body.content;

    const newpost = {
        id:Date.now(),
        title:title,
        content:content
    }
    console.log(newpost);
   posts.push(newpost);
    res.redirect("/");
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
