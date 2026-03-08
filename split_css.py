import os

css_path = 'src/styles.css'
with open(css_path, 'r') as f:
    lines = f.readlines()

pages = {
    'GetCertified': (2594, 3731),
    'Workshops': (3731, 4081),
    'About': (4081, 4371),
    'Book': (4371, 4673),
    'FreeResources': (4673, len(lines))
}

global_lines = lines[:2594]

for page, (start, end) in pages.items():
    page_lines = lines[start:end]
    with open(f'src/pages/{page}.css', 'w') as f:
        f.writelines(page_lines)
    
    # insert import into the component file
    jsx_path = f'src/pages/{page}.jsx'
    if os.path.exists(jsx_path):
        with open(jsx_path, 'r') as f:
            jsx_content = f.read()
        if f"import './{page}.css'" not in jsx_content:
            jsx_content = f"import './{page}.css';\n" + jsx_content
            with open(jsx_path, 'w') as f:
                f.write(jsx_content)

# create an empty Home.css
with open('src/pages/Home.css', 'w') as f:
    f.write('/* Home specific styles - most home styles are currently in styles.css for global reuse */\n')
# import it in Home.jsx
with open('src/pages/Home.jsx', 'r') as f:
    jsx_content = f.read()
if "import './Home.css'" not in jsx_content:
    jsx_content = f"import './Home.css';\n" + jsx_content
    with open('src/pages/Home.jsx', 'w') as f:
        f.write(jsx_content)

# save styles.css
with open(css_path, 'w') as f:
    f.writelines(global_lines)

print("Split complete")
