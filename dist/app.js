"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
//parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User is created sucessfully",
        data: user,
    });
});
courseRouter.post('/create-course', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "User is create sucessfully",
        data: course,
    });
});
/* This [logger] is actually [madelware]
   and use [next()] to move one to another
   [madelware] and than reach [callbackfuntion]
   and than [excute] the code--> we use [madelware to the purpose of authentication]
 */
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
// app.get is also [route]
/* ? <-- this symbole called [query param] like https://localhost5000?email=mezba@gmail.com  */
app.get('/', logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.query.name)
    try {
        res.send(somthing);
    }
    catch (error) {
        next(error);
        //   console.log(error)
        //   res.status(400).json({
        //   success: false,
        //   messsage: 'failed to get data'
        // })
    }
}));
// this app.post is a [route]
app.post('/', logger, (req, res) => {
    console.log(req.body);
    res.send("got data");
});
/*
Here [app.all] means i have define all of [route] usign [app.all--. than use["*"]]
when it's being any error in any route so that it's show [message: 'Route is not found']
I means excute  all of the code of [app.all] route
 */
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route is not found'
    });
});
// golbal error handler --> work as a medalware
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Somehing went wrong"
        });
    }
});
exports.default = app;
