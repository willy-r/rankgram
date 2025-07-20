const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'rank-comments.min.js');
const outputPath = path.join(__dirname, 'index.html');

const code = fs.readFileSync(jsPath, 'utf8');

const html = `
<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <title>Rankgram - Rank Instagram Comments</title>
  <meta name="description" content="Bookmarklet to rank Instagram comments by likes.">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>Rankgram</h1>
      <p class="subtitle">Rank Instagram comments by likes</p>
      <a href="https://github.com/willy-r/rankgram" target="_blank" rel="noopener noreferrer" class="github-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Ver no GitHub
      </a>
    </header>

    <main class="main-content">
      <section class="bookmarklet-section">
        <h2>Drag the button below to your bookmarks bar:</h2>
        
        <a id="bookmarklet" class="bookmarklet-button">
          [📊 rankgram 1.0.0]
        </a>
      </section>

      <section class="instructions">
        <div class="instruction-card">
          <p>After dragging the button, go to an Instagram post, click the button, and wait for the ranking to be generated. Depending on the number of comments, it may take a while.</p>
        </div>

        <div class="instruction-card">
          <p>The ranking will be displayed in a separate TXT file for better viewing, which will be downloaded after the ranking is completed.</p>
        </div>

        <div class="instruction-card important">
          <p><strong>Important:</strong> This bookmarklet only works on Instagram posts and for it to work properly you will need to be logged into your Instagram account.</p>
        </div>
      </section>
    </main>
  </div>

  <script>
    const bookmarkletCode = \`${code.replace(/`/g, '\\`')}\`;
    document.getElementById('bookmarklet').setAttribute('href', 'javascript:' + bookmarkletCode);
  </script>
</body>
</html>
`;

fs.writeFileSync(outputPath, html, 'utf8');
console.log('✅ index.html generated successfully!');
