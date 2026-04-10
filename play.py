#!/usr/bin/env python3
"""Play and export braille animations from .braille-project JSON files."""

import json
import sys
import time
import argparse

DOT_BITS = [
    [0x01, 0x08],
    [0x02, 0x10],
    [0x04, 0x20],
    [0x40, 0x80],
]

def grid_to_braille(grid, cell_cols, cell_rows):
    lines = []
    for cr in range(cell_rows):
        line = ''
        for cc in range(cell_cols):
            mask = 0
            for r in range(4):
                for c in range(2):
                    gr = cr * 4 + r
                    gc = cc * 2 + c
                    if gr < len(grid) and gc < len(grid[0]) and grid[gr][gc]:
                        mask |= DOT_BITS[r][c]
            line += chr(0x2800 + mask)
        lines.append(line)
    return lines

def load_project(path):
    with open(path) as f:
        data = json.load(f)
    return data

def play_terminal(data):
    frames = data['frames']
    cell_cols = data.get('cellCols', 2)
    cell_rows = data.get('cellRows', 1)
    fps = data.get('fps', 4)
    loop = data.get('loop', True)
    delay = 1.0 / fps

    # Hide cursor
    sys.stdout.write('\033[?25l')
    sys.stdout.flush()

    try:
        while True:
            for i, frame in enumerate(frames):
                # Move cursor to top of animation area
                lines = grid_to_braille(frame, cell_cols, cell_rows)
                output = '\r' + '\n'.join(lines)
                sys.stdout.write(output)
                sys.stdout.flush()
                time.sleep(delay)
                # Move cursor back up
                if cell_rows > 1:
                    sys.stdout.write(f'\033[{cell_rows - 1}A')
            if not loop:
                break
    except KeyboardInterrupt:
        pass
    finally:
        # Show cursor, newline
        sys.stdout.write('\033[?25h\n')
        sys.stdout.flush()

def export_gif(data, output_path, scale=20):
    try:
        from PIL import Image
    except ImportError:
        print("Install Pillow first: pip install Pillow")
        sys.exit(1)

    frames = data['frames']
    cell_cols = data.get('cellCols', 2)
    cell_rows = data.get('cellRows', 1)
    fps = data.get('fps', 4)
    loop = data.get('loop', True)

    pixel_rows = cell_rows * 4
    pixel_cols = cell_cols * 2

    images = []
    for frame in frames:
        img = Image.new('1', (pixel_cols * scale, pixel_rows * scale), 0)
        for r in range(pixel_rows):
            for c in range(pixel_cols):
                if r < len(frame) and c < len(frame[0]) and frame[r][c]:
                    for dy in range(scale):
                        for dx in range(scale):
                            img.putpixel((c * scale + dx, r * scale + dy), 1)
        images.append(img)

    duration = int(1000 / fps)
    images[0].save(
        output_path,
        save_all=True,
        append_images=images[1:],
        duration=duration,
        loop=0 if loop else 1,
    )
    print(f"Saved GIF to {output_path}")

def print_braille_frames(data):
    """Print all frames as braille text, suitable for copy/paste into chat."""
    frames = data['frames']
    cell_cols = data.get('cellCols', 2)
    cell_rows = data.get('cellRows', 1)

    for i, frame in enumerate(frames):
        lines = grid_to_braille(frame, cell_cols, cell_rows)
        print(' '.join(lines), end='  ')
    print()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Play/export braille animations')
    parser.add_argument('file', help='Path to .braille-project JSON file')
    parser.add_argument('--gif', metavar='OUTPUT', help='Export as GIF to this path')
    parser.add_argument('--scale', type=int, default=20, help='Pixel scale for GIF (default: 20)')
    parser.add_argument('--print', action='store_true', dest='print_frames', help='Print all frames as braille text')

    args = parser.parse_args()
    data = load_project(args.file)

    if args.gif:
        export_gif(data, args.gif, args.scale)
    elif args.print_frames:
        print_braille_frames(data)
    else:
        play_terminal(data)
