import { useEffect, useState } from 'react'
import Comment from './Comment'

interface CommentType {
  id: string;
  publicationId: string;
  contenu: string;
  datePublication: string;
}

interface CommentListProps {
  blogId: string;
  nouveauxCommentaires: CommentType[];
}

export default function CommentList({ blogId, nouveauxCommentaires }: CommentListProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const tousLesCommentaires = [
    ...comments,
    ...(nouveauxCommentaires || [])
  ];

  useEffect(() => {
    fetch("http://localhost:3000/commentaires")
      .then(res => res.json())
      .then(data => {
        const filtres = data.filter((c: CommentType) => c.publicationId == blogId);

        setComments(filtres);
      });
  }, [blogId]);

  
  return (
    <div className="mt-5">
      <h4>Commentaires</h4>
        
      {tousLesCommentaires.map((c) => (
        <Comment
          key={c.id}
          publicationId={c.publicationId}
          contenu={c.contenu}
          datePublication={c.datePublication}
        />
      ))}
    </div>
  );
}