﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using dashboard.Helper;

#nullable disable

namespace dashboard.Server.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240403103658_StatoIniziale")]
    partial class StatoIniziale
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("dashboard.Server.Models.Fasi", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("Chilafa")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Eseguita")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Lavorazione")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Quando")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Fasi");
                });

            modelBuilder.Entity("dashboard.Server.Models.FasiTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Chilafa")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Eseguita")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Lavorazione")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Quando")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("FasiTemplate");
                });

            modelBuilder.Entity("dashboard.Server.Models.Fornitori", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Colore")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Telefono")
                        .HasColumnType("TEXT");

                    b.Property<string>("Url")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Fornitori");
                });

            modelBuilder.Entity("dashboard.Server.Models.Lavorazioni", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Completata")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DataInserimento")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Dataconsegna")
                        .HasColumnType("TEXT");

                    b.Property<string>("Fornitore")
                        .HasColumnType("TEXT");

                    b.Property<string>("Paziente")
                        .HasColumnType("TEXT");

                    b.Property<string>("TipoLavorazione")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Lavorazioni");
                });

            modelBuilder.Entity("dashboard.Server.Models.TipoLavorazione", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Descrizione")
                        .HasColumnType("TEXT");

                    b.Property<string>("Fornitore")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("TipoLavorazione");
                });

            modelBuilder.Entity("dashboard.Server.Models.Utenti", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nome")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Utenti");
                });
#pragma warning restore 612, 618
        }
    }
}
