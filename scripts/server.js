import browserSync from "browser-sync";

browserSync({ server: true, files: ["index.html", "styles/theme.css", "scripts/*.js", "gvl_visualization.html", "favicon.svg"]});
