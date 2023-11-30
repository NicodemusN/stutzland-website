def main():
    input_filename = "lyx.txt"
    output_filename = "result.html"

    # Check if result.html exists, if yes, write it empty
    try:
        with open(output_filename, 'w', encoding='utf-8') as empty_file:
            empty_file.write("")
    except FileNotFoundError:
        pass

    # Flag to indicate when to start formatting
    start_formatting = False

    with open(input_filename, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    with open(output_filename, 'a', encoding='utf-8') as output_file:
        paragraph_started = False
        for line in lines:
            # Skip lines until the first heading is encountered
            if not start_formatting:
                if len(line) > 0 and line[0].isdigit():
                    start_formatting = True
                continue

            # Check if the line is empty
            if not line.strip():
                # If a paragraph was started, end it
                if paragraph_started:
                    output_file.write("</p>\n\n")
                    paragraph_started = False
                continue

            processed_line = process_line(line)
            # If a paragraph was not started, start it
            if not paragraph_started:
                output_file.write("<p>")
                paragraph_started = True
            output_file.write(processed_line)

        # If a paragraph is open at the end, close it
        if paragraph_started:
            output_file.write("</p>\n")

    # Add a check to remove paragraph tags when there is a heading right after <p>
    with open(output_filename, 'r', encoding='utf-8') as result_file:
        result_lines = result_file.readlines()

    with open(output_filename, 'w', encoding='utf-8') as result_file:
        for i, line in enumerate(result_lines):
            # Check if the line contains both <p> and <h
            if '<p>' in line and '<h' in line:
                # Remove <p> and </p> tags
                line = line.replace('<p>', '').replace('</p>', '')

            # Check if the line is a heading and the previous line was a paragraph
            if line.startswith('<h') and i > 0 and result_lines[i - 1].strip().endswith('</p>'):
                # Add a line break before the heading
                result_file.write('\n')
            
            result_file.write(line)

def process_line(line):
    # Remove leading and trailing whitespaces
    line = line.strip()

    # Check if the line matches the heading pattern (number, space, text)
    if len(line) > 1 and line[0].isdigit() and line[1] == ' ':
        # Check if the line has § and starts with an integer/number
        if '§' in line:
            # It's a heading with §, treat it as <h3>
            return f"<h3>{line}</h3>"
        else:
            # It's a heading without §, treat it as <h2>
            return f"<h2>{line}</h2>"
    else:
        # It's a paragraph
        return f"{line}"

if __name__ == "__main__":
    main()
