package utils

import (
	"bufio"
	"fmt"
	"os"
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
		case "2":
			fmt.Println("=======Lista de Estudiantes=======")
		case "3":
			fmt.Println("=======Registrar Estudiante=======")
		case "4":
			fmt.Println("=======Carga Masiva=======")
		case "5":
			fmt.Println("Saliendo...")
			return
		default:
			fmt.Println("Opción no válida")
		}
	}
}
