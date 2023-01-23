import { NextApiHandler } from "next";

type JobTask = {
  jobNumber: number;
};
type JobTaskResponse = JobTask & {
  messageStatus: string;
};

const handler: NextApiHandler<JobTaskResponse> = (req, res) => {
  const { body }: { body: JobTask } = req;

  if (!body.jobNumber) {
    throw new Error("Please provide a valid job number");
  }

  // Do the rabbitMQ Things...

  res
    .status(200)
    .json({ jobNumber: body.jobNumber, messageStatus: "Queued Successfully" });
};

export default handler;
