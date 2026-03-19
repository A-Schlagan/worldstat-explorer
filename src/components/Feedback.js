import React, { useState } from "react"
import "../styles/global.css" 

export default function Feedback() {
  // Zustand für Kommentar-Text
  const [commentText, setCommentText] = useState("")
  // Liste der Kommentare
  const [comments, setComments] = useState([])

  // Funktion zum Absenden eines Kommentars
  const handleSubmit = (e) => {
    e.preventDefault()
    if (commentText.trim() === "") return

    // neuen Kommentar hinzufügen
    setComments([...comments, { text: commentText, id: Date.now() }])
    setCommentText("") // Eingabefeld leeren
  }

  return (
    <section className="feedbackSection">
      <h2>Kommentare</h2>

      {/* Formular für neuen Kommentar */}
      <form onSubmit={handleSubmit} className="feedbackForm">
        <textarea
          placeholder="Schreibe deinen Kommentar hier..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        />
        <button type="submit">Senden</button>
      </form>

      {/* Liste der Kommentare */}
      <div className="commentsList">
        {comments.length === 0 && <p>Noch keine Kommentare.</p>}
        {comments.map((comment) => (
          <div key={comment.id} className="commentCard">
            {comment.text}
          </div>
        ))}
      </div>
    </section>
  )
}