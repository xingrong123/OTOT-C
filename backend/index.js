import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authenticate, authorize } from './controller/middleware/auth.js'
import { errorHandler } from './controller/middleware/error-handler.js'
import {ROLE} from './configs/role.js'

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
app.use(cookieParser())
import {
    createUser,
    loginUser,
    logoutUser,
    getSecret,
    getTopSecret
} from './controller/user-controller.js';

const router = express.Router()

app.use('/api/user', router).all((_, res) => {
    res.setHeader('content-type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
})

router.get('/', (_, res) => res.send('Hello World from user-service'))
router.get('/secret', authenticate, authorize([ROLE.user, ROLE.admin]), getSecret)
router.get('/topsecret', authenticate, authorize([ROLE.admin]), getTopSecret)
router.post('/signup', createUser)
router.post('/login', loginUser)
router.get('/logout', authenticate, logoutUser)

app.use(errorHandler)



app.listen(8000, () => console.log('user-service listening on port 8000'));