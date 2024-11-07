package main

import (
	"time"
)

func processJobs() {
	jobQueue.lock.Lock()
	if jobQueue.queue.Len() == 0 {
		jobQueue.lock.Unlock()
		return
	}

	job := heap.Pop(&jobQueue.queue).(*Job)
	job.Status = "running"
	broadcastJobUpdate(job)
	jobQueue.lock.Unlock()

	time.Sleep(job.Duration)
	job.Status = "completed"
	broadcastJobUpdate(job)
}
