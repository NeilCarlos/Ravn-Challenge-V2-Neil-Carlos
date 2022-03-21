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
exports.authenticateUsers = exports.deleteUsers = exports.updateUsers = exports.createUsers = exports.getUsersbyId = exports.getUsers = void 0;
const database_1 = require("../database");
const bcrypt_1 = __importDefault(require("bcrypt"));
//Typescript para ser mas descriptivo!
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM users');
        // console.log(response.rows)
        // res.send('users')
        return res.status(200).json(response.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server Error!");
    }
});
exports.getUsers = getUsers;
const getUsersbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const response = yield database_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.status(200).json(response.rows);
        // return res.json(response.rows);
        // console.log(req.params.id)
        // res.send('Received')
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server Error!");
    }
});
exports.getUsersbyId = getUsersbyId;
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const response = yield database_1.pool.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3)', [name, email, hashedPassword]);
        return res.status(200).json({
            message: 'User create successfuly',
            body: {
                user: {
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
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server Error!");
    }
});
exports.createUsers = createUsers;
const updateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { name, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield database_1.pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [name, email, hashedPassword, id]);
        return res.status(200).json(`User ${id} Updated Successfuly!`);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server Error!");
    }
});
exports.updateUsers = updateUsers;
const deleteUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield database_1.pool.query('DELETE FROM users WHERE id = $1', [id]);
        return res.status(200).json(`User ${id} Deleted Successfully!`);
        // console.log(req.params.id)
        // res.json('Deleted')
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server Error!");
    }
});
exports.deleteUsers = deleteUsers;
//authenticate
const authenticateUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        //  const hashedPassword = await bcrypt.hash(password,10);
        //  console.log(hashedPassword)
        const response = yield database_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log(response.rows[0].password);
        // console.log(response)
        // console.log(validPassword)
        if (response.rows.length === 0) {
            return res.status(401).json({ error: "Incorrect password!" });
        }
        const validPassword = yield bcrypt_1.default.compare(password, response.rows[0].password);
        if (!validPassword) {
            //   const userInfo = await pool.query('SELECT id, name, email FROM users WHERE email = $1', [email]);
            //   return userInfo.rows[0];
            //  console.log(userInfo.rows)
            return res.status(401).json({ error: "Incorrect password!" });
        }
        // return null
        return res.status(200).json('Todo ok');
        //   console.log(validPassword)
        //   return res.status(200).json('Todo ok')
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Internal server Error!");
    }
});
exports.authenticateUsers = authenticateUsers;
