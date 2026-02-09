// 1. Clase Tarea
class Tarea {
    constructor(id, nombre, completada = false) {
        this.id = id;
        this.nombre = nombre;
        this.completada = completada;
    }
}

// 2. Clase Gestor de Tareas
class GestorDeTareas {
    constructor() {
        // Cargar desde LocalStorage o iniciar vacío
        this.tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        this.listElement = document.getElementById('taskList');
        this.render();
    }

    agregarTarea(nombre) {
        if (nombre.trim() === "") {
            alert("La tarea no puede estar vacía");
            return;
        }
        const nuevaTarea = new Tarea(Date.now(), nombre);
        this.tareas.push(nuevaTarea);
        this.actualizarAlmacenamiento();
    }

    eliminarTarea(id) {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.actualizarAlmacenamiento();
    }

    editarTarea(id) {
        const nuevoNombre = prompt("Edita tu tarea:");
        if (nuevoNombre && nuevoNombre.trim() !== "") {
            this.tareas = this.tareas.map(t => 
                t.id === id ? { ...t, nombre: nuevoNombre } : t
            );
            this.actualizarAlmacenamiento();
        }
    }

    actualizarAlmacenamiento() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
        this.render();
    }

    render() {
        this.listElement.innerHTML = '';
        
        // Uso de ES6+ (forEach, Arrow Functions, Template Literals)
        this.tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${tarea.nombre}</span>
                <div>
                    <button class="edit-btn" onclick="gestor.editarTarea(${tarea.id})">Editar</button>
                    <button class="delete-btn" onclick="gestor.eliminarTarea(${tarea.id})">Eliminar</button>
                </div>
            `;
            this.listElement.appendChild(li);
        });
    }
}

// Instanciar el gestor
const gestor = new GestorDeTareas();

// Evento para el botón agregar
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const input = document.getElementById('taskInput');
    gestor.agregarTarea(input.value);
    input.value = ''; // Limpiar input
});