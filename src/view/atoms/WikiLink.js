import STYLE from "../STYLE";

export default function WikiLink({ children, label = undefined }) {
  let searchTerm = "";
  if (typeof children === "string") {
    searchTerm = children;
  } else if (Array.isArray(children)) {
    searchTerm = children.join(" ");
  } else {
    return searchTerm;
  }

  if (!label) {
    label = searchTerm;
  }

  const url = "https://en.wikipedia.org/wiki/" + searchTerm.replace(" ", "_");
  return (
    <a href={url} target="_blank" rel="noreferrer" style={STYLE.WIKI_LINK}>
      {label}
    </a>
  );
}