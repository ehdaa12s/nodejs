import express from 'express';
import console from 'console';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express(); // create server 


let comments = [
    {
"id": 1,
"author": "Ehdaa",
"body": "This is a comment."
},
{"id": 2,
"author": "Jo",
"body": "This is another comment."
    },
{"id": 3,
"author": "Islam",
"body": "Yet another comment."
}
];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//middleware to serve static files
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // middleware to parse JSON bodies all

 // serve home screen

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

//get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});
// Get single comment
app.get("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  res.json(comment);
});

// create a new comment
app.post('/comments', (req, res) => {
    const newComment = req.body;
  newComment.id = comments.length+1;
  if(!newComment.author || !newComment.body ){
    return res.status(400).json({ message: "Author and body are required" });
  }
    comments.push(newComment);
    res.status(201).json(newComment);
});

// update a comment
app.put('/comments/:id', (req, res) => {
    const commentId = parseInt(req.params.id);
    const updatedComment = req.body;
    let isFound = comments.find(comment => comment.id === commentId);
    if(isFound){
        isFound.author=req.body.author;
        isFound.body=req.body.body;
        res.status(200).json({ message :"Comment updated successfully" , data:isFound});
    } else {
        res.status(404).send("Comment not found");  
    }
});

// delete a comment
app.delete('/comments/:id', (req, res) => {
    const commentId = parseInt(req.params.id);
    comments = comments.filter(comment => comment.id !== commentId);
    if(comments){
        res.status(200).send("Comment deleted   ");
    } else {
        res.status(404).send("Comment not found");
    }
});

  // start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
