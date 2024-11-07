package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/jobs", jobHandler)  // REST API for job management
	http.HandleFunc("/ws", wsHandler)     // WebSocket endpoint for real-time updates

	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
