echo "Minifying rank-comments.js"
uglifyjs rank-comments.js -o rank-comments.min.js --compress --mangle

echo "Minifying style.css"
uglifyjs style.css -o style.min.css --compress --mangle

echo "Building index.html"
node build.js
