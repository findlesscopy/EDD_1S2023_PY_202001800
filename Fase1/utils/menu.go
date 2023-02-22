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
	"time"
)

var lista *estructures.ListaDoblementeEnlazada = &estructures.ListaDoblementeEnlazada{}
var cola *estructures.Cola = &estructures.Cola{}
var pila_admin *estructures.Pila = &estructures.Pila{}
var pila_estudiantes *estructures.ListaDePilas = &estructures.ListaDePilas{}

//var pila *estructures.Pila = &estructures.Pila{}

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
			//LimpiarConsola()
		}
	}
}

func iniciarSesion() {
	nombre := ""
	password := ""
	fmt.Println("Ingrese su carnet o nombre de usuario: ")
	reader := bufio.NewReader(os.Stdin)
	input, _ := reader.ReadString('\n')
	nombre = strings.TrimRight(input, "\r\n")
	fmt.Println("Ingrese su contraseña: ")
	reader = bufio.NewReader(os.Stdin)
	input, _ = reader.ReadString('\n')
	password = strings.TrimRight(input, "\r\n")
	if nombre == "admin" && password == "admin" {
		MenuAdmin()
	} else {
		nombre1, err := strconv.Atoi(nombre)
		if err != nil {
			log.Fatal(err)
		}
		if lista.Login(nombre1, password) {
			MenuEstudiante(nombre1)

		}

	}

	//fmt.Println("Iniciando sesiónAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA...", nombre, password)
}

func MenuAdmin() {
	for {
		fmt.Println("=======Dashboard Administrador=======")
		fmt.Println("| 1. Ver estudiantes pendiente      |")
		fmt.Println("| 2. Ver estudiantes del sistema    |")
		fmt.Println("| 3. Registrar nuevos estudiantes   |")
		fmt.Println("| 4. Carga masiva de estudiantes    |")
		fmt.Println("| 5. Reportes en Graphviz           |")
		fmt.Println("| 6. Salir                          |")
		fmt.Println("=====================================")
		fmt.Print("Elija una opción: ")

		reader := bufio.NewReader(os.Stdin)
		input, _ := reader.ReadString('\n')
		eleccion := strings.TrimRight(input, "\r\n")

		switch eleccion {
		case "1":
			EstudiantesPendientes()
		case "2":
			fmt.Println("=====================Lista de Estudiantes=====================")
			lista.OrdenarPorCarnet()
			lista.Imprimir()
		case "3":
			fmt.Println("=======Registrar Estudiante=======")
			RegistrarEstudiante()
		case "4":
			fmt.Println("=======Carga Masiva=======")
			CargaMasiva()
		case "5":

			//pila_admin.Graficar()
			Reportes()
		case "6":
			fmt.Println("Saliendo...")
			return
		default:
			fmt.Println("Opción no válida")
		}
	}
}

func EstudiantesPendientes() {
	carnet, nombre, password, tamanio := cola.RetornarEstudiante()
	if carnet == -1 {
		fmt.Println("¡No hay estudiantes pendientes!")
	} else {
		for {
			fmt.Println()
			fmt.Println("Estudiante pendientes: ", tamanio)
			fmt.Println("Nombre: ", nombre)
			fmt.Println("1. Aceptar al estudiante")
			fmt.Println("2. Rechazar al estudiante")
			fmt.Println("3. Salir")
			reader := bufio.NewReader(os.Stdin)
			input, _ := reader.ReadString('\n')
			seleccion := strings.TrimRight(input, "\r\n")
			switch seleccion {

			case "1":
				fmt.Println("-------✔ Estudiante aceptado ✔-------")
				lista.Insertar(carnet, nombre, password)
				pila_admin.Push("Se acepto al estudiante: " + nombre + " con carnet: " + strconv.Itoa(carnet) + " a las: " + time.Now().Format("2006-01-02 15:04:05"))
				cola.Eliminar()
				carnet, nombre, password, tamanio = cola.RetornarEstudiante()
				if carnet == -1 {
					fmt.Println("¡No hay estudiantes pendientes!")
					return
				}
			case "2":
				fmt.Println("-----xX Estudiante rechazado Xx-----")
				pila_admin.Push("Se rechazó al estudiante: " + nombre + " con carnet: " + strconv.Itoa(carnet) + " a las: " + time.Now().Format("2006-01-02 15:04:05"))

				cola.Eliminar()
				carnet, nombre, password, tamanio = cola.RetornarEstudiante()
				if carnet == -1 {
					fmt.Println("¡No hay estudiantes pendientes!")
					return
				}
			case "3":
				fmt.Println("Saliendo...")
				return
			default:
				fmt.Println("Opcion no valida")

			}
		}

	}
}

func RegistrarEstudiante() {
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
	fmt.Println("Se ha ingresado en la cola el estudiante: ", nombre, apellido, "con carnet: ", carnet)
	cola.Insertar(carnet1, nombre+" "+apellido, password)
}

func CargaMasiva() {
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
		cola.Insertar(carnet, row[1], row[2])
	}
	fmt.Println("Carga masiva realizada con éxito")
}

func MenuEstudiante(carnet int) {
	fmt.Println("Bienvenido estudiante: ", carnet)
	fmt.Println("===============Bitácora de ingresos===============")
	carnet, nombre := lista.BuscarUsuario(carnet)
	pila_estudiantes.InsertarCabecera(carnet, nombre)
	pila_estudiantes.PushPila(carnet, "Ingreso al sistema a las: "+time.Now().Format("02-01-2006 15:04:05"))
	pila_estudiantes.Imprimir(carnet)
}

func Reportes() {
	for {
		fmt.Println("================Reportes================")
		fmt.Println("| 1. Reporte Lista Enlazada con Pilas  |")
		fmt.Println("| 2. Reporte de La Cola                |")
		fmt.Println("| 3. Reporte de bitácora Admin			|")
		fmt.Println("| 4. Reporte JSON de Aceptados			|")
		fmt.Println("| 5. Salir 							|")
		fmt.Println("========================================")
		reader := bufio.NewReader(os.Stdin)
		input, _ := reader.ReadString('\n')
		opcion := strings.TrimRight(input, "\r\n")
		switch opcion {
		case "1":
			fmt.Println("Generando reporte de lista enlazada con pilas...")
			pila_estudiantes.GenerarGrafo()
		case "2":
			fmt.Println("Generando reporte de la cola...")
			cola.GenerarGrafo()
		case "3":
			fmt.Println("Generando reporte de bitácora admin...")
			pila_admin.GenerarGrafo()
		case "4":
			lista.GenerarJSON()
		case "5":
			fmt.Println("Saliendo...")
			return
		default:
			fmt.Println("Opcion no valida")
		}
	}
}
