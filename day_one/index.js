const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;


let users = [
  { id: 1, name: "Ehdaa", age: 22 },
  { id: 2, name: "Jo", age: 22 },
  { id: 3, name: "Islam", age: 25 }
];


const readPosts = () => {
  const file = path.join(__dirname, "posts.json");
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]");
  }
  return JSON.parse(fs.readFileSync(file));
};

const writePosts = (data) => {
  const file = path.join(__dirname, "posts.json");
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};


http.createServer((req, res) => {

  console.log(req.method, req.url); 

  if (req.url === "/" && req.method === "GET") {
    const page = fs.readFileSync(path.join(__dirname, "home_screen.html"), "utf-8");
    res.setHeader("Content-Type", "text/html");
    return res.end(page);
  }
 
 // create a new post
  if (req.url === "/posts" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      let posts = readPosts();
      let data;
      try {
        data = JSON.parse(body);
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
      const nextId = posts.length ? Math.max(...posts.map(p => Number(p.id) || 0)) + 1 : 1;
      const newPost = { id: nextId, ...data };
      posts.push(newPost);
      writePosts(posts);
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(newPost));
    });
    return;
  }

  // get all posts
  if (req.url === "/posts" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(readPosts()));
  }

  // get post by id
  if (req.method === "GET" && req.url.startsWith("/posts/")) {
    const id = req.url.split("/")[2];
    const post = readPosts().find(p => p.id == id);
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(post || { message: "Post Not Found" }));
  }

  // update post by id
  if (req.method === "PUT" && req.url.startsWith("/posts/")) {
    const id = req.url.split("/")[2];
    let body = "";
    req.on("data", chunk => body += chunk);
    req.on("end", () => {
      let posts = readPosts();
      let updated = false;
      posts = posts.map(p => {
        if (p.id == id) {
          updated = true;
          let patch = {};
          try {
            patch = JSON.parse(body);
          } catch {
            patch = {};
          }
          return { ...p, ...patch };
        }
        return p;
      });
      writePosts(posts);
      res.setHeader("Content-Type", "application/json");
      return res.end(updated ? JSON.stringify({ message: "Post Updated" }) : JSON.stringify({ message: "Post Not Found" }));
    });
    return;
  }

  // delete post by id
  if (req.method === "DELETE" && req.url.startsWith("/posts/")) {
    const id = req.url.split("/")[2];
    let posts = readPosts();
    const before = posts.length;
    const filtered = posts.filter(p => p.id != id);
    writePosts(filtered);
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(before !== filtered.length ? { message: "Post Deleted" } : { message: "Post Not Found" }));
  }


  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");

}).listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
