using webapi.Models;
namespace webapi.Services.Contrato
{
    public interface CSeguroService
    {
        Task<List<Seguro>> GetList();
        Task<Seguro> GetSeguroById(int id);

        Task<Seguro> Add(Seguro modelo);

        Task<bool> Update(Seguro modelo);

        Task<bool> Delete(Seguro modelo);
        Task<Seguro> Get(int id);

        
    }
}
