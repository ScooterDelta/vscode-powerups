import { connect } from "amqplib";

export const rabbitMq = async <T>(connectionUrl: string, queueName: string) => {
  const connection = await connect(connectionUrl);
  const sendChannel = await connection.createChannel();

  await sendChannel.assertQueue(queueName);

  return {
    sendMessage: (message: T) => {
      sendChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
        headers: {
          "rbs2-content-type": "application/json;charset=utf-8",
          "rbs2-msg-type": "Messages.Job, worker",
        },
      });
    },
  };
};
