namespace Backend.Services;

using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Drawing;
using System.Drawing.Imaging;


public class EmailSender : IEmailSender
{
    private readonly ILogger _logger;

    public EmailSender(ILogger<EmailSender> logger)
    {
        _logger = logger;
    }

    public AuthMessageSenderOptions Options { get; }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
        string? ApiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        if (string.IsNullOrEmpty(ApiKey))
        {
            throw new Exception("Null SendGridKey");
        }

        await Execute(ApiKey, subject, message, toEmail);
    }

    public async Task SendEmailWithImageAsync(string toEmail, string subject, string message, Bitmap image)
    {

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

    public async Task Execute(string apiKey, string subject, string message, string toEmail, Bitmap image)
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
        using (var stream = new System.IO.MemoryStream())
        {
            image.Save(stream, ImageFormat.Png);
            msg.AddAttachment("ticket.png", Convert.ToBase64String(stream.ToArray()));
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