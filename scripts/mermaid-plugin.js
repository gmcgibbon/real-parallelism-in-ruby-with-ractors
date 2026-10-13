import mermaid from "mermaid";

const Plugin = {
  id: "mermaid",

  init: async function (reveal) {
    let { ...mermaidConfig } = reveal.getConfig().mermaid || {}

    mermaid.mermaidAPI.initialize({
      startOnLoad: false,
      ...mermaidConfig,
    })
    
    const revealElement = reveal.getRevealElement()
    const mermaidElements = revealElement.querySelectorAll(".mermaid")
    let idIterator = 0
    const id = () => idIterator += 1

    for (const element of mermaidElements) {
      const definition = element.innerHTML
        .trim()
        .replaceAll("&gt;", ">")
        .replaceAll("&lt;", "<")
        .replaceAll(/icon:([a-z]+)/g, "<i class=\"bi bi-$1\">")

      const diagramId = `mermaid-${id()}`
      const {svg: rendered} = await mermaid.render(diagramId, definition)
      const svg = namespaceMarkers(rendered, diagramId)

      const wrapper = element.parentElement
      if (wrapper.classList.contains("code-wrapper") || wrapper.tagName === "PRE") {
        wrapper.outerHTML = svg
      } else {
        element.outerHTML = svg
      }
    }
  },
};

// Sequence and timeline diagrams give their markers fixed ids like "arrowhead",
// so `url(#arrowhead)` on every slide resolves to the first marker in the
// document, which lives in a hidden slide and never paints. Prefix each
// diagram's marker ids so every SVG references its own markers.
function namespaceMarkers(svg, prefix) {
  const markerIds = Array.from(svg.matchAll(/<marker[^>]*\sid="([^"]+)"/g), (match) => match[1])

  return markerIds
    .filter((markerId) => !markerId.startsWith(prefix))
    .reduce((result, markerId) => {
      return result
        .replaceAll(`id="${markerId}"`, `id="${prefix}-${markerId}"`)
        .replaceAll(new RegExp(`#${markerId}\\b`, "g"), `#${prefix}-${markerId}`)
    }, svg)
}

export default () => Plugin
