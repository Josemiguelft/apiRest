var PI = 3.1416;
function sumar(a, b) {
  return a + b;
}
function restar(a, b) {
  return a - b;
}
function multiplicar(a, b) {
  return a * b;
}

let data = [
  {
    nombre: "Jose Lopez",
    domicilio: "Av. del mar 1200",
    edad: "20",
    sexo: "M",
  },
  {
    nombre: "María García",
    domicilio: "Calle Primavera 456",
    edad: "25",
    sexo: "F",
  },
  {
    nombre: "Carlos Martínez",
    domicilio: "Av. Central 789",
    edad: "32",
    sexo: "M",
  },
  {
    nombre: "Ana Rodríguez",
    domicilio: "Paseo Reforma 1010",
    edad: "28",
    sexo: "F",
  },
  {
    nombre: "Luis Sánchez",
    domicilio: "Blvd. Libertad 55",
    edad: "40",
    sexo: "M",
  },
];

export { sumar, restar, multiplicar, PI, data };
