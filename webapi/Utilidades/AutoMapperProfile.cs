using AutoMapper;
using webapi.DTOs;
using webapi.Models;
using System.Globalization;

namespace webapi.Utilidades
{
    public class AutoMapperProfile : Profile
    {

        public AutoMapperProfile()
        {
            #region Seguro
            CreateMap<Seguro, SeguroDTO>().ReverseMap();
            #endregion

            #region Afiliado
            CreateMap<Afiliado, AfiliadoDTO>()
            .ForMember(destino =>
            destino.NombresSeguro,
            opt => opt.MapFrom(origen => origen.IdSeguroNavigation.NombreSeguro));

            CreateMap<AfiliadoDTO, Afiliado>()
            .ForMember(Destino =>
            Destino.IdSeguroNavigation,
            opt => opt.Ignore());
            #endregion
        }
    }   
}
