import sprite from "../../assets/svg/sprite.svg";

export default function SpriteIcon({
  id,
  width,
  height,
  className = "",
}) {
  return (
    <svg className={className} width={width} height={height}>
      <use xlinkHref={`${sprite}#${id}`} />
    </svg>
  );
}
