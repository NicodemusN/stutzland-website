#!/bin/bash

# Find all HTML files in the laws directory
files=$(find laws -type f -name "*.html")

# Create an array of JSON objects
json_array="["
for file in $files; do
  title=$(grep -oP '<title>\K(.*)(?=<\/title>)' "$file" | head -n 1)
  json_array+="{\"title\": \"$title\", \"url\": \"$file\"},"
done

# Remove the trailing comma and close the array
json_array="${json_array%,}]"

# Write the formatted JSON to pages.json
echo "$json_array" | jq '.' > pages.json
