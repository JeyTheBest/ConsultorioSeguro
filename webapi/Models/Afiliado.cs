using System;
using System.Collections.Generic;

namespace webapi.Models;

public partial class Afiliado
{
    public int Id { get; set; }

    public string? Cedula { get; set; }

    public string? NombresCliente { get; set; }

    public string? ApellidosCliente { get; set; }

    public string? Telefono { get; set; }

    public int? Edad { get; set; }

    public int? IdSeguro { get; set; }

    public virtual Seguro? IdSeguroNavigation { get; set; }
}
