"""
FreeToolz Professional Favicon Generator
This script creates modern, gradient-based professional favicons
Install Pillow first: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Configuration
OUTPUT_DIR = "public"
PRIMARY_COLOR = "#2563eb"    # Blue
SECONDARY_COLOR = "#1e40af"  # Dark Blue
ACCENT_COLOR = "#60a5fa"     # Light Blue
TEXT_COLOR = "#ffffff"       # White
TEXT = "FT"                  # FreeToolz initials

# Convert hex to RGB
def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_gradient(width, height, color1, color2):
    """Create a modern gradient background"""
    base = Image.new('RGB', (width, height), color1)
    top = Image.new('RGB', (width, height), color2)
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            # Diagonal gradient
            mask_data.append(int(255 * (x + y) / (width + height)))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

# Create directory if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Favicon sizes to generate
sizes = [
    (16, 16, "favicon-16x16.png"),
    (32, 32, "favicon-32x32.png"),
    (48, 48, "favicon-48x48.png"),
    (180, 180, "apple-touch-icon.png"),
    (192, 192, "android-chrome-192x192.png"),
    (512, 512, "android-chrome-512x512.png"),
]

primary_color = hex_to_rgb(PRIMARY_COLOR)
secondary_color = hex_to_rgb(SECONDARY_COLOR)
text_color = hex_to_rgb(TEXT_COLOR)

print("🎨 Generating Professional FreeToolz Favicons...")
print("✨ Using modern gradient design with rounded corners\n")

for width, height, filename in sizes:
    # Create gradient background
    img = create_gradient(width, height, primary_color, secondary_color)
    
    # Add rounded corners for larger sizes
    if width >= 48:
        # Create rounded rectangle mask
        mask = Image.new('L', (width, height), 0)
        mask_draw = ImageDraw.Draw(mask)
        corner_radius = int(width * 0.15)  # 15% corner radius
        mask_draw.rounded_rectangle([(0, 0), (width, height)], radius=corner_radius, fill=255)
        
        # Apply mask
        output = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        output.paste(img, (0, 0))
        output.putalpha(mask)
        img = output.convert('RGB')
    
    # Add subtle shadow effect for depth (larger sizes only)
    if width >= 180:
        # Create a copy for shadow
        shadow = Image.new('RGBA', (width + 10, height + 10), (0, 0, 0, 0))
        shadow_img = Image.new('RGB', (width, height), (0, 0, 0))
        shadow.paste(shadow_img, (5, 5))
        shadow = shadow.filter(ImageFilter.GaussianBlur(5))
        
        # Composite
        final = Image.new('RGB', (width, height), (255, 255, 255))
        final.paste(shadow.crop((5, 5, width + 5, height + 5)), (0, 0))
        final.paste(img, (0, 0))
        img = final
    
    # Draw text with better positioning
    draw = ImageDraw.Draw(img)
    
    # Calculate font size (proportional to image size)
    font_size = int(min(width, height) * 0.45)
    
    try:
        # Try to use a modern system font
        font = ImageFont.truetype("arialbd.ttf", font_size)  # Arial Bold
    except:
        try:
            font = ImageFont.truetype("segoeui.ttf", font_size)  # Segoe UI
        except:
            try:
                font = ImageFont.truetype("arial.ttf", font_size)
            except:
                # Fallback to default font
                font = ImageFont.load_default()
    
    # Calculate text position (centered)
    bbox = draw.textbbox((0, 0), TEXT, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) / 2 - bbox[0]
    y = (height - text_height) / 2 - bbox[1]
    
    # Add text shadow for depth (only on larger sizes)
    if width >= 48:
        shadow_offset = max(2, int(width * 0.02))
        draw.text((x + shadow_offset, y + shadow_offset), TEXT, fill=(0, 0, 0, 80), font=font)
    
    # Draw main text
    draw.text((x, y), TEXT, fill=text_color, font=font)
    
    # Save image
    output_path = os.path.join(OUTPUT_DIR, filename)
    img.save(output_path, quality=95, optimize=True)
    print(f"✅ Created: {output_path} ({width}x{height})")

# Create favicon.ico (multi-size)
print("\n🔄 Creating multi-resolution favicon.ico...")
icon_sizes = [(16, 16), (32, 32), (48, 48)]
icons = []

for width, height in icon_sizes:
    img = create_gradient(width, height, primary_color, secondary_color)
    
    draw = ImageDraw.Draw(img)
    
    font_size = int(min(width, height) * 0.45)
    try:
        font = ImageFont.truetype("arialbd.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("arial.ttf", font_size)
        except:
            font = ImageFont.load_default()
    
    bbox = draw.textbbox((0, 0), TEXT, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (width - text_width) / 2 - bbox[0]
    y = (height - text_height) / 2 - bbox[1]
    
    draw.text((x, y), TEXT, fill=text_color, font=font)
    icons.append(img)

# Save as .ico
ico_path = os.path.join(OUTPUT_DIR, "favicon.ico")
icons[0].save(ico_path, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
print(f"✅ Created: {ico_path}\n")

print("=" * 70)
print("🎉 All professional favicons generated successfully!")
print("=" * 70)
print(f"📁 Files saved in: {OUTPUT_DIR}/")
print()
print("✨ Features:")
print("   • Modern diagonal gradient design")
print("   • Rounded corners for modern look")
print("   • Text shadows for depth")
print("   • Optimized file sizes")
print()
print("📋 Next steps:")
print("   1. ✅ Favicons are ready!")
print("   2. 🌐 Test in browser (refresh your dev server)")
print("   3. 🎨 Create social media images (og-image.jpg, twitter-image.jpg)")
print("   4. 🚀 Deploy to your server")
print()
print("💡 Tip: Refresh your browser to see the new professional favicons!")
print("=" * 70)
