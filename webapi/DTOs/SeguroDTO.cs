namespace webapi.DTOs
{
    public class SeguroDTO
    {
        public int Id { get; set; }
        public string? NombreSeguro { get; set; }

        public string? CodigoSeguro { get; set; }

        public decimal? SumaAseguradora { get; set; }

        public decimal? Prima { get; set; }

    }
}
