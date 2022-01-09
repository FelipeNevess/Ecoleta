import { Router } from "express";

const router = Router();

router.get('/items', (req, res) => {
  return res.json({
    hello: "Hello world"
  })
})

export { router }
