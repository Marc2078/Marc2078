# Creando los archivos HTML, CSS y JS para que el usuario pueda descargarlos

# HTML
html_content = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Horarios de Trenes</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <header>
        <h1>Horarios de Trenes</h1>
    </header>

    <!-- Apartado de Horarios -->
    <section id="horarios">
        <h2>Horarios de los Trenes</h2>
        <table>
            <thead>
                <tr>
                    <th>Estación de Salida</th>
                    <th>Estación de Llegada</th>
                    <th>Hora de Salida</th>
                    <th>Hora de Llegada</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Estación A</td>
                    <td>Estación B</td>
                    <td>10:00 AM</td>
                    <td>10:45 AM</td>
                </tr>
                <tr>
                    <td>Estación B</td>
                    <td>Estación C</td>
                    <td>11:00 AM</td>
                    <td>11:45 AM</td>
                </tr>
            </tbody>
        </table>
    </section>

    <!-- Apartado de Incidencias -->
    <section id="incidencias">
        <h2>Incidencias</h2>
        <div id="incidencia-lista">
            <p>No hay incidencias reportadas.</p>
        </div>
        <button onclick="agregarIncidencia()">Reportar Incidencia</button>
    </section>

    <script src="script.js"></script>
</body>
</html>
"""

# CSS
css_content = """
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header {
    background-color: #0044cc;
    color: white;
    padding: 20px;
    text-align: center;
}

section {
    margin: 20px;
    padding: 10px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

table {
    width: 100%;
    border-collapse: collapse;
}

table th, table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: center;
}

button {
    padding: 10px 20px;
    background-color: #ff3333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #e60000;
}
"""

# JavaScript
js_content = """
function agregarIncidencia() {
    const lista = document.getElementById("incidencia-lista");
    const nuevaIncidencia = document.createElement("p");
    nuevaIncidencia.textContent = "Incidencia reportada: Retraso en el tren de la estación A a la B.";
    lista.appendChild(nuevaIncidencia);
}
"""

# Guardando los archivos
html_file_path = "/mnt/data/horarios_trenes/index.html"
css_file_path = "/mnt/data/horarios_trenes/styles.css"
js_file_path = "/mnt/data/horarios_trenes/script.js"

# Crear las carpetas si no existen
import os
os.makedirs(os.path.dirname(html_file_path), exist_ok=True)

# Guardar el contenido en los archivos correspondientes
with open(html_file_path, 'w') as f:
    f.write(html_content)

with open(css_file_path, 'w') as f:
    f.write(css_content)

with open(js_file_path, 'w') as f:
    f.write(js_content)

# Retornar los enlaces de descarga
html_file_path, css_file_path, js_file_path
