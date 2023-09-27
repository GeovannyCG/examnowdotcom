//Variable que guardara la direccion de la pagina en la que esta actualmente.
let locationWindow = window.location.href;

//Objeto que alamacena la informacion de credenciales de los usuarios (Alumnos).
let Students = [
    {
        name: "Hiojan Geovanny Carrasco Garcia", //Usuario numero 1
        email: "20302008@utfv.edu.mx",
        password: "password3312"
    },
    {
        name: "Ramiro Sanchez Lozano", //Usuario numero 2
        email: "20302890@utfv.edu.mx",
        password: "password1233"
    },
    {
        name: "Ariel Yahir Carrasco Garcia", //Usuario numero 3
        email: "20302096@utfv.edu.mx",
        password: "password9999"
    },
];

//Estructura de control "if" que determinara que bloques de codigo se van a ejecutar segun en que pagina se encuentre.
if (locationWindow.includes("index.html")) {
    //Codigo para el Login del examen

    //Verificar que el usuario solo pueda ingresar si tiene una sesion activa.
    window.addEventListener("load", () => {
        sessionStorage.removeItem("session");
        sessionStorage.removeItem("minutes");
    });

    //Declaracion del DOM donde se va a mostrar el mensaje de "Usuario no encontrado".
    let alertDom = document.getElementById("Alert-Message");

    /* Declaracion del DOM del Elemento checkbox para poder mostrar o ocultar contraseña 
              haciendo uso de un listener para saber cuando el usuario da click */
    document.getElementById("exampleCheck1").addEventListener("change", () => {
        if (document.getElementById("exampleCheck1").checked) {
            // Si el elemento tiene el estado Checked se cambia el type del password input a text.
            document.getElementById("exampleInputPassword1").type = "text";
        } else {
            // Si el elemento no tiene el estado Checked se cambia el type del password input a password .
            document.getElementById("exampleInputPassword1").type = "password";
        }
    });

    //Declaracion del DOM del boton para ingresar al examen junto con el metodo AddEventListener para saber cuando el usuario intente ingresar.
    document.getElementById("btnEnviar").addEventListener("click", () => {
        //Declaracion de los DOMS de las inputs del formulario "Correo y Contraseña.
        let user = document.getElementById("exampleInputEmail1");
        let password = document.getElementById("exampleInputPassword1");

        //Validacion de que el formulario de Login este lleno
        if (user.value == "" || password.value == "") {
            //Si uno o ambos campos no estan llenos correctamente se envia un mensaje
            alertDom.innerHTML = `
                <div id="liveAlertPlaceholder"><div></div><div><div class="alert alert-warning alert-dismissible" role="alert">   <div>Por favor complete ambos campos correctamente para iniciar sesion.</div>   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div><div></div><div></div><div></div></div>
                `;
        } else {
            //De lo contrario se comienza con la validacion de las credenciales del usuario
            try {
                for (let a = 0; a <= Students.length; a++) {
                    // Se hace un ciclo for para comparar lo ingresado por el usuario con las cuentas registradas.
                    if (
                        user.value === Students[a].email &&
                        password.value === Students[a].password
                    ) {
                        // Si se encuentra coincidencias
                        sessionStorage.setItem("session", `${Students[a].name}`); //Se obtiene el nombre del usuario que este ligada a esa cuenta
                        localStorage.setItem("minutes", 1200); //Se crea la variable los minutos del usuario
                        window.location.href = "exam-view.html"; //Ademas de que lo redireccionara al apartado del examen.
                        break; //Se corta el proceso del Script
                    }
                }
            } catch (error) {
                //De lo contrario se enviara un mensaje al usuario de que su cuenta no ha sido encontrada y no le permitira acceder
                alertDom.innerHTML = `
                    <div id="liveAlertPlaceholder"><div></div><div><div class="alert alert-danger alert-dismissible" role="alert">   <div>Correo o contraseña incorrectos, verifica tus credenciales.</div>   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div></div><div></div><div></div><div></div></div>
                    `;
            }
        }
    });
} else if (locationWindow.includes("exam-view.html")) {
    //Codigo para el examen en cursor

    var SessionUser = sessionStorage.getItem("session"); //Se hace la obtencion de la variable sessionStorage.
    document.getElementById("nombre-usuario").textContent = SessionUser; // Se obtiene el DOM donde se mostrara el nombre del usuario.

    //Funcion que servira para limpiar la informacion acerca de la sesion del usuario activo.
    function clearSsesion() {
        localStorage.setItem("nameusera", `${SessionUser}`);
        sessionStorage.removeItem("session");
    }

    //Funcion para ejecutar la evaluacion del examen
    function endTest() {
        //Array con la clave del examen
        let respuestas = [
            "flexRadioDefault1-3",
            "flexRadioDefault2-3",
            "flexRadioDefault3-3",
            "flexRadioDefault4-1",
            "flexRadioDefault5-2",
            "flexRadioDefault6-2",
            "flexRadioDefault7-3",
            "flexRadioDefault8-1",
            "flexRadioDefault9-2",
            "flexRadioDefault10-1",
            "flexRadioDefault11-2",
            "flexRadioDefault12-2",
            "flexRadioDefault13-3",
            "flexRadioDefault14-2",
            "flexRadioDefault15-1",
            "flexRadioDefault16-2",
            "flexRadioDefault17-2",
            "flexRadioDefault18-2",
            "flexRadioDefault19-1",
            "flexRadioDefault20-2",
        ];

        let correct = 0;
        let incorrect = 0;

        for (let i = 0; i < respuestas.length; i++) {
            if (document.getElementById(`${respuestas[i]}`).checked) {
                correct++;
            } else {
                incorrect++;
            }
        }

        //varariables para recaudar la informacion a enviar
        let mensajeAlumno;

        //Estructura de control para determinar si el alumno ha aprobado o no
        if (correct >= 14) {
            mensajeAlumno = "Aprobado";
        } else {
            mensajeAlumno = "No aprobado";
        }



        // Envio de los datos por medio del metodo postMessage.
        localStorage.setItem("ansCorrectas", `${correct}`);
        localStorage.setItem("ansInCorrectas", `${incorrect}`);
        localStorage.setItem("MessaAlum", `${mensajeAlumno}`);

        window.location.href = "results-exam.html";

    }

    //funcion para inicializar el contador del examen del usuario
    function iniciarTemporizador() {

        //Funcion para el temporazidor
        var tiempoRestante = localStorage.getItem("minutes");

        var intervalo = setInterval(function () {
            var minutos = Math.floor(tiempoRestante / 60);
            var segundos = tiempoRestante % 60;

            // Formatear el tiempo para que siempre tenga dos dígitos
            minutos = minutos < 10 ? "0" + minutos : minutos;
            segundos = segundos < 10 ? "0" + segundos : segundos;

            var tiempoMostrado = minutos + ":" + segundos;
            document.getElementById("tiempo-usuario").textContent = tiempoMostrado;

            if (tiempoRestante <= 0) {
                clearSsesion();
                clearInterval(intervalo);
                Swal.fire({
                    title: "¡Se ha acabado el tiempo!",
                    text: "Tus respuestas seran evaluadas.",
                    icon: "info",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        endTest();
                    }
                });
            } else {
                tiempoRestante--;
                //Variable que guardara el timepo
                localStorage.setItem("minutes", `${tiempoRestante}`);
                console.log(localStorage.getItem("minutes"));
            }
        }, 1000); // Actualizar cada segundo (1000 milisegundos)
    }

    // Iniciar el temporizador cuando se carga la página
    window.addEventListener("load", () => {
        //localStorage.setItem("startTime", true);
        if (sessionStorage.getItem("session")) {
            iniciarTemporizador();
        } else {
            Swal.fire({
                title: "Acceso no valido",
                text: "Lo sentimos pero eso no esta permitido :(",
                icon: "warning",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Volver al login",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "index.html";
                }
            });
        }
    });

    //Evento para enviar los resultados a otro sitio
    document.getElementById("enviar").addEventListener("click", () => {
        Swal.fire({
            title: "Finalizar examen ahora",
            text: "¿Estas segur@ de continuar?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, ¡Estoy seguro!",
            cancelButtonText: "Quiero volver",
        }).then((result) => {
            if (result.isConfirmed) {
                clearSsesion();
                endTest();
            }
        });

    });

} else if (locationWindow.includes("results-exam.html")) {

    window.addEventListener("load", () => {
        //Verificar si hay rastros de una sesion reciente de la cual puede recuperarse informacion y mosrarla.
        if (localStorage.getItem("nameusera")) {
            let userName = localStorage.getItem("nameusera");
            let dato1 = localStorage.getItem("ansCorrectas");
            let dato2 = localStorage.getItem("ansInCorrectas");
            let dato3 = localStorage.getItem("MessaAlum");

            document.getElementById("name-usuario").textContent = userName;
            document.getElementById("CountCorrect").textContent = dato1;
            document.getElementById("CountIcorrectorrect").textContent = dato2;
            document.getElementById("MessageStudent").textContent = dato3;

            //Una vez que se haya terminado de usar la informacion se procede a la eliminacion sessionStorage para que el usuario no pueda volver a contestar
            sessionStorage.removeItem("session");
            sessionStorage.removeItem("minutes");

            //Escuchar el evento de click en el boton "Salir del examen" para volver al login
            document.getElementById("btnTerminar").addEventListener("click", () => {

                Swal.fire({
                    title: "¡Gracias por usar ExamNow.com!",
                    text: "Seras redireccionado al login.",
                    icon: "info",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Entiendo",
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.isConfirmed) {

                        //Una vez que el usuario confirma la salida del examen se hace la limpieza de su informacion para que el siguiente usuario pueda hacer el examen
                        localStorage.removeItem("nameusera");
                        localStorage.removeItem("ansCorrectas");
                        localStorage.removeItem("ansInCorrectas");
                        localStorage.removeItem("MessaAlum");
                        window.location.href = "index.html";
                    }
                });

            });
        } else {
            window.location.href = "index.html";
        }
    });
}