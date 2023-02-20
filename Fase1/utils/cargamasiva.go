package utils

import (
	"Fase1/estructures"
	"encoding/csv"
	"io"
	"log"
	"os"
	"strconv"
)

func LecturaData(dir string) {
	// Abrir archivo CSV
	file, err := os.Open(dir)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// Crear un nuevo lector CSV
	reader := csv.NewReader(file)

	// Leer la primera línea y descartarla (encabezados de columna)
	_, err = reader.Read()
	if err != nil {
		log.Fatal(err)
	}

	// Leer las filas de datos restantes
	lista := estructures.ListaDoblementeEnlazada{}
	for {
		// Leer una fila de datos
		row, err := reader.Read()

		// Salir del bucle si se alcanza el final del archivo
		if err == io.EOF {
			break
		}

		// Manejar otros errores
		if err != nil {
			log.Fatal(err)
		}

		// Convertir los datos de la fila en una estructura Person
		carnet, err := strconv.Atoi(row[0])
		if err != nil {
			log.Fatal(err)
		}
		// Agregar la estructura Person a la lista de personas
		lista.Insertar(carnet, row[1], row[2], row[3])
	}

	// Imprimir los datos cargados
	lista.Imprimir()
}
