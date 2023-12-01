import re

def add_ids_and_convert_symbols(html_content):
    # Convert "§" symbols to "&#167;"
    html_content = html_content.replace("§", "&#167;")

    # Add enumerated ids to <h1> headings
    h1_pattern = re.compile(r'<h1>', re.IGNORECASE)
    h1_count = 0

    def replace_h1(match):
        nonlocal h1_count
        h1_count += 1
        return f'<h1 id="sec{h1_count}">'

    html_content = h1_pattern.sub(replace_h1, html_content)

    return html_content

def main():
    with open("result.html", "r", encoding="utf-8") as file:
        html_content = file.read()

    processed_content = add_ids_and_convert_symbols(html_content)

    with open("result.html", "w", encoding="utf-8") as file:
        file.write(processed_content)

if __name__ == "__main__":
    main()
