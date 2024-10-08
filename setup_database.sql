USE master;
GO

-- Crear la base de datos SisFin3
CREATE DATABASE SisFin3;
GO

USE SisFin3;
GO

-- Crear la tabla de usuarios
CREATE TABLE Usuarios (
    UsuarioID INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único para cada usuario
    Nombre NVARCHAR(50) NOT NULL, -- Nombre del usuario
    Apellido NVARCHAR(50) NOT NULL, -- Apellido del usuario
    TipoDocumento NVARCHAR(50) NOT NULL, -- Tipo de documento (C.C., T.I., etc.)
    NumeroDocumento NVARCHAR(50) NOT NULL UNIQUE, -- Número de documento, debe ser único
    Direccion NVARCHAR(100) NOT NULL, -- Dirección del usuario
    Ciudad NVARCHAR(50) NOT NULL, -- Ciudad del usuario
    Celular NVARCHAR(20) NOT NULL, -- Número de celular
    CorreoElectronico NVARCHAR(100) NOT NULL UNIQUE, -- Correo electrónico, debe ser único
    NombreUsuario NVARCHAR(50) NOT NULL UNIQUE, -- Nombre de usuario, debe ser único
    Contrasena NVARCHAR(255) NOT NULL, -- Contraseña encriptada
    FechaRegistro DATETIME DEFAULT GETDATE() -- Fecha de registro, se asigna automáticamente al crear el registro
);
GO

-- Crear la tabla de sesiones (opcional)
CREATE TABLE Sesiones (
    SesionID INT IDENTITY(1,1) PRIMARY KEY, -- Identificador único para cada sesión
    UsuarioID INT NOT NULL, -- Referencia al ID del usuario
    FechaInicio DATETIME DEFAULT GETDATE(), -- Fecha y hora de inicio de la sesión
    FechaFin DATETIME, -- Fecha y hora de fin de la sesión
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID) -- Relación con la tabla Usuarios
);
GO

-- Crear el procedimiento almacenado para registrar un usuario
CREATE PROCEDURE RegistrarUsuario
    @Nombre NVARCHAR(50),
    @Apellido NVARCHAR(50),
    @TipoDocumento NVARCHAR(50),
    @NumeroDocumento NVARCHAR(50),
    @Direccion NVARCHAR(100),
    @Ciudad NVARCHAR(50),
    @Celular NVARCHAR(20),
    @CorreoElectronico NVARCHAR(100),
    @NombreUsuario NVARCHAR(50),
    @Contrasena NVARCHAR(255) -- Contraseña encriptada
AS
BEGIN
    INSERT INTO Usuarios (Nombre, Apellido, TipoDocumento, NumeroDocumento, Direccion, Ciudad, Celular, CorreoElectronico, NombreUsuario, Contrasena)
    VALUES (@Nombre, @Apellido, @TipoDocumento, @NumeroDocumento, @Direccion, @Ciudad, @Celular, @CorreoElectronico, @NombreUsuario, @Contrasena);
END;
GO

-- Crear el procedimiento almacenado para verificar credenciales
CREATE PROCEDURE VerificarCredenciales
    @NombreUsuario NVARCHAR(50),
    @Contrasena NVARCHAR(255) -- Contraseña encriptada
AS
BEGIN
    SELECT UsuarioID
    FROM Usuarios
    WHERE NombreUsuario = @NombreUsuario AND Contrasena = @Contrasena;
END;
GO

SELECT * FROM Usuarios;
