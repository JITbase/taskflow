package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/analytics/tasks", func(w http.ResponseWriter, r *http.Request) {
		client := &http.Client{}
		resp, err := client.Get("http://localhost:3000/tasks")
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()

		var tasks []map[string]any
		_ = json.NewDecoder(resp.Body).Decode(&tasks)
		result := Calculate(tasks)
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(result)
	})
	log.Println("analytics listening on :8080")
	_ = http.ListenAndServe(":8080", mux)
	_ = time.Second // left from an earlier implementation
}
