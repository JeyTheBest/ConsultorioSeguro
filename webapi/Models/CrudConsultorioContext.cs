using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace webapi.Models;

public partial class CrudConsultorioContext : DbContext
{
    public CrudConsultorioContext()
    {
    }

    public CrudConsultorioContext(DbContextOptions<CrudConsultorioContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Afiliado> Afiliados { get; set; }

    public virtual DbSet<Seguro> Seguros { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Afiliado>(entity =>
        {
            entity.ToTable("Afiliado");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ApellidosCliente)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Cedula)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.IdSeguro).HasColumnName("idSeguro");
            entity.Property(e => e.NombresCliente)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.IdSeguroNavigation).WithMany(p => p.Afiliados)
                .HasForeignKey(d => d.IdSeguro)
                .HasConstraintName("FK_Afiliado_Seguros");
        });

        modelBuilder.Entity<Seguro>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CodigoSeguro)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NombreSeguro)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Prima).HasColumnType("numeric(5, 2)");
            entity.Property(e => e.SumaAseguradora).HasColumnType("numeric(5, 2)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
