package main

import "testing"

func TestCalculate(t *testing.T) {
	got := Calculate([]map[string]any{
		{"status": "DONE"},
		{"status": "TODO"},
	})
	if got.Total != 2 || got.Completed != 1 || got.Pending != 1 {
		t.Fatalf("unexpected stats: %#v", got)
	}
}
