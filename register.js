$('#register-form').on('submit', function(event) {
    event.preventDefault();
    
    var nombre = $('#reg-nombre').val().trim();
    var apellido = $('#reg-apellido').val().trim();
    var tipoDocumento = $('#reg-documento').val().trim();
    var numeroDocumento = $('#reg-num-documento').val().trim();
    var direccion = $('#reg-direccion').val().trim();
    var ciudad = $('#reg-ciudad').val().trim();
    var celular = $('#reg-celular').val().trim();
    var correoElectronico = $('#reg-email').val().trim();
    var nombreUsuario = $('#generated-username').val().trim();
    var contrasena = $('#reg-password').val().trim();
    
    // Encriptar la contraseña antes de enviarla
    var hashedPassword = sha256(contrasena);
    
    $.ajax({
        url: '/path/to/your/api/RegistrarUsuario',
        method: 'POST',
        data: {
            Nombre: nombre,
            Apellido: apellido,
            TipoDocumento: tipoDocumento,
            NumeroDocumento: numeroDocumento,
            Direccion: direccion,
            Ciudad: ciudad,
            Celular: celular,
            CorreoElectronico: correoElectronico,
            NombreUsuario: nombreUsuario,
            Contrasena: hashedPassword
        },
        success: function(response) {
            alert('Registro exitoso.');
            $('#registerModal').modal('hide');
            $('#register-form')[0].reset();
            $('#credentials-form')[0].reset();
        },
        error: function(error) {
            alert('Error al registrar usuario.');
        }
    });
});
