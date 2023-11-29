#!/bin/bash

echo "[" > pages.json

for file in *.html; do
  title=$(basename "$file" .html)
  url="$file"

  echo "  {\"title\": \"$title\", \"url\": \"$url\"}," >> pages.json
done

echo "]" >> pages.json
