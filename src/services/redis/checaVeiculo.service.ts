import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
  dotenv.config();
}
import * as bluebird from 'bluebird';
import * as redis from 'redis';
bluebird.promisifyAll( redis.RedisClient.prototype );
bluebird.promisifyAll( redis.Multi.prototype );



export async function checaVeiculo ( rotulo: string, redisConnection ): Promise<string> {
  try {
    let itinerario = await redisConnection.getAsync( `carro:${rotulo}` );
    return itinerario;
  } catch ( err ) {
    console.log( `[ checaVeiculo ] Erro ao tentar buscar rotulo no redis. ${err.message}` );
  }
}
