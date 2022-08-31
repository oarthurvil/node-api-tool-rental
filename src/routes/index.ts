import { Router } from "express";
import { usuarioRoutes } from "./usuario.routes";
import { ferramentaRoutes } from "./ferramenta.routes";
import { locacaoRoutes } from "./locacao.routes";

const routes = Router();

routes.use("/usuarios", usuarioRoutes);
routes.use("/ferramentas", ferramentaRoutes);
routes.use("/locacoes", locacaoRoutes);


export { routes };