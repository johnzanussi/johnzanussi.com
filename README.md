# johnzanussi.com
A place where I write about technology, 3D Printing, and other hobby projects I have going on.

[johnzanussi.com](https://johnzanussi.com)

Built with [Astro](https://astro.build/). Hosted on [Vercel](https://vercel.com/).

## Table of Contents
 * [Project Structure](#-project-structure)
 * [Commands](#-commands)
 * [Built With](#-built-with)
    * [Libraries](#-libraries)
    * [Services](#-services)
 * [Writing Content](#-writing-content)
    * [Content Frontmatter](#-content-frontmatter)
        * [Pages](#-pages)
        * [Posts](#-posts)
    * [MDX Components](#-mdx-components)
    * [Image Shortcut](#-image-shortcut)

## 🚀 Project Structure

```text
/
├── public/
├── src/
└── assets/
│       └── image.png
└── components/
│       └── Component.astro
└── content/
│       └── pages
│       |      └── page-title
│       |             └── index.mdx
│       |             └── image.jpg
│       └── posts
│              └── post-slug
│                     └── index.mdx
│                     └── image.jpg
└── layouts/
│       └── Layout.astro
└── pages/
│       └── posts
│              └── [slug].astro
│       └── index.astro
│       └── [page].astro
└── scripts/
│       └── script.ts
└── styles/
│       └── index.css
└── utils/
│       └── util.ts
└── package.json
```

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run check`           | Shortcut for `astro check`                       |
| `npm run update`          | Shortcut for `npx npm-check-updates`             |
| `npm run ts`              | Shortcut for `tsc --noEmit`                      |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚧 Built With
Read more about why I chose these libraries and services on the [Built With](https://johnzanussi.com/built-with) page.

### 📚 Libraries

 * [Astro](https://astro.build/)
 * [Tailwind](https://tailwindcss.com/)
 * [Tabler Icons](https://tabler.io/icons)

### 🛠️ Services

 * [Vercel](https://vercel.com/)
 * [FastComments](https://fastcomments.com/)
 * [Plausible](https://plausible.io/)


## 📝 Writing Content
 1. Create a new directory in either `src/content/pages` or `src/content/posts`. The directory name will be used for the generated URL of the content.
 2. Create an `index.mdx` file within the directory. This is where the page or post content lives.
 3. Add any images or other files specific to that content within the directory.

### 🎛️ Content Frontmatter

#### 📄 Pages
| Property | Type | Required | Notes |
| :--  | :-- | :-- | :-- |
| `title` | `String` | Yes | |
| `excerpt` | `String` | No | | Used on [/pages](https://johnzanussi.com/pages) and in meta tags description. |
| `cover` | `ImageMetaData` | Yes | Image should be 16x9 ratio  |

#### 🗒️ Posts
| Property | Type | Required | Notes |
| :--  | :-- | :-- | :-- |
| `title` | `String` | Yes | |
| `excerpt` | `String` | No  | Used on [/posts](https://johnzanussi.com/posts) and in meta tags description. |
| `cover` | `ImageMetaData` | Yes | Image should be 16x9 ratio  |
| `date`  | `String` | Yes | Value is passed to `new Date()` |
| `hasAmazonLinks` | `Boolean` | No | Default `false`. If `true` the [`<AmazonDisclosure>`](https://github.com/johnzanussi/johnzanussi.com/blob/main/src/components/AmazonDisclosure.astro) component will be rendered at the bottom of the post. |
| `hiddenIntro` | `Boolean` | No | Default `false`. If `true` and the post contains `## Intro` the resulting heading will be removed from the rendered page but the `Intro` link will remain in the table of contents. |

### 🧩 MDX Components
The following components are made available in all `.mdx` files without the need to explicitly import.

* [`<Aside>`](https://github.com/johnzanussi/johnzanussi.com/blob/main/src/components/Aside.astro)
* [`<Math>`](https://github.com/johnzanussi/johnzanussi.com/blob/main/src/components/Markdown/Math.astro)
* [`<Wire>`](https://github.com/johnzanussi/johnzanussi.com/blob/main/src/components/Markdown/Wire.astro)
* [`<Columns>`](https://github.com/johnzanussi/johnzanussi.com/blob/main/src/components/Markdown/Columns.astro)
* [`<Grid>`](https://github.com/johnzanussi/johnzanussi.com/blob/main/src/components/Grid.Markdown/astro)
* [`<WorkHistory>`](https://github.com/johnzanussi/johnzanussi.com/blob/main/src/components/WorkHistory.astro)
* [`<YouTubeEmbed>`](https://github.com/johnzanussi/johnzanussi.com/blob/main/src/components/YouTubeEmbed.astro)

### ⤴️ Image Shortcut

When writing post content in any `src/posts/[post-slug]/index.mdx` file you can type `img` followed by a `tab` to auto-create the following code.

```markdown
img ➡️
```

```markdown
![](@/content/posts/post-slug/)
```

This behavior lives in `.vscode/MDX Image Paths.code-snippets`.
