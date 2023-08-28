using webapi.Models;
namespace webapi.Services.Contrato
{
    public interface CAfiliadoService
    {

        Task<List<Afiliado>> GetList();

        Task<Afiliado> Get(int id);

        Task<Afiliado> GetSeguroById(int id);

        Task<Afiliado> Add(Afiliado modelo);

        Task<bool> Update(Afiliado modelo);

        Task<bool> Delete(Afiliado modelo);
    }
}
