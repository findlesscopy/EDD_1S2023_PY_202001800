package utils

import (
	"Fase1/estructures"
	"bufio"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"
	"strings"
)

func MenuPrincipal() {
	for {
		fmt.Println("========EDD GODrive========")
		fmt.Println("| 1. Iniciar Sesión       |")
		fmt.Println("| 2. Salir                |")
		fmt.Println("==================e========")
		fmt.Print("Elija una opción: ")

		reader := bufio.NewReader(os.Stdin)
		input, _ := reader.ReadString('\n')
		eleccion := strings.TrimRight(input, "\r\n")

		switch eleccion {
		case "1":
			fmt.Println("Has elegido la opción 1")
			iniciarSesion()
		case "2":
			fmt.Println("Saliendo...")
			return
		default:
			fmt.Println("Opción no válida")
		}
	}
}

func iniciarSesion() {
	nombre := ""
	password := ""
	fmt.Println("Ingrese su nombre de usuario: ")
	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')
	nombre = strings.TrimRight(input, "\r\n")
	fmt.Println("Ingrese su contraseña: ")
	reader = bufio.NewReader(os.Stdin)
	input, _ = reader.ReadString('\n')
	password = strings.TrimRight(input, "\r\n")
	if nombre == "admin" && password == "admin" {
		MenuAdmin()
	}

	fmt.Println("Iniciando sesiónAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA...", nombre, password)
}

func MenuAdmin() {
	lista := estructures.ListaDoblementeEnlazada{}
	cola := estructures.Cola{}
	for {
		fmt.Println("=======Dashboard Administrador=======")
		fmt.Println("| 1. Ver estudiantes pendiente      |")
		fmt.Println("| 2. Ver estudiantes del sistema    |")
		fmt.Println("| 3. Registrar nuevos estudiantes   |")
		fmt.Println("| 4. Carga masiva de estudiantes    |")
		fmt.Println("| 5. Salir                          |")
		fmt.Println("=====================================")
		fmt.Print("Elija una opción: ")

		reader := bufio.NewReader(os.Stdin)
		input, _ := reader.ReadString('\n')
		eleccion := strings.TrimRight(input, "\r\n")

		switch eleccion {
		case "1":
			fmt.Println("=======Estudiantes Pendientes=======")
			cola.Imprimir()
		case "2":
			fmt.Println("=======Lista de Estudiantes=======")
			lista.OrdenarPorCarnet()
			lista.Imprimir()
		case "3":

			fmt.Println("=======Registrar Estudiante=======")
			fmt.Println("Ingrese el carnet: ")
			reader := bufio.NewReader(os.Stdin)
			input, _ := reader.ReadString('\n')
			carnet := strings.TrimRight(input, "\r\n")
			carnet1, err := strconv.Atoi(carnet)
			if err != nil {
				log.Fatal(err)
			}
			fmt.Println("Ingrese el nombre: ")
			reader = bufio.NewReader(os.Stdin)
			input, _ = reader.ReadString('\n')
			nombre := strings.TrimRight(input, "\r\n")
			fmt.Println("Ingrese el apellido: ")
			reader = bufio.NewReader(os.Stdin)
			input, _ = reader.ReadString('\n')
			apellido := strings.TrimRight(input, "\r\n")
			fmt.Println("Ingrese la contraseña: ")
			reader = bufio.NewReader(os.Stdin)
			input, _ = reader.ReadString('\n')
			password := strings.TrimRight(input, "\r\n")
			cola.Insertar(carnet1, nombre, apellido, password)

		case "4":
			fmt.Println("=======Carga Masiva=======")
			fmt.Println("Ingrese la dirección del archivo: ")
			reader := bufio.NewReader(os.Stdin)
			input, _ := reader.ReadString('\n')
			dir := strings.TrimRight(input, "\r\n")
			// Abrir archivo CSV
			file, err := os.Open(dir)
			if err != nil {
				log.Fatal(err)
			}
			defer file.Close()

			// Crear un nuevo lector CSV
			reader1 := csv.NewReader(file)

			// Leer la primera línea y descartarla (encabezados de columna)
			_, err = reader1.Read()
			if err != nil {
				log.Fatal(err)
			}

			// Leer las filas de datos restantes
			for {
				// Leer una fila de datos
				row, err := reader1.Read()

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
				cola.Insertar(carnet, row[1], row[2], row[3])
			}
			fmt.Println("Carga masiva realizada con éxito")
		case "5":
			fmt.Println("Saliendo...")
			return
		default:
			fmt.Println("Opción no válida")
		}
	}
}
