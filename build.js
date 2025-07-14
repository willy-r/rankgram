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
  <title>Rankear Comentários do Instagram</title>
</head>
<body>
  <h2>Arraste o botão abaixo para sua barra de favoritos:</h2>

  <a id="bookmarklet" style="font-size:20px;padding:10px;background:#007aff;color:#fff;text-decoration:none;border-radius:6px;">
    [📊 rankgram 1.0.0]
  </a>

  <p>Depois de arrastar, vá até uma publicação do Instagram, clique no botão e aguarde o ranking ser gerado, dependendo da quantidade de comentários poderá demorar um pouco.</p>
  <p>O ranking será exibido em um arquivo HTML à parte para melhor visualização, que será baixado após a conclusão do ranqueamento.</p>

  <p><strong>Importante:</strong> Este bookmarklet só funciona em publicações do Instagram e para o funcionamento correto do mesmo será necessário estar logado na conta do Instagram.</p>

  <script>
    const bookmarkletCode = \`${code.replace(/`/g, '\\`')}\`;
    document.getElementById('bookmarklet').setAttribute('href', 'javascript:' + bookmarkletCode);
  </script>
</body>
</html>
`;

fs.writeFileSync(outputPath, html, 'utf8');
console.log('✅ index.html gerado com sucesso!');
