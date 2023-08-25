
using Microsoft.EntityFrameworkCore;
using webapi.Models;
using webapi.Services.Contrato;
namespace webapi.Services.Implementacion
{
    public class SeguroService: CSeguroService
    {

        private CrudConsultorioContext _dbContex;

        public SeguroService(CrudConsultorioContext dbContex)
        {
            _dbContex = dbContex;
        }

        public Task<Seguro> Add(Seguro modelo)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Delete(Seguro modelo)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Seguro>> GetList()
        {
            try
            {
                List<Seguro> lista = new  List<Seguro>();
                lista = await _dbContex.Seguros.ToListAsync();
                return lista;

            }catch(Exception ex)
            {
                throw ex; 
            }
            //throw new NotImplementedException();
        }

        public Task<Seguro> GetSeguroById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> Update(Seguro modelo)
        {
            throw new NotImplementedException();
        }
    }
}
