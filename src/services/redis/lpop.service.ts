import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
  dotenv.config();
}
import * as bluebird from 'bluebird';
import * as redis from 'redis';
import { Veiculo } from '../../DTOs/veiculo.dto';

bluebird.promisifyAll( redis.RedisClient.prototype );
bluebird.promisifyAll( redis.Multi.prototype );

export async function lpop ( veiculo: Veiculo, redisConnection ) {
  try {
    let localizacaoString = await redisConnection.lpopAsync( `shapes:${veiculo.ROTULO}` );
    let localizacao = JSON.parse( localizacaoString );
    return localizacao;
  } catch ( err ) {
    console.log( `[ lpop ]: Erro ao recuperar um elemento de uma lista no Redis. ${err.message}` );
  }
}

