import { Router } from "express";

const router = Router();

//route to get users
router.get("/users", (req,res) => {
    res.send("Getting users")
});

//route to ger user
router.get("/users/:id", (req,res) => {
    const {id} = req.params
    res.send("Getting user" + id)
});

//route to create user
router.post("/users", (req,res) => {
    res.send("Getting users")
});

//route to delete user
router.delete("/users/:id", (req,res) => {
    res.send("Deleting user")
});
//router to update user
router.put("/users/:id", (req,res) => {
    const {id} = req.params
    res.send("updating user" + id)
});

export default router;