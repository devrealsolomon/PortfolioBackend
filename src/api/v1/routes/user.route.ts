import { Router } from 'express';
import { registerUser } from '../controllers/user.controller';
import { newUserAjvValidate } from '../schemas/user.schema';
import validateDto from '../middlewares/validateDto.middleware';
// import noauth from '../middlewares/noauth.middelware';

const userRoute = Router();

/*
@route          POST /api/v1/adminuser/register
@description    Register a new admin user.
@access         Public
*/
// userRoute.post('/user/register', [noauth, validateDto(newUserAjvValidate)], registerUser);
userRoute.post('/user/register', validateDto(newUserAjvValidate), registerUser);

//export router
export default userRoute;
