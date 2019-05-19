import { setEnvironment } from '../../services/env.service';
setEnvironment();

import * as bluebird from 'bluebird';
import * as redis from 'redis';
import { Veiculo } from '../../DTOs/veiculo.dto';

bluebird.promisifyAll( redis.RedisClient.prototype );
bluebird.promisifyAll( redis.Multi.prototype );

export async function salvaVeiculo ( veiculo: Veiculo, redisConnection ) {
  try {
    if ( veiculo.ROTULO != undefined && veiculo.ITINERARIO != undefined ) {
      await redisConnection.setAsync( `carro:${veiculo.ROTULO}`, veiculo.ITINERARIO );
    }
    else {
      console.log( `[ salvaVeiculo ]: dados invalidos: ${JSON.stringify( veiculo )}` );
    }

  } catch ( err ) {
    console.log( `[ salvaVeiculo ]: Erro ao enviar um veiculo ao Redis. ${err.message}` );
  }
}

