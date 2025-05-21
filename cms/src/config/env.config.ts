interface Config {
  blogAPIBase: string;
  tinyMCEAPI: string;
  publicUrl: string;
}

const config: Config = {
  blogAPIBase: import.meta.env.VITE_BLOG_API_BASE,
  tinyMCEAPI: import.meta.env.VITE_TINYMCE_API_KEY,
  publicUrl: import.meta.env.VITE_PUBLIC_URL,
};

export default config;
