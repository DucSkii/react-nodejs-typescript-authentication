// IMPORTS
import mongoose, { Error } from 'mongoose'
import express, { Request, Response } from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import User from './User'
import { UserInterface } from './Interfaces/UserInterface'

mongoose.connect("mongodb+srv://ducskii:admin@cluster0.wdo3b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err: Error) => {
  if (err) throw err
  console.log("Connected to Mongo")
})

const LocalStrategy = passportLocal.Strategy

// MIDDLEWARE
const app = express()
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
)
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err: Error, user: any) => {
    if (err) throw err
    if (!user) return done(null, false)
    bcrypt.compare(password, user.password, (err, result) => {
      if (result === true) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  })
}))

passport.serializeUser((user: any, cb) => {
  cb(null, user.id)
})
passport.deserializeUser((id: string, cb) => {
  User.findOne({ _id: id }, (err: Error, user: any) => {
    const userInformation = {
      username: user.username,
      isAdmin: user.isAdmin
    }
    cb(err, userInformation)
  })
})

// ROUTES
app.post("/register", async (req, res) => {
  const { username, password } = req?.body
  if (!username || !password || typeof username !== "string" || typeof password !== "string") {
    res.send("Invalid Entries")
    return
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  User.findOne({ username }, async (err: Error, doc: UserInterface) => {
    if (err) throw err
    if (doc) res.send("User Already Exists")
    if (!doc) {
      const newUser = new User({
        username,
        password: hashedPassword,
      })
      await newUser.save()
      res.send("User Created")
    }
  })
})

app.post("/login", passport.authenticate("local"), (req: Request, res: Response) => {
  res.send("Successfully Logged In")
})

app.get("/user", (req: Request, res: Response) => {
  res.send(req.user)
})

// SERVER START
app.listen(4000, () => {
  console.log("Server has started")
})