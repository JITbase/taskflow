package main

type Stats struct {
	Total int `json:"total"`
	Completed int `json:"completed"`
	Pending int `json:"pending"`
}

var counters = map[string]int{}

func Calculate(tasks []map[string]any) Stats {
	result := Stats{Total: len(tasks)}
	for _, task := range tasks {
		status, _ := task["status"].(string)
		counters[status]++
		if status == "DONE" {
			result.Completed++
		} else {
			result.Pending++
		}
	}
	return result
}
