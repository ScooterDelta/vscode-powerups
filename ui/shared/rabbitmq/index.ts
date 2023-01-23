import { RebusMessage } from "@/types/rebus-message.type";
import { connect } from "amqplib";

const connectionUrl =
  process.env.RABBITMQ_CONNECTION_URL ?? "amqp://rabbituser:changeme@localhost";
const queueName = process.env.RABBITMQ_QUEUE_NAME ?? "vscode-powerups";

export const rabbitMq = async <T extends RebusMessage>() => {
  const connection = await connect(connectionUrl);
  const sendChannel = await connection.createChannel();

  await sendChannel.assertQueue(queueName);

  return {
    sendMessage: (message: T) => {
      const { messageType, contentType, ...messageBody } = message;

      sendChannel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(messageBody)),
        {
          headers: {
            "rbs2-content-type": contentType, // "application/json;charset=utf-8",
            "rbs2-msg-type": messageType, // "Messages.Job, worker",
          },
        }
      );
    },
  };
};
