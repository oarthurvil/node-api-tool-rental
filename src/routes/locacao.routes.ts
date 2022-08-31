import { Router } from "express";
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

locacaoRoutes.post("/", createLocacaoController.handle);
locacaoRoutes.get("/", readAllLocacoesController.handle);
locacaoRoutes.get("/:id", readUniqueLocacaoController.handle);
locacaoRoutes.put("/:id", updateUniqueLocacaoController.handle);
locacaoRoutes.delete("/:id", deleteUniqueLocacaoController.handle);


export { locacaoRoutes };
