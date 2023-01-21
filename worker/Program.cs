using Messages;
using Rebus.Config;

using IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureAppConfiguration((hostingContext, configuration) =>
    {
      configuration.Sources.Clear();

      IHostEnvironment env = hostingContext.HostingEnvironment;

      _ = configuration
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true)
          .AddEnvironmentVariables()
          .Build();
    })
    .ConfigureServices((hostContext, services) =>
    {
      _ = services.AddRebus((configure) =>
        {
          return configure
            .Logging(l => l.ColoredConsole(Rebus.Logging.LogLevel.Warn))
            .Transport(t => t.UseRabbitMq(
              hostContext.Configuration.GetValue<string>("RabbitConnectionString"),
              hostContext.Configuration.GetValue<string>("RabbitQueueName")))
            .Options(o => o.SetMaxParallelism(5));
        },
        onCreated: bus => bus.Subscribe<Job>()
      );
      _ = services.AddRebusHandler<JobHandler>();
    })
    .Build();

await host.RunAsync();
