import { rabbitMq } from "@/shared/rabbitmq";
import { RebusMessage } from "@/types/rebus-message.type";
import { NextApiHandler } from "next";

type RebusJob = RebusMessage & {
  JobNumber: number;
};
type JobTask = {
  jobNumber: number;
};
type JobTaskResponse = JobTask & {
  messageStatus: string;
};

const handler: NextApiHandler<JobTaskResponse> = async (req, res) => {
  const { body }: { body: JobTask } = req;

  if (!body.jobNumber) {
    throw new Error("Please provide a valid job number");
  }

  // Do the rabbitMQ Things...
  (await rabbitMq<RebusJob>()).sendMessage({
    JobNumber: body.jobNumber,
    messageType: "Messages.Job, worker",
    contentType: "application/json;charset=utf-8",
  });

  res
    .status(200)
    .json({ jobNumber: body.jobNumber, messageStatus: "Queued Successfully" });
};

export default handler;
