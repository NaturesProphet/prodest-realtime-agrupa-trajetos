import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
  dotenv.config();
}
import * as bluebird from 'bluebird';
import * as redis from 'redis';
import { Veiculo } from '../../DTOs/veiculo.dto';

bluebird.promisifyAll( redis.RedisClient.prototype );
bluebird.promisifyAll( redis.Multi.prototype );

export async function salvaVeiculo ( veiculo: Veiculo, redisConnection ) {
  try {
    if ( veiculo.ROTULO != undefined ) {
      await redisConnection.setAsync( `carro:${veiculo.ROTULO}`, veiculo.ITINERARIO );
    }
    else {
      console.log( `Rotulo invalido: ${JSON.stringify( veiculo )}` );
    }

  } catch ( err ) {
    console.log( `[ salvaVeiculo ]: Erro ao enviar um veiculo ao Redis. ${err.message}` );
  }
}

