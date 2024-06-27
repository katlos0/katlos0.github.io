$(document).ready(function() {
    
    if (localStorage.getItem('loggedIn') === 'true') {
        $('#login-form').hide();
        $('#user-actions').show();
        $('#resources-container').show(); 
    } else {
        $('#resources-container').hide(); 
    }

   
    $.ajax({
        url: 'https://reqres.in/api/users?page=2',
        method: 'GET',
        success: function(response) {
            const users = response.data;
            users.forEach(user => {
                $('#users-list').append(`
                    <div class="col-md-4" id="user-${user.id}">
                        <div class="card mb-4">
                            <img src="${user.avatar}" class="card-img-top" alt="Avatar">
                            <div class="card-body">
                                <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
                                <p>${user.email}</p>
                                <button class="btn btn-primary" onclick="mostrarDetallesUsuario(${user.id})">Ver más</button>
                                ${localStorage.getItem('loggedIn') === 'true' ? `<button class="btn btn-danger " onclick="eliminarUsuario(${user.id})">Eliminar</button>` : ''}
                            </div>
                        </div>
                    </div>
                `);
            });
        }
    });

  
    $.ajax({
        url: 'https://reqres.in/api/unknown',
        method: 'GET',
        success: function(response) {
            const resources = response.data;
            resources.forEach(resource => {
                $('#resources-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body" style="background-color: ${resource.color};">
                                <h5 class="card-title">${resource.name}</h5>
                                <p class="card-text">${resource.year}</p>
                                <button class="btn btn-primary" onclick="mostrarDetallesRecurso(${resource.id})">Ver más</button>
                            </div>
                        </div>
                    </div>
                `);
            });
        }
    });

  
    if (localStorage.getItem('loggedIn') === 'true') {
        $('#logout-button').show();
    } else {
        $('#logout-button').hide();
    }
});

function mostrarFormularioRegistro() {
    $('#login-form').hide();
    $('#register-form').show();
}

function mostrarFormularioLogin() {
    $('#register-form').hide();
    $('#login-form').show();
}

function login() {
    const username = $('#login-username').val();
    const password = $('#login-password').val();

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('loggedIn', 'true');
        $('#login-form').hide();
        $('#user-actions').show();
        $('#resources-container').show(); 
        location.reload();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function registrar() {
    const username = $('#register-username').val();
    const password = $('#register-password').val();

    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('¡Registro exitoso! Ahora puede iniciar sesión.');
        mostrarFormularioLogin();
    } else {
        alert('Por favor complete todos los campos.');
    }
}

function cerrarSesion() {
    localStorage.removeItem('loggedIn');
    location.reload();
}

function agregarUsuario() {
    const firstName = $('#first_name').val();
    const lastName = $('#last_name').val();
    const email = $('#email').val();
    const avatar = $('#avatar').val();

    const userId = Math.floor(Math.random() * 1000) + 100;
    $('#users-list').append(`
        <div class="col-md-4" id="user-${userId}">
            <div class="card mb-4">
                <img src="${avatar}" class="card-img-top" alt="Avatar">
                <div class="card-body">
                    <h5 class="card-title">${firstName} ${lastName}</h5>
                    <p>${email}</p>
                    <button class="btn btn-primary" onclick="mostrarDetallesUsuario(${userId})">Ver más</button>
                    <button class="btn btn-danger " onclick="eliminarUsuario(${userId})">Eliminar</button>
                </div>
            </div>
        </div>
    `);

    $('#first_name').val('');
    $('#last_name').val('');
    $('#email').val('');
    $('#avatar').val('');
}

function eliminarUsuario(userId) {
    $(`#user-${userId}`).remove();
}

function mostrarDetallesUsuario(userId) {
    $.ajax({
        url: `https://reqres.in/api/users/${userId}`,
        method: 'GET',
        success: function(response) {
            const user = response.data;
            $('#info-details').html(`
                <p><strong>Nombre:</strong> ${user.first_name} ${user.last_name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <img src="${user.avatar}" class="img-fluid" alt="Avatar">
            `);
            $('#infoModal').modal('show');
        }
    });
}

function mostrarDetallesRecurso(resourceId) {
    $.ajax({
        url: `https://reqres.in/api/unknown/${resourceId}`,
        method: 'GET',
        success: function(response) {
            const resource = response.data;
            $('#info-details').html(`
                <div class="card mb-4"style="border-color: ${resource.color};">
                <div class="card" style="background-color: ${resource.color};">
                <h5 class="card-title">${resource.name}</h5>
                <p><strong>ID:</strong> ${resource.id}</p>
                <p><strong>Nombre:</strong> ${resource.name}</p>
                <p><strong>Año:</strong> ${resource.year}</p>
                <p><strong>Color:</strong> ${resource.color}</p>
                <p><strong>Pantone:</strong> ${resource.pantone_value}</p>
                </div>
            `);
            $('#infoModal').modal('show');
        }
    });
}
