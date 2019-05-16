import { Channel } from "amqplib";
import * as rabbitConf from '../../common/rabbit.config';
import { Shape } from "../../DTOs/shape.dto";


export async function avisaNoTopico ( connection: Channel, shape: Shape ) {

  connection.publish(
    rabbitConf.rabbitTopicName,
    rabbitConf.rabbitPublishRoutingKey,
    new Buffer( JSON.stringify( shape ) ),
    { persistent: false }
  );
}
