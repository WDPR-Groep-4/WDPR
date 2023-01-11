namespace Backend;
using System.Drawing;
using QRCoder;

public class TicketUtils
{

    public static Ticket GenerateTicket(VoorstellingEvent voorstelling, string email, int rang, int rij, int stoel, DatabaseContext context)
    {
        Ticket ticket = new Ticket();
        ticket.VoorstellingEvent = voorstelling;
        ticket.Email = email;
        ticket.RangRijStoel = RangRijStoelFormatter(rang, rij, stoel);

        context.AddAsync(ticket);
        context.SaveChangesAsync();

        // email qr

        return ticket;
    }

    public static Bitmap GenerateQRCode(Guid guid)
    {
        QRCodeGenerator qrGenerator = new QRCodeGenerator();
        QRCodeData qrCodeData = qrGenerator.CreateQrCode(guid.ToString(), QRCodeGenerator.ECCLevel.Q);
        QRCode qrCode = new QRCode(qrCodeData);
        Bitmap qrCodeImage = qrCode.GetGraphic(20);
        return qrCodeImage;
    }

    private static string RangRijStoelFormatter(int rang, int rij, int stoel)
    {
        return $"{rang}-{rij}-{stoel}";
    }
}