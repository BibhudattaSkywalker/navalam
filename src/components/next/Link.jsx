import { Link as RouterLink } from "react-router-dom";

export default function Link({ href = "#", ...props }) {
  const isPlainAnchor =
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isPlainAnchor) {
    return <a href={href} {...props} />;
  }

  return <RouterLink to={href} {...props} />;
}
