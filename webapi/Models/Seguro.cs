using System;
using System.Collections.Generic;

namespace webapi.Models;

public partial class Seguro
{
    public int Id { get; set; }

    public string? NombreSeguro { get; set; }

    public string? CodigoSeguro { get; set; }

    public decimal? SumaAseguradora { get; set; }

    public decimal? Prima { get; set; }

    public virtual ICollection<Afiliado> Afiliados { get; set; } = new List<Afiliado>();
}
