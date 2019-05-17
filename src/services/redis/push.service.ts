import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
  dotenv.config();
}
import * as bluebird from 'bluebird';
import * as redis from 'redis';
import { Veiculo } from '../../DTOs/veiculo.dto';

bluebird.promisifyAll( redis.RedisClient.prototype );
bluebird.promisifyAll( redis.Multi.prototype );

export async function push ( veiculo: Veiculo, redisConnection ) {
  try {
    await redisConnection.rpushAsync( `shapes:${veiculo.ROTULO}`, JSON.stringify( veiculo.LOCALIZACAO ) );
  } catch ( err ) {
    console.log( `[ push ]: Erro ao adicionar um elemento a uma lista no Redis. ${err.message}` );
  }
}
