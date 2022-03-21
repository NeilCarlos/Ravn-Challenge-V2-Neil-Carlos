import {Router} from 'express'

const router = Router();


//  router.get('/test', (req,res)=>res.send('Hello World'));
import {authenticateUsers, createUsers, deleteUsers, getUsers, getUsersbyId, updateUsers} from '../controllers/index.controllers'

router.get('/users', getUsers);
router.get('/users/:id', getUsersbyId);
router.post('/users', createUsers);
router.put('/users/:id', updateUsers);
router.delete('/users/:id', deleteUsers);
router.post('/users/authentication', authenticateUsers);


export default router;