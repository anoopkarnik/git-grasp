"use client"
import { useRef, useState } from "react"

export function useAudioRecorder() {
  const [recording, setRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunks = useRef<Blob[]>([])

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    console.log("Audio stream started")
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    audioChunks.current = []

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.current.push(event.data)
    }

    mediaRecorder.onstop = () => {
      stream.getTracks().forEach(track => track.stop())
    }

    mediaRecorder.start()
    setRecording(true)
  }

  const stopRecording = async (): Promise<Blob> => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' })
          resolve(audioBlob)
          audioChunks.current = []
          setRecording(false)
        }
        mediaRecorderRef.current.stop()
      }
    })
  }

  return { startRecording, stopRecording, recording }
}
