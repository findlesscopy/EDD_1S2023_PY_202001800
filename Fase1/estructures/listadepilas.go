package estructures

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"strconv"
)

type NodoPila struct {
	carnet   int
	bitacora string
	abajo    *NodoPila
}

type NodoCabecera struct {
	carnet    int
	nombre    string
	siguiente *NodoCabecera
	abajo     *NodoPila
}

type ListaDePilas struct {
	primero *NodoCabecera
	cima    *NodoPila
	size    int
}

func (l *ListaDePilas) InsertarCabecera(carnet int, nombre string) {
	temporal := &NodoCabecera{carnet: carnet, nombre: nombre}

	if l.BuscarEncabezado(carnet) {
		fmt.Println("El carnet ya existe")
	} else {
		if l.primero == nil || carnet < l.primero.carnet {
			temporal.siguiente = l.primero
			l.primero = temporal
		} else {
			aux := l.primero
			for aux.siguiente != nil && carnet > aux.siguiente.carnet {
				aux = aux.siguiente
			}
			temporal.siguiente = aux.siguiente
			aux.siguiente = temporal
		}
		l.size++
	}

}

func (l *ListaDePilas) PushPila(carnet int, bitacora string) {
	temporal := l.primero
	for temporal != nil {
		if temporal.carnet == carnet {
			nuevaPila := &NodoPila{bitacora: bitacora, abajo: l.cima}
			l.cima = nuevaPila
			inicioPila := temporal.abajo
			temporal.abajo = nuevaPila
			nuevaPila.abajo = inicioPila
			break
		}
		temporal = temporal.siguiente
	}
	if temporal == nil {
		fmt.Println("No se encontró la categoría dada")
	}
}

func (l *ListaDePilas) BuscarEncabezado(carnet int) bool {
	temporal := l.primero
	flag := 0
	for temporal != nil {
		if temporal.carnet == carnet {
			flag = 1
			break
		}
		temporal = temporal.siguiente
	}
	return flag == 1
}

func (l *ListaDePilas) Imprimir(carnet int) {
	temporal := l.primero
	for temporal != nil {
		if temporal.carnet == carnet {
			temporal_pila := temporal.abajo
			for temporal_pila != nil {
				fmt.Println(temporal_pila.bitacora)
				temporal_pila = temporal_pila.abajo
			}
			break
		}
		temporal = temporal.siguiente
	}
	if temporal == nil {
		fmt.Println("No se encontró la categoría dada")
	}

}

func (l *ListaDePilas) GenerarGrafo() {
	dot := "digraph G{\nlabel=\" Lista de Pilas \";\nnode [shape=box fontsize=12 arrowsize=0.1] ;\n"
	temporal_cabecera := l.primero
	nodos_cabecera := ""
	nodos_pilas := ""
	conexiones_cabecera := ""
	conexiones_pilas := ""
	conexiones_cabecera_pilas := ""
	num_nodo_cabecera := 1000
	num_nodo_pilas := 100
	for temporal_cabecera != nil {
		aux_num_cabecera := num_nodo_cabecera + 1000
		aux_num_cabecera2 := num_nodo_cabecera + 1
		aux_num_cabecera3 := num_nodo_cabecera + 1

		nodos_cabecera += "N" + strconv.Itoa(num_nodo_cabecera) + "[label=\"" + "Carnet: " + strconv.Itoa(temporal_cabecera.carnet) + "\nNombre: " + temporal_cabecera.nombre + "\" fixedsize=true, width=3, height=1];\n"
		temporal_pilas := temporal_cabecera.abajo
		aux_num_pilas := 1
		for temporal_pilas != nil {
			nodos_pilas += "N" + strconv.Itoa(num_nodo_pilas) + (strconv.Itoa(aux_num_pilas)) + "[arrowsize = 1, label=\"" + temporal_pilas.bitacora + "\" fixedsize=true, width=3, height=1 ];\n"
			temporal_pilas = temporal_pilas.abajo
			if temporal_pilas == nil {
				conexiones_cabecera_pilas += "N" + strconv.Itoa(num_nodo_cabecera) + " -> N" + strconv.Itoa(aux_num_cabecera2) + ";\n"
			} else {
				conexiones_pilas += "N" + strconv.Itoa(num_nodo_pilas) + (strconv.Itoa(aux_num_pilas)) + " -> N" + strconv.Itoa(aux_num_cabecera3+1) + ";\n"
			}

			aux_num_pilas++
			aux_num_cabecera3++
		}
		num_nodo_pilas = num_nodo_pilas + 100
		temporal_cabecera = temporal_cabecera.siguiente
		if temporal_cabecera == nil {
			break
		} else {
			conexiones_cabecera += "N" + strconv.Itoa(num_nodo_cabecera) + " -> N" + strconv.Itoa(aux_num_cabecera) + "[dir=forward];\n"
			conexiones_cabecera += "N" + strconv.Itoa(num_nodo_cabecera) + " -> N" + strconv.Itoa(aux_num_cabecera) + "[dir=back];\n"
			num_nodo_cabecera = num_nodo_cabecera + 1000
		}
	}
	if temporal_cabecera == nil {
		fmt.Println("No se encontró la cabecera")
	}

	dot += nodos_cabecera + "\n"
	dot += nodos_pilas + "\n"
	//agregando conexiones
	//dot += "N" + strconv.Itoa(num_nodo_cabecera-1000) + "->N1000 [dir = none]\n"
	dot += "{rank=same;\n" + conexiones_cabecera + "\n}"
	dot += "{\n" + conexiones_cabecera_pilas + "\n}"
	dot += "{\n" + conexiones_pilas + "\n}\n}"

	//fmt.Println(dot)
	nombre_archivo := "./ListaPilas.dot"
	nombre_imagen := "ListaPilas.jpg"
	crearArchivo(nombre_archivo)
	escribirArchivoDot(dot, nombre_archivo)
	ejecutar(nombre_imagen, nombre_archivo)
}

func crearArchivoLP(nombre_archivo string) {
	//Verifica que el archivo existe
	var _, err = os.Stat(nombre_archivo)
	//Crea el archivo si no existe
	if os.IsNotExist(err) {
		var file, err = os.Create(nombre_archivo)
		if err != nil {
			return
		}
		defer file.Close()
	}
	fmt.Println("Archivo creado exitosamente", nombre_archivo)
}

func escribirArchivoDotLP(contenido string, nombre_archivo string) {
	var file, err = os.OpenFile(nombre_archivo, os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(contenido)
	if err != nil {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if err != nil {
		return
	}
	fmt.Println("Archivo actualizado existosamente.")
}

func ejecutarLP(nombre_imagen string, archivo_dot string) {
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tjpg", archivo_dot).Output()
	mode := 0777
	_ = ioutil.WriteFile(nombre_imagen, cmd, os.FileMode(mode))
}
