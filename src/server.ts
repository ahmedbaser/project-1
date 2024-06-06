import { Server } from 'http';
import app from './app'

const PORT = 5000;


let server: Server

/* for the purpose of bootstraping or run 
the application I need some connectivity 
those connectivity I will put in this function*/
async function bootstrap() {
    // app.listen is a server
    server = app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    });

}

bootstrap();
