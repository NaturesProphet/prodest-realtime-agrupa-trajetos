import { Veiculo } from "../../DTOs/veiculo.dto";
import { Shape } from "../../DTOs/shape.dto";
import { lpop } from "./lpop.service";
import { Vertice } from "../../DTOs/vertice.dto";

export async function recuperaTrajeto ( veiculo: Veiculo, redisConnection ): Promise<Shape> {

  let historico: Vertice[] = new Array();
  let shape: Shape = {
    ITINERARIO: veiculo.ITINERARIO,
    ROTULO: veiculo.ROTULO,
    HISTORICO: historico
  }


  try {
    let localizacao = await lpop( veiculo, redisConnection );

    while ( localizacao != null ) {

      let vertice: Vertice = {
        HORARIO: localizacao.HORARIO,
        LATITUDE: localizacao.LATITUDE,
        LONGITUDE: localizacao.LONGITUDE,
        VELOCIDADE: localizacao.VELOCIDADE
      }

      historico.push( vertice );
      localizacao = await lpop( veiculo, redisConnection );

    }

    return shape;
  }
  catch ( err ) {
    console.log( `[ recuperaTrajeto ]: Erro ao recuperar o shape do veiculo ${veiculo.ROTULO}. ${err.message}` );
    return null;
  }
}
