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
    await redisConnection.setAsync( veiculo.ROTULO, veiculo.ITINERARIO );
  } catch ( err ) {
    console.log( `[ salvaVeiculo ]: Erro ao enviar um veiculo ao Redis. ${err.message}` );
  }
}

