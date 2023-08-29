
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

        public async Task<Seguro> Add(Seguro modelo)
        {
            try
            {
                _dbContex.Seguros.Add(modelo);
                await _dbContex.SaveChangesAsync();
                return modelo;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(Seguro modelo)
        {
            try
            {
                _dbContex.Seguros.Remove(modelo);
                await _dbContex.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
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

        public async Task<Seguro> GetSeguroById(int id)
        {
            try
            {
                Seguro? encontrado = new Seguro();
                encontrado = await _dbContex.Seguros.FirstOrDefaultAsync(a => a.Id == id);
                return encontrado ?? new Seguro(); 
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<bool> Update(Seguro modelo)
        {
            try
            {
                _dbContex.Seguros.Update(modelo);
                await _dbContex.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<Seguro> Get(int id)
        {

            try
            {
                Seguro? encontrado = new Seguro();
                encontrado = await _dbContex.Seguros.Include(sg => sg.Id)
                    .Where(e => e.Id == id).FirstOrDefaultAsync();
                return encontrado;


            }
            catch (Exception ex)
            {
                throw ex;
            }
            //throw new NotImplementedException();
        }
    }
}
