import express from "express"
import cors from "cors"

import usersRouter from "./routers/users.router.js"
import profileRouter from "./routers/profiles.router.js"
import postsRouter from "./routers/posts.router.js"
import commentsRouter from "./routers/comments.router.js"

import notFoundHandler from "./middelwares/notFoundHandler.js"
import errorHandler from "./middelwares/errorHandler.js"

const startServer = () => {
    const app = express();
   
    app.use(cors());
    app.use(express.json());


    app.use("/api/posts", postsRouter)
    app.use("/api/users", usersRouter)
    app.use("/api/profile", profileRouter)
    app.use("/api/comments", commentsRouter)

    app.use(errorHandler)
    app.use(notFoundHandler)
   
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`Server running on ${port} port`));
}
export default startServer;