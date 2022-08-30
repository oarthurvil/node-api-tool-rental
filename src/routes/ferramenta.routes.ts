import { Router } from "express";
import { CreateFerramentaController } from "../modules/ferramenta/useCases/createFerramenta/CreateFerramentaController";
import { DeleteUniqueFerramentaController } from "../modules/ferramenta/useCases/deleteUniqueFerramenta/DeleteUniqueFerramentaController";
import { ReadAllFerramentasController } from "../modules/ferramenta/useCases/readAllFerramentas/ReadAllFerramentasController";
import { ReadUniqueFerramentaController } from "../modules/ferramenta/useCases/readUniqueFerramenta/ReadUniqueFerramentaController";
import { UpdateUniqueFerramentaController } from "../modules/ferramenta/useCases/updateUniqueFerramenta/UpdateUniqueFerramentaController";


const createFerramentaController = new CreateFerramentaController();
const readAllFerramentasController = new ReadAllFerramentasController();
const readUniqueFerramentaController = new ReadUniqueFerramentaController();
const updateUniqueFerramentaController = new UpdateUniqueFerramentaController();
const deleteUniqueFerramentaController =  new DeleteUniqueFerramentaController();

const ferramentaRoutes = Router();

ferramentaRoutes.post("/", createFerramentaController.handle);
ferramentaRoutes.get("/", readAllFerramentasController.handle);
ferramentaRoutes.get("/:id", readUniqueFerramentaController.handle);
ferramentaRoutes.put("/:id", updateUniqueFerramentaController.handle);
ferramentaRoutes.delete("/:id", deleteUniqueFerramentaController.handle);


export { ferramentaRoutes };
