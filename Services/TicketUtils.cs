namespace Backend;
using System.Drawing;
using QRCoder;

public class TicketUtils
{

    public static Ticket CreateTicket(Voorstelling voorstelling, DatumBereik datumBereik, Gast gast, int rang, int rij, int stoel)
    {
        Ticket ticket = new Ticket();
        ticket.Voorstelling = voorstelling;
        ticket.DatumBereik = datumBereik;
        ticket.Gast = gast;
        ticket.RangRijStoel = RangRijStoelFormatter(rang, rij, stoel);

        // ticket aan dbcontext toevoegen
        
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