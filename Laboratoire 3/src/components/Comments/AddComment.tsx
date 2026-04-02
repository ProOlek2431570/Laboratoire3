import { useState } from 'react'

interface AddCommentProps {
  blogId: string;
  onAdd: (commentaire: any) => void;
}

export default function AddComment({ blogId, onAdd }: AddCommentProps) {
  const [contenu, setContenu] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment = {
      publicationId: blogId, // ✅ bon id
      datePublication: new Date().toISOString().split("T")[0],
      contenu: contenu
    };

    // 🔥 ENVOI VERS DB.JSON
    fetch("http://localhost:3000/commentaires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newComment)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Ajouté :", data);

        // 🔥 update UI
        onAdd(data);

        setContenu(""); // reset champ
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h4>Ajouter un commentaire</h4>

      <textarea
        className="form-control mb-2"
        value={contenu}
        onChange={(e) => setContenu(e.target.value)}
        placeholder="Votre commentaire..."
      />

      <button className="btn btn-primary" type="submit">
        Envoyer
      </button>
    </form>
  );
}