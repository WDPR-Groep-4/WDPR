namespace Backend.Services;

using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using SixLabors.ImageSharp;

public class EmailSender : IEmailSender
{
    private readonly ILogger _logger;
    private readonly IConfiguration _configuration;

    public EmailSender(ILogger<EmailSender> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    public AuthMessageSenderOptions Options { get; }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        string? ApiKey = _configuration["SENDGRID_API_KEY"];

        if (string.IsNullOrEmpty(ApiKey))
        {
            throw new Exception("Null SendGridKey");
        }

        await Execute(ApiKey, subject, message, toEmail);
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message, Dictionary<Image, string> images)
    {
        string? ApiKey = _configuration["SENDGRID_API_KEY"];

        if (string.IsNullOrEmpty(ApiKey))
        {
            throw new Exception("Null SendGridKey");
        }

        await Execute(ApiKey, subject, message, toEmail, images);
    }

    public async Task Execute(string apiKey, string subject, string message, string toEmail)
    {
        var client = new SendGridClient(apiKey);
        var msg = new SendGridMessage()
        {
            From = new EmailAddress("hettheaterlaak@gmail.com", "Theater Laak"),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(toEmail));

        // Disable click tracking.
        // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
        msg.SetClickTracking(false, false);
        var response = await client.SendEmailAsync(msg);
        _logger.LogInformation(response.IsSuccessStatusCode
                               ? $"Email to {toEmail} queued successfully!"
                               : $"Failure Email to {toEmail}");
    }

    public async Task Execute(string apiKey, string subject, string message, string toEmail, Dictionary<Image, string> images)
    {
        var client = new SendGridClient(apiKey);
        var msg = new SendGridMessage()
        {
            From = new EmailAddress("hettheaterlaak@gmail.com", "Theater Laak"),
            Subject = subject,
            PlainTextContent = message,
            HtmlContent = message
        };
        msg.AddTo(new EmailAddress(toEmail));
        foreach (var image in images)
        {
            using (var ms = new MemoryStream())
            {
                image.Key.SaveAsPng(ms);
                var bytes = ms.ToArray();
                var file = Convert.ToBase64String(bytes);
                msg.AddAttachment(image.Value, file);
            }
        }




        // Disable click tracking.
        // See https://sendgrid.com/docs/User_Guide/Settings/tracking.html
        msg.SetClickTracking(false, false);
        var response = await client.SendEmailAsync(msg);
        _logger.LogInformation(response.IsSuccessStatusCode
                               ? $"Email to {toEmail} queued successfully!"
                               : $"Failure Email to {toEmail}");
    }


}