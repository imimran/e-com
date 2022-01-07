import express from "express";
// import MemberRouter from "./member/memberRouter";


const router = express.Router();


// router.use("/album", AlbumRouter);
router.all("*", (_req, res) => {
  res.status(404).send("Route not found");
});

export { router };
