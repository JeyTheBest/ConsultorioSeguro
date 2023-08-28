using webapi.Models;
using Microsoft.EntityFrameworkCore;

using webapi.Services.Contrato;
using webapi.Services.Implementacion;

using AutoMapper;
using webapi.DTOs;
using webapi.Utilidades;
using webapi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<CrudConsultorioContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("CadenaSQL"));
});

builder.Services.AddScoped<CAfiliadoService, AfiliadoService>();
builder.Services.AddScoped<CSeguroService, SeguroService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevaPolitica", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();

    });

});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


#region PETICIONES API REST
app.MapGet("/Seguro/Lista", async(
    
    CSeguroService _seguroServicio,
    IMapper _mapper
    ) =>
{
    var listaSeguro = await _seguroServicio.GetList();
    var listaSeguroDTO = _mapper.Map<List<SeguroDTO>>(listaSeguro);

    if (listaSeguroDTO.Count > 0)
        return Results.Ok(listaSeguroDTO);
    else
        return Results.NotFound();

});



app.MapGet("/Afiliado/Lista", async (

CAfiliadoService _afiliadoService,
IMapper _mapper
) =>
{
var listaAfiliado = await _afiliadoService.GetList();
var listaAfiliadoDTO = _mapper.Map<List<AfiliadoDTO>>(listaAfiliado);

if (listaAfiliadoDTO.Count > 0)
    return Results.Ok(listaAfiliadoDTO);
else
    return Results.NotFound();
});

app.MapPost("/afiliado/guardar", async (
    AfiliadoDTO modelo,
    CAfiliadoService _afiliadoService,
    IMapper _mapper

    ) => {
    
        var _afiliado = _mapper.Map<Afiliado>(modelo);
        var _afiliadoCreado = await _afiliadoService.Add(_afiliado);
        if (_afiliadoCreado.Id != 0)
            return Results.Ok(_mapper.Map<AfiliadoDTO>(_afiliadoCreado));
        else
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
    
    });



app.MapPut("/afiliado/actualizar/{id}", async (
    int id,
    AfiliadoDTO modelo,
    CAfiliadoService _afiliadoService,
    IMapper _mapper


    ) => {

        var _encontrado = await _afiliadoService.Get(id);
        if (_encontrado is null) return Results.NotFound();
        var _afiliado = _mapper.Map<Afiliado>(modelo);

        _encontrado.Cedula = _afiliado.Cedula;
        _encontrado.NombresCliente = _afiliado.NombresCliente;
        _encontrado.ApellidosCliente = _afiliado.ApellidosCliente;
        _encontrado.Telefono = _afiliado.Telefono;
        _encontrado.Edad = _afiliado.Edad;
        _encontrado.IdSeguro = _afiliado.IdSeguro;
        

        var respuesta = await _afiliadoService.Update(_afiliado);

        if (respuesta)
            return Results.Ok(_mapper.Map<AfiliadoDTO>(_encontrado));

        else
            return Results.StatusCode(StatusCodes.Status500InternalServerError);


    });
app.MapDelete("/afiliado/eliminar/{id}", async (
    int id,
    CAfiliadoService _afiliadoService

    ) =>
{

    var _encontrado = await _afiliadoService.Get(id);
    if (_encontrado is null) return Results.NotFound();
    var respuesta = await _afiliadoService.Delete(_encontrado);
    if (respuesta)
        return Results.Ok();
    else
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    
});

#endregion

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("NuevaPolitica");

app.Run();
