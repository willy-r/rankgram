const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'rank-comments.min.js');
const outputPath = path.join(__dirname, 'index.html');

const code = fs.readFileSync(jsPath, 'utf8');

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Rank Instagram Comments</title>
  <link rel="stylesheet" href="style.min.css">
</head>
<body>
  <h2>Drag the button below to your bookmarks bar:</h2>

  <a id="bookmarklet" style="font-size:20px;padding:10px;background:#007aff;color:#fff;text-decoration:none;border-radius:6px;">
    [📊 rankgram 1.0.0]
  </a>

  <p>After dragging, go to an Instagram post, click the button and wait for the ranking to be generated, depending on the number of comments it may take a while.</p>
  <p>The ranking will be displayed in a separate HTML file for better viewing, which will be downloaded after the ranking is completed.</p>

  <p><strong>Important:</strong> This bookmarklet only works on Instagram posts and for it to work correctly you will need to be logged into your Instagram account.</p>

  <script>
    const bookmarkletCode = \`${code.replace(/`/g, '\\`')}\`;
    document.getElementById('bookmarklet').setAttribute('href', 'javascript:' + bookmarkletCode);
  </script>
</body>
</html>
`;

fs.writeFileSync(outputPath, html, 'utf8');
console.log('✅ index.html generated successfully!');
