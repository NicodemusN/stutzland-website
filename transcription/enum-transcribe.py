import re

def add_ids_and_convert_symbols(html_content):
    # Convert "§" symbols to "&#167;"
    html_content = html_content.replace("§", "&#167;")

    # Add enumerated ids to <h2> headings
    h2_pattern = re.compile(r'<h2>', re.IGNORECASE)
    h2_count = 0

    def replace_h2(match):
        nonlocal h2_count
        h2_count += 1
        return f'<h2 id="sec{h2_count}">'

    html_content = h2_pattern.sub(replace_h2, html_content)

    return html_content

def main():
    with open("result.html", "r", encoding="utf-8") as file:
        html_content = file.read()

    processed_content = add_ids_and_convert_symbols(html_content)

    with open("result.html", "w", encoding="utf-8") as file:
        file.write(processed_content)

if __name__ == "__main__":
    main()
