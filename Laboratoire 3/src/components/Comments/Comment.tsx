interface CommentProps {
    publicationId: string;
    contenu: string;
    datePublication: string;
  }
  
export default function Comment({ contenu, datePublication }: CommentProps) {
    return (
      <div className="border rounded p-3 mb-3">
        <p className="mb-1">{contenu}</p>
        <small className="text-muted">
          📅 {datePublication}
        </small>
      </div>
    );
}