import { useState, useEffect } from 'react'
import blogImage from '../../assets/image_blog.jpg'
import CommentList from '../Comments/CommentList'
import AddComment from '../Comments/AddComment'


interface ArticleDetails {
  id: string;
  titre: string;
  contenu: string;
  datePublication: string;
  auteur: string;
}

interface BlogDetailsProps {
  id: string;
}

export default function BlogDetails({ id }: BlogDetailsProps) {
  
  const [article, setArticle] = useState<ArticleDetails | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [nouveauxCommentaires, setNouveauxCommentaires] = useState<any[]>([]);
  const ajouterCommentaire = (commentaire: any) => {
    setNouveauxCommentaires((prev) => [...prev, commentaire]);
  };

  useEffect(() => {
    fetch("http://localhost:3000/publications")
      .then((res) => {
        if (!res.ok) throw new Error("Article introuvable");
        return res.json();
      })
      .then((data) => {
        const trouve = data.find((item: any) => item.id === id);
        if (!trouve) throw new Error("Article introuvable");
        setArticle(trouve);
      })
      .catch((err) => {
        setErreur(err.message);
      });
  }, [id]);

  if (erreur) return (
    <div className="alert alert-danger m-5">
      ❌ Erreur : {erreur}
    </div>
  );

  if (!article) return null;

  return (
    <div className="container-fluid my-5" style={{ backgroundColor: "#EEEEEE" }}>

      <div className="hero mb-4"></div>

      <img
        className="col-12 mb-4"
        src={blogImage}
        alt="Blog Image"
        style={{ maxHeight: "150px" }}
      />
      <h2 className="text-center mb-4">{article.titre}</h2>
      <div>
        <p>{article.contenu}</p>
        <p className="mt-4 text-muted">
          {article.auteur} — {article.datePublication}
        </p>
        <CommentList blogId={id} nouveauxCommentaires={nouveauxCommentaires} />
        <AddComment blogId={id} onAdd={ajouterCommentaire} />
      </div>
    </div>
  );
}