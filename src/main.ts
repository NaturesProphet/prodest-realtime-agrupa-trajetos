import * as dotenv from 'dotenv';
if ( process.env.NODE_ENV != 'production' ) {
    dotenv.config();
}
import { Channel } from 'amqplib';
import { getConsumerChannel } from './services/rabbitmq/getConsumerChannel.service';
import { getPublishChannel } from './services/rabbitmq/getPublishChannel.service';
import * as rabbitConf from './common/rabbit.config';
import { Veiculo } from './DTOs/veiculo.dto';
import { checaVeiculo } from './services/redis/checaVeiculo.service';
import { IniciaConexaoRedis } from './services/redis/iniciaConexao.service';
import { salvaVeiculo } from './services/redis/salvaVeiculo.service';
import { push } from './services/redis/push.service';
import { Shape } from './DTOs/shape.dto';



async function main () {

    const redis = IniciaConexaoRedis();
    const consumerChannel: Channel = await getConsumerChannel();
    const publishChannel: Channel = await getPublishChannel();

    console.log( `-------------------------------------------------------\n` +
        `[ ${new Date()} ]\n\t| ..... Serviço iniciado ..... |\n` +
        `-------------------------------------------------------\n\n` )

    // tarefa 2
    await consumerChannel.consume( rabbitConf.rabbitConsumerQueueName, async ( msg ) => {

        let veiculo: Veiculo = JSON.parse( msg.content.toString() );
        let itinerario: string = await checaVeiculo( veiculo.ROTULO, redis );

        // tarefa 3
        if ( itinerario == undefined || itinerario == null ) {
            // se o veiculo apareceu pela primeira vez e nao tinha registros

            await salvaVeiculo( veiculo, redis );
            await push( veiculo, redis );
        }
        else {
            // se o veiculo ja estava previamente no redis

            if ( itinerario == veiculo.ITINERARIO && !veiculo.IGNICAO ) {
                // se ele ainda está fazendo o mesmo itinerario e está ligado

                await push( veiculo, redis );
            }

            else if ( itinerario != veiculo.ITINERARIO ) {
                // tarefa 4
                // se o veiculo está fazendo um itinerario diferente do ultimo registrado.
                // ou se o veiculo desligou
                // tarefas 4.1 + 4.2
                // let shape: Shape = await recuperaTrajeto( veiculo, redis );

                // 4.3
                await salvaVeiculo( veiculo, redis );
            }
        }


    } );
}

main();
