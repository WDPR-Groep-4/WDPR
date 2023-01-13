﻿// <auto-generated />
using System;
using Backend;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20230113220746_fix8")]
    partial class fix8
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.1");

            modelBuilder.Entity("Backend.Betaling", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("Pending")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("Succes")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Betalingen");
                });

            modelBuilder.Entity("Backend.PlanningEvent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Zaal")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Events");

                    b.HasDiscriminator<string>("Discriminator").HasValue("PlanningEvent");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Backend.Ticket", b =>
                {
                    b.Property<Guid>("TicketId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("RangStoel")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("VoorstellingEventId")
                        .HasColumnType("INTEGER");

                    b.HasKey("TicketId");

                    b.HasIndex("VoorstellingEventId");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("Backend.WinkelwagenItem", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Aantal")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("BetalingId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Rang")
                        .HasColumnType("INTEGER");

                    b.Property<int>("VoorstellingEventId")
                        .HasColumnType("INTEGER");

                    b.HasKey("id");

                    b.HasIndex("BetalingId");

                    b.ToTable("WinkelwagenItem");
                });

            modelBuilder.Entity("DatumBereik", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("INTEGER");

                    b.Property<int>("PlanningEventId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Tot")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Van")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("DatumBereik");
                });

            modelBuilder.Entity("Donatie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Bedrag")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Datum")
                        .HasColumnType("TEXT");

                    b.Property<string>("GastId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GastId");

                    b.ToTable("Donaties");
                });

            modelBuilder.Entity("Gebruiker", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Achternaam")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("Voornaam")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("Gebruiker");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Interesse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("GastId")
                        .HasColumnType("TEXT");

                    b.Property<string>("InteresseNaam")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("GastId");

                    b.ToTable("Interesse");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("RangPrijs", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<double>("Prijs")
                        .HasColumnType("REAL");

                    b.Property<int>("Rang")
                        .HasColumnType("INTEGER");

                    b.Property<int>("VoorstellingId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("VoorstellingId");

                    b.ToTable("RangPrijs");
                });

            modelBuilder.Entity("Voorstelling", b =>
                {
                    b.Property<int>("VoorstellingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Afbeelding")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Banner")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("BegunstigerOnly")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Beschrijving")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Genre")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Leeftijd")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Titel")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ZaalId")
                        .HasColumnType("INTEGER");

                    b.HasKey("VoorstellingId");

                    b.ToTable("Voorstellingen");
                });

            modelBuilder.Entity("Backend.VerhuurEvent", b =>
                {
                    b.HasBaseType("Backend.PlanningEvent");

                    b.Property<string>("Eigenaar")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("VerhuurEvent");
                });

            modelBuilder.Entity("Backend.VoorstellingEvent", b =>
                {
                    b.HasBaseType("Backend.PlanningEvent");

                    b.Property<int>("VoorstellingId")
                        .HasColumnType("INTEGER");

                    b.HasIndex("VoorstellingId");

                    b.HasDiscriminator().HasValue("VoorstellingEvent");
                });

            modelBuilder.Entity("Gast", b =>
                {
                    b.HasBaseType("Gebruiker");

                    b.HasDiscriminator().HasValue("Gast");
                });

            modelBuilder.Entity("Medewerker", b =>
                {
                    b.HasBaseType("Gebruiker");

                    b.HasDiscriminator().HasValue("Medewerker");
                });

            modelBuilder.Entity("Backend.Ticket", b =>
                {
                    b.HasOne("Backend.VoorstellingEvent", "VoorstellingEvent")
                        .WithMany()
                        .HasForeignKey("VoorstellingEventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("VoorstellingEvent");
                });

            modelBuilder.Entity("Backend.WinkelwagenItem", b =>
                {
                    b.HasOne("Backend.Betaling", null)
                        .WithMany("WinkelwagenItems")
                        .HasForeignKey("BetalingId");
                });

            modelBuilder.Entity("DatumBereik", b =>
                {
                    b.HasOne("Backend.PlanningEvent", null)
                        .WithOne("DatumBereik")
                        .HasForeignKey("DatumBereik", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Donatie", b =>
                {
                    b.HasOne("Gast", "Gast")
                        .WithMany()
                        .HasForeignKey("GastId");

                    b.Navigation("Gast");
                });

            modelBuilder.Entity("Interesse", b =>
                {
                    b.HasOne("Gast", null)
                        .WithMany("Interesses")
                        .HasForeignKey("GastId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Gebruiker", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Gebruiker", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gebruiker", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Gebruiker", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("RangPrijs", b =>
                {
                    b.HasOne("Voorstelling", null)
                        .WithMany("PrijzenPerRang")
                        .HasForeignKey("VoorstellingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.VoorstellingEvent", b =>
                {
                    b.HasOne("Voorstelling", "Voorstelling")
                        .WithMany()
                        .HasForeignKey("VoorstellingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Voorstelling");
                });

            modelBuilder.Entity("Backend.Betaling", b =>
                {
                    b.Navigation("WinkelwagenItems");
                });

            modelBuilder.Entity("Backend.PlanningEvent", b =>
                {
                    b.Navigation("DatumBereik")
                        .IsRequired();
                });

            modelBuilder.Entity("Voorstelling", b =>
                {
                    b.Navigation("PrijzenPerRang");
                });

            modelBuilder.Entity("Gast", b =>
                {
                    b.Navigation("Interesses");
                });
#pragma warning restore 612, 618
        }
    }
}
