import { createDomNode } from "../common";

export default function renderFooter(isMode) {
  const footer = isMode
    ? createDomNode(footer, "div", "footer")
    : createDomNode(footer, "div", "footer", "play");
  const githubContainer = createDomNode(
    githubContainer,
    "div",
    "github-container"
  );
  const github = createDomNode(github, "a", "github-link");
  github.href = "https://github.com/SkaymanT";
  github.innerHTML = `<img src="../assets/icons/github.svg" alt="github">`;
  const logoRShool = createDomNode(logoRShool, "div", "school-container");
  githubContainer.append(github);

  const textFooter = createDomNode(textFooter, "div", "footer-text");
  textFooter.innerHTML = "2020";

  const linkRShool = createDomNode(linkRShool, "a", "school-link");
  linkRShool.href = "https://rs.school/js/";
  linkRShool.innerHTML = `<img src="https://rs.school/images/rs_school_js.svg" alt="logoRShool">`;
  logoRShool.append(linkRShool);

  footer.append(githubContainer);
  footer.append(textFooter);
  footer.append(logoRShool);
  return footer;
}
