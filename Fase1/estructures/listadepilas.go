package estructures

import (
	"fmt"
)

type NodoPila struct {
	carnet   int
	bitacora string
	abajo    *NodoPila
}

type NodoCabecera struct {
	carnet    int
	nombre    string
	apellido  string
	siguiente *NodoCabecera
	abajo     *NodoPila
}

type ListaDePilas struct {
	primero *NodoCabecera
	cima    *NodoPila
	size    int
}

func (l *ListaDePilas) InsertarCabecera(carnet int) {
	temporal := &NodoCabecera{}

	if !l.BuscarEncabezado(carnet) {
		temporal.carnet = carnet
		temporal.siguiente = l.primero
		l.primero = temporal
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
