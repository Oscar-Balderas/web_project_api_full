export default function Card(props) {
  const { name, link, isLiked } = props.card;

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => props.onCardClick(props.card)}
      />

      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={() => props.onCardDelete(props.card)}
      />

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          aria-label="Like card"
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_is-active" : ""
          }`}
          onClick={() => props.onCardLike(props.card)}
        />
      </div>
    </li>
  );
}
