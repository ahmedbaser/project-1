import { error } from 'console';
import express, { NextFunction, Request, Response } from 'express'

import { Router } from 'express';
const app = express()
const port = 3000



//parsers
app.use(express.json());
app.use(express.text());


const userRouter = express.Router();
const courseRouter = express.Router();

app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)

userRouter.post('/create-user', (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: "User is created sucessfully",
    data: user,
  });
});

courseRouter.post('/create-course', (req: Request, res: Response) => {
  const course = req.body;
  console.log(course)
  res.json({
    success: true,
    message: "User is create sucessfully",
    data: course,
  })
})









/* This [logger] is actually [madelware] 
   and use [next()] to move one to another
   [madelware] and than reach [callbackfuntion]
   and than [excute] the code--> we use [madelware to the purpose of authentication]
 */
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
}


// app.get is also [route]
/* ? <-- this symbole called [query param] like https://localhost5000?email=mezba@gmail.com  */

 app.get('/', logger, async(req: Request, res: Response, next: NextFunction) => {
  // console.log(req.query.name)
  try {
    res.send(somthing)
  } catch (error) {
    next(error);
    //   console.log(error)
    //   res.status(400).json({
    //   success: false,
    //   messsage: 'failed to get data'
    // })
  }
})

// this app.post is a [route]

app.post('/', logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.send("got data")
})

/*
Here [app.all] means i have define all of [route] usign [app.all--. than use["*"]] 
when it's being any error in any route so that it's show [message: 'Route is not found']
I means excute  all of the code of [app.all] route 
 */
app.all("*",(req: Request, res: Response)=> {
  res.status(400).json({
    success: false,
    message: 'Route is not found'
  })
})




// golbal error handler --> work as a medalware
app.use((error: any, req: Request, res: Response, next: NextFunction)=> {
  if(error) {
    res.status(400).json({
      success: false,
      message: "Somehing went wrong"
    })
  }
}) 
 
/* 
all of code of app.ts file is advanced express used
*/  



export default app;