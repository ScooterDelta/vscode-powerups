using Rebus.Handlers;

namespace Messages
{
  public class JobHandler : IHandleMessages<Job>
  {
    public async Task Handle(Job message)
    {
      Console.WriteLine("Processing job {0}", message.JobNumber);

      await Task.Delay(200);
    }
  }
}
