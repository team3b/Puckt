package main

import (
	"log"
	"net/http"
	"path"
)

var fsrv = http.FileServer(http.Dir("../"))

func main() {
	http.HandleFunc("/", handler)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}

func handler(w http.ResponseWriter, r *http.Request) {
	p := path.Clean(r.URL.Path)

	if len(p) >= 5 && p[:5] == "/.git" {
		log.Printf("Someone attempted to access %s\n", p)
		http.NotFound(w, r)
		return
	}

	fsrv.ServeHTTP(w, r)
}