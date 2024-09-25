import express from 'express';
import { connect } from './config/mongodb';
import { userRouter } from './router/UserRouter';
import { authRouter } from './router/AuthRouter';
import { productRouter } from './router/ProductRouter';
import { uploadRouter } from './router/UploadRouter';
const cors = require('cors')

const app = express();
const port = 4000;
connect()
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {

});

app.use(userRouter)
app.use(authRouter)
app.use(productRouter)
app.use(uploadRouter)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});