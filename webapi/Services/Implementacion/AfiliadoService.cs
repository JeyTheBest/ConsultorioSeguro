
using Microsoft.EntityFrameworkCore;
using webapi.Models;
using webapi.Services.Contrato;

namespace webapi.Services.Implementacion
{
    public class AfiliadoService: CAfiliadoService
    {
        private CrudConsultorioContext _dbContex;
        public AfiliadoService(CrudConsultorioContext dbContex) {

            _dbContex=dbContex;
        }

        public async Task<Afiliado> Add(Afiliado modelo)
        {
            try
            {
                _dbContex.Afiliados.Add(modelo);
                await _dbContex.SaveChangesAsync();
                return modelo;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(Afiliado modelo)
        {
            try
            {
                _dbContex.Afiliados.Remove(modelo);
                await _dbContex.SaveChangesAsync();
                return true; 

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Afiliado>> GetList()
        {

            try
            {
                List<Afiliado> lista = new List<Afiliado>();
                lista = await _dbContex.Afiliados.Include(sg => sg.IdSeguroNavigation).ToListAsync();
                return lista; 

            }
            catch (Exception ex)
            {
                throw ex;
            }
            //throw new NotImplementedException();
        }

        public async Task<Afiliado> GetSeguroById(int id)
        {
            try
            {
                Afiliado? encontrado = new Afiliado();
                encontrado = await _dbContex.Afiliados.Include(sg => sg.IdSeguroNavigation)
                .Where(a => a.Id == id).FirstOrDefaultAsync();
                return encontrado;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(Afiliado modelo)
        {
            try
            {
                _dbContex.Afiliados.Update(modelo);
                await _dbContex.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
