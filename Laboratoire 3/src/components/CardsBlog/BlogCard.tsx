interface BlogCardProps {
    id: number;
    titre: string;
    description: string;
    image: "../../assets/Jad.png";
    date: string;
    auteur: string;
  }
  
export default function BlogCard({ id, titre, description, image, date, auteur }: BlogCardProps) {
    return (
        <article className="card h-100 border-dark border-2 rounded-4 shadow-sm overflow-hidden">
        <div className="bg-black d-flex justify-content-center align-items-center" style={{height: "200px"}}>
            <img src={image} alt="Blog Image" style={{maxHeight: "150px"}}/>
        </div>

        <div className="text-center text-black h5 px-3 py-2 fw-bold border-dark border-2">
            {titre}
        </div>

        <div className="card-body">
            <p className="card-text text-dark">
                {description}
            </p>
            <small className="text-muted">
                {auteur} — {date}
            </small>
        </div>
        <div className="card-body text-center">
        <a href={`pageBlog.html?id=${id}`} className="btn btn-primary">
              Lire la suite
          </a>
      </div>
    </article>
    );
}