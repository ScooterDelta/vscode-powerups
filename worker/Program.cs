using Messages;
using Rebus.Activation;
using Rebus.Config;

using IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((hostingContext, configuration) =>
    {
      configuration.Sources.Clear();

      IHostEnvironment env = hostingContext.HostingEnvironment;

      _ = configuration
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
          .AddEnvironmentVariables();

      IConfigurationRoot configurationRoot = configuration.Build();

      string rabbitEndpoint = configurationRoot.GetValue<string>("RabbitConnectionString");

      using BuiltinHandlerActivator adapter = new();
      if (string.IsNullOrEmpty(rabbitEndpoint))
      {
        throw new Exception("Invalid RabbitMQ Connection string - no value provided");
      }

      _ = adapter.Handle<Job>(async job =>
      {
        Console.WriteLine("Processing job {0}", job.JobNumber);

        await Task.Delay(200);
      });

      _ = Configure.With(adapter)
          .Logging(l => l.ColoredConsole(Rebus.Logging.LogLevel.Warn))
          .Transport(t => t.UseRabbitMq(rabbitEndpoint, configurationRoot.GetValue<string>("RabbitQueueName")))
          .Options(o => o.SetMaxParallelism(5))
          .Start();

      adapter.Bus.Subscribe<Job>().Wait();

      Console.WriteLine("Consumer listening");
    })
    .Build();

await host.RunAsync();
