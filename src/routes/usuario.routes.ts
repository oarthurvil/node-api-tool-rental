import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { AuthenticateUsuarioController } from "../modules/usuario/useCases/authenticateUsuario/AuthenticateUsuarioController";
import { CreateUsuarioController } from "../modules/usuario/useCases/createUsuario/CreateUsuarioController";
import { DeleteUniqueUsuarioController } from "../modules/usuario/useCases/deleteUniqueUsuario/DeleteUniqueUsuarioController";
import { ReadAllUsuariosController } from "../modules/usuario/useCases/readAllUsuarios/ReadAllUsuariosController";
import { ReadUniqueUsuarioController } from "../modules/usuario/useCases/readUniqueUsuario/ReadUniqueUsuarioController";
import { UpdateUniqueUsuarioController } from "../modules/usuario/useCases/updateUniqueUsuario/UpdateUniqueUsuarioController";


const createUsuarioController = new CreateUsuarioController();
const readAllUsuariosController = new ReadAllUsuariosController();
const readUniqueUsuarioController = new ReadUniqueUsuarioController();
const updateUniqueUsuarioController = new UpdateUniqueUsuarioController();
const deleteUniqueUsuarioController = new DeleteUniqueUsuarioController();

const authenticateUsuarioController = new AuthenticateUsuarioController();

const usuarioRoutes = Router();

usuarioRoutes.post("/", createUsuarioController.handle);
usuarioRoutes.get("/", ensureAuthenticated, readAllUsuariosController.handle);
usuarioRoutes.get("/:id", readUniqueUsuarioController.handle);
usuarioRoutes.put("/:id", updateUniqueUsuarioController.handle);
usuarioRoutes.delete("/:id", deleteUniqueUsuarioController.handle);

usuarioRoutes.post("/login", authenticateUsuarioController.handle)


export {usuarioRoutes};