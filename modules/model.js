import { rejects } from "assert";
import { promises } from "fs";
import mysql from "mysql2";
import { resolve } from "path";

// Configurar la conexión a la base de datos
var conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "sistemas",
  dateStrings: true,
});

// Conectar a la base de datos
conexion.connect((err) => {
  if (!err) {
    console.log("Se logro establecer la conexión a la base de datos");
  } else {
    console.log("Surgio un error" + err);
  }
});

var alumnosDB = {};

// Funcion para insertar
alumnosDB.insertar = function insertar(alumno) {
  return new Promise((resolve, reject) => {
    let sqlConsulta = "INSERT INTO alumnos SET ?";
    conexion.query(sqlConsulta, alumno, (err, res) => {
      if (err) {
        console.log("Error al insertar el alumno: " + err);
        reject(err);
      }
      {
        resolve(res.insertId);
      }
    });
  });
};

alumnosDB.mostrarTodos = function mostrarTodos() {
    return new Promise((resolve, reject) => {
        let sqlConsulta = "SELECT * FROM alumnos";
        conexion.query(sqlConsulta, (err, res) => {
            if (err) {
                console.log("Error al mostrar los alumnos: " + err);
                reject(err);
            } else {
                console.log("Se mostraron los alumnos");
                resolve(res);
            }
        })
    })
};

const alumno = {
  matricula: "2022030088",
  nombre: "Jose Lopez",
  domicilio: "Av. Juarez 123",
  fechanac: "2004-03-12",
  sexo: "M",
  status: 0,
};

// Buscar por id
alumnosDB.buscarPorId = function buscarPorId(id) {
  return new Promise((resolve, reject) => {
    let sqlConsulta = "SELECT * FROM alumnos WHERE id = ?";
    conexion.query(sqlConsulta, [id], (err, res) => {
      if (err) {
        console.log("Error al buscar el alumno: " + err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

// Buscar por matricula
alumnosDB.buscarPorMatricula = function buscarPorMatricula(matricula) {
  return new Promise((resolve, reject) => {
    let sqlConsulta = "SELECT * FROM alumnos WHERE matricula = ?";
    conexion.query(sqlConsulta, [matricula], (err, res) => {
      if (err) {
        console.log("Error al buscar el alumno: " + err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

// Borrar por id
alumnosDB.borrarPorId = function borrarPorId(id) {
  return new Promise((resolve, reject) => {
    let sqlConsulta = "DELETE FROM alumnos WHERE id = ?";
    conexion.query(sqlConsulta, [id], (err, res) => {
      if (err) {
        console.log("Error al borrar el alumno: " + err);
        reject(err);
      } else {
        resolve("Se borro el alumno con id: " + id);
      }
    });
  });
}

// Actualizar un registro completo por id
alumnosDB.actualizarPorId = function actualizarPorId(id, nuevoAlumno) {
  return new Promise((resolve, reject) => {
    let sqlConsulta = "UPDATE alumnos SET ? WHERE id = ?";
    conexion.query(sqlConsulta, [nuevoAlumno, id], (err, res) => {
      if (err) {
        console.log("Error al actualizar el alumno: " + err);
        reject(err);
      } else {
        resolve("Se actualizo el alumno con id: " + id);
      }
    });
  });
}

// Actualizar estado (cambiar 0 a 1 o 1 a 0)
alumnosDB.cambiarStatus = function cambiarStatus(id) {
  return new Promise((resolve, reject) => {
    let sqlConsulta = "UPDATE alumnos SET status = NOT status WHERE id = ?";
    conexion.query(sqlConsulta, [id], (err, res) => {
      if (err) {
        console.log("Error al cambiar el estado del alumno: " + err);
        reject(err);
      } else {
        resolve("Se cambio el estado del alumno con id: " + id);
      }
    });
  });
}

// Llamar a la funciones async/await
async function test() {
  try {
    console.log("Insertando alumno...");
    let id = await alumnosDB.insertar(alumno);
    console.log("El id del alumno insertado es: " + id);

    console.log("Obteniendo lista de alumnos...");
    let alumnos = await alumnosDB.mostrarTodos();
    console.log(alumnos);

    console.log("Actualizando alumno...");
    alumno.nombre = "Maria Carbajo";
    alumno.domicilio = "Av. del Sol 33";
    alumno.fechanac = "2004-06-16";
    alumno.sexo = "F";
    await alumnosDB.actualizarPorId(id, alumno);

    // consultar por matricula
    let objAlumno = await alumnosDB.buscarPorMatricula(alumno.matricula);
    console.log("Alumno consultado: ", objAlumno);
    console.log("Cambiar de estatus al alumno con id: " + id);
    await alumnosDB.cambiarStatus(id);
    console.log("Mostrar alumno con cambio de estatus: ");

    let obj = await alumnosDB.buscarPorId(id);
    console.log("Alumno encontrado: ", obj);

  } catch (error) {
    console.log("Error: " + error);
  }
}

test ();
export default alumnosDB;
