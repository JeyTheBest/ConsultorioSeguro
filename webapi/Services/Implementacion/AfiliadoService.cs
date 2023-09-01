
using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System;
<<<<<<< HEAD
using System.Runtime.CompilerServices;
=======
>>>>>>> fbb8a4ad85c49e30f726ca8432d2f0e0dbde7079
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
                lista = await _dbContex.Afiliados.Include(af => af.IdSeguroNavigation).ToListAsync();
                return lista; 

            }
            catch (Exception ex)
            {
                throw ex;
            }
            //throw new NotImplementedException();
        }

        public async Task<Afiliado> Get(int id)
        {

            try
            {
                Afiliado? encontrado = new Afiliado();
                encontrado = await _dbContex.Afiliados.Include(af => af.IdSeguroNavigation)
                    .Where(e => e.Id == id).FirstOrDefaultAsync();
                return encontrado;


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
                encontrado = await _dbContex.Afiliados.Include(af => af.IdSeguroNavigation)
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


        public async Task<List<Afiliado>> GetAfiliadosBySeguroId(int idSeguro)
        {
            try
            {
                List<Afiliado> afiliados = await _dbContex.Afiliados
                    .Where(afiliados => afiliados.IdSeguro == idSeguro)
                    .ToListAsync();

                return afiliados;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<IActionResult> ImportarPersonasDesdeExcel(IFormFile excel)
        {
            var workbook = new XLWorkbook(excel.OpenReadStream());

            var hoja = workbook.Worksheet(1);

            var primeraFilaUsada = hoja.FirstRowUsed().RangeAddress.FirstAddress.RowNumber;
            var ultimaFilaUsada = hoja.LastRowUsed().RangeAddress.FirstAddress.RowNumber;

            var personas = new List<Afiliado>();

            for (int i = primeraFilaUsada + 1; i <= ultimaFilaUsada; i++)
            {
                var fila = hoja.Row(i);
                var persona = new Afiliado();

                persona.Cedula = fila.Cell(1).GetString();
                persona.NombresCliente = fila.Cell(2).GetString(); /*.GetValue<decimal>();*/
                persona.ApellidosCliente = fila.Cell(3).GetString(); /*.GetDateTime();*/
                persona.Telefono = fila.Cell(4).GetString();
                persona.Edad = fila.Cell(5).GetValue<int>();
                persona.IdSeguro = fila.Cell(6).GetValue<int>();

                personas.Add(persona);
            }

            _dbContex.AddRange(personas);
            await _dbContex.SaveChangesAsync();

<<<<<<< HEAD
            return new ObjectResult(new { message = "Datos importados correctamente" }) { StatusCode = 200 };

        }


=======
            return View("Index");
        }

        private IActionResult View(string v)
        {
            throw new NotImplementedException();
        }
>>>>>>> fbb8a4ad85c49e30f726ca8432d2f0e0dbde7079


    }






}
