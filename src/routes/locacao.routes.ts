import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateLocacaoController } from "../modules/locacao/useCases/createLocacao/CreateLocacaoController";
import { DeleteUniqueLocacaoController } from "../modules/locacao/useCases/deleteUniqueLocacao/DeleteUniqueLocacaoController";
import { ReadAllLocacoesController } from "../modules/locacao/useCases/readAllLocacoes/ReadAllLocacoesController";
import { ReadUniqueLocacaoController } from "../modules/locacao/useCases/readUniqueLocacao/ReadUniqueLocacaoController";
import { UpdateUniqueLocacaoController } from "../modules/locacao/useCases/updateUniqueLocacao/UpdateUniqueLocacaoController";



const createLocacaoController = new CreateLocacaoController();
const readAllLocacoesController = new ReadAllLocacoesController();
const readUniqueLocacaoController = new ReadUniqueLocacaoController();
const updateUniqueLocacaoController = new UpdateUniqueLocacaoController();
const deleteUniqueLocacaoController = new DeleteUniqueLocacaoController();



const locacaoRoutes = Router();

locacaoRoutes.post("/", ensureAuthenticated, createLocacaoController.handle);
locacaoRoutes.get("/", ensureAuthenticated, readAllLocacoesController.handle);
locacaoRoutes.get("/:id", ensureAuthenticated, readUniqueLocacaoController.handle);
locacaoRoutes.put("/:id", ensureAuthenticated,updateUniqueLocacaoController.handle);
locacaoRoutes.delete("/:id", ensureAuthenticated, deleteUniqueLocacaoController.handle);


export { locacaoRoutes };
