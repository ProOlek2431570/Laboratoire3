import { useState, useEffect } from 'react'
import BlogCard from './BlogCard'
import imagePrincipale from "../../assets/Jad.png"

interface Article {
  id: number;
  titre: string;
  description: string;
  image: any;
  date: string;
  auteur: string;
}

export default function BlogList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/publications")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement");
        return res.json();
      })
      .then((data) => {
        const articlesFormates: Article[] = data.slice(0, 6).map((item: any) => ({
          id: item.id,
          titre: item.titre,
          description: item.contenu,
          image: imagePrincipale,
          date: item.datePublication,
          auteur: "Auteur " + item.auteur,
        }));
        setArticles(articlesFormates);
      })
      .catch((err) => {
        setErreur(err.message);
      });
  }, []); // [] = s'exécute une seule fois au chargement
  if (erreur) return (
    <div className="alert alert-danger m-5">
      ❌ Erreur : {erreur}
    </div>
  );

  return (
    <main className="container my-5">
      <h2 className="mb-4">Articles récents</h2>

      <div className="row g-4">
        {articles.map((article) => (
          <div className="col-12 col-md-4" key={article.id}>
            <BlogCard
              id={article.id}
              titre={article.titre}
              description={article.description}
              image={article.image}
              date={article.date}
              auteur={article.auteur}
            />
          </div>
        ))}
      </div>
    </main>
  );
}