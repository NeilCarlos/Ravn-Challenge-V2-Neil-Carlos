import { Request, response, Response } from "express";
import { QueryResult } from "pg";
import {pool} from '../database';
import bcrypt from "bcrypt"

//Typescript para ser mas descriptivo!
export const getUsers = async(req: Request, res: Response): Promise<Response> => {

   try {
    const response: QueryResult = await pool.query('SELECT * FROM users');
    // console.log(response.rows)
    // res.send('users')
    return res.status(200).json(response.rows);
   } catch (e) {
       console.log(e)
       return res.status(500).json("Internal server Error!")
   }
}

export const getUsersbyId = async(req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const response : QueryResult = await pool.query('SELECT * FROM users WHERE id = $1', [id] );
    return res.status(200).json(response.rows);
    // return res.json(response.rows);
    // console.log(req.params.id)
    // res.send('Received')
  } catch (e) {
      console.log(e)
      return res.status(500).json("Internal server Error!")
  }

    
 }

 export const createUsers = async(req: Request, res: Response): Promise<Response> => {
    try {
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password,10);
    const response : QueryResult = await pool.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3)', [name, email, hashedPassword]);
    return res.status(200).json({
        message: 'User create successfuly',
        body: {
            user:{
                name,
                email,
                hashedPassword
            }
        }
    });
    // return res.json(response.rows)
    // console.log(name, email)
    // console.log(req.body)
    // res.send('Received');
    } catch (e) {
        console.log(e)
        return res.status(500).json("Internal server Error!")
    }
    
}

export const updateUsers = async(req: Request, res: Response): Promise<Response> => {
   try {
    const id = parseInt(req.params.id);
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    await pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [name, email, hashedPassword, id]);
    return res.status(200).json(`User ${id} Updated Successfuly!`)
   } catch (e) {
       console.log(e)
       return res.status(500).json("Internal server Error!")
   }
    
}

export const deleteUsers = async(req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)
    await pool.query('DELETE FROM users WHERE id = $1', [id])
    return res.status(200).json(`User ${id} Deleted Successfully!`);
    // console.log(req.params.id)
    // res.json('Deleted')
  } catch (e) {
      console.log(e)
      return res.status(500).json("Internal server Error!")  
  }
    
}

//authenticate

export const authenticateUsers = async(req: Request, res: Response): Promise<Response | null> => {
  try {
     const {email, password} = req.body;
     console.log(email, password);
    //  const hashedPassword = await bcrypt.hash(password,10);
    //  console.log(hashedPassword)
     const response = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
     console.log(response.rows[0].password)
     
    // console.log(response)
    // console.log(validPassword)
     
      if(response.rows.length === 0) {
        return res.status(401).json({error: "Incorrect password!"});

      }

      const validPassword = await bcrypt.compare(password, response.rows[0].password);
      
      if (!validPassword) {
        //   const userInfo = await pool.query('SELECT id, name, email FROM users WHERE email = $1', [email]);
        //   return userInfo.rows[0];
         //  console.log(userInfo.rows)
         return res.status(401).json({error: "Incorrect password!"});
       }
    // return null
      return res.status(200).json('Todo ok');

   
    //   console.log(validPassword)
     
    //   return res.status(200).json('Todo ok')
      

     
        
  } catch (e) {
    console.log(e)
    return res.status(500).json("Internal server Error!") 
  }
      
  }

