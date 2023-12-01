import os
import re

def clear_file(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'w', encoding='utf-8'):
            pass

def convert_to_html(input_file, output_file):
    # Clear the existing HTML file or create a new one
    clear_file(output_file)

    with open(input_file, 'r', encoding='utf-8') as infile:
        lines = infile.readlines()

    paragraphs = []
    current_paragraph = ""

    for line in lines:
        line = line.strip()
        if line:  # Ignore empty lines
            current_paragraph += line + ' '
        elif current_paragraph:
            paragraphs.append(current_paragraph.strip())
            current_paragraph = ""

    # Add the last paragraph
    if current_paragraph:
        paragraphs.append(current_paragraph.strip())

    with open(output_file, 'a', encoding='utf-8') as outfile:
        for paragraph in paragraphs:
            if re.match(r'^\d+ §', paragraph):
                # Lines starting with an integer or two integers and containing '§'
                outfile.write('\n' + f'<h3>{paragraph}</h3>\n')
            elif re.match(r'^\d+', paragraph):
                # Lines starting with an integer or two integers
                outfile.write('\n' + f'<h2>{paragraph}</h2>\n')
            else:
                # All other paragraphs
                outfile.write('\n' + f'<p>{paragraph}</p>\n')

    # Post-process: Replace "§" with "&sect;" and "•" with "&bull;"
    with open(output_file, 'r', encoding='utf-8') as infile:
        content = infile.read()

    with open(output_file, 'w', encoding='utf-8') as outfile:
        content = content.replace('§', '&sect;').replace('•', '&bull;')
        outfile.write(content)

if __name__ == "__main__":
    convert_to_html("lyx.txt", "result.html")
