const siteConfiguration = {
  title: "OptimizeX",
  description:
    "Effortlessly bulk-generate optimized versions of your images with our free and open-source tool.",
  openGraph: {
    title: "OptimizeX",
    description: "Effortlessly bulk-generate optimized versions of your images with our free and open-source tool.",
    images:
      "https://media-bucket-project.s3.ap-south-1.amazonaws.com/og-render.png",
    url: "https://optimizex.vercel.app/",
    type: "website",
    siteName: "OptimizeX",
  },
  items: [],
  links: {
    github: "https://github.com/BharathxD/OptimizeX-Client",
    linkedin: "https://www.linkedin.com/in/bharath-bandi/",
  },
  project: {
    github: "https://github.com/BharathxD/ConvertX-Client",
  },
} as const;

const siteMessages = {
  heading: {
    withFiles: "Alright, one last step.",
    withoutFiles: "Drop your image(s) below.",
    afterUploading: "Finished Uploading.",
  },
  body: {
    withFiles:
      "Finalize and curate your pictures with the option to selectively choose or remove them.",
    withoutFiles:
      "Effortlessly process multiple images by simply dropping them or clicking in the designated area below.",
    afterUploading:
      "Instantly access your optimized pictures after processing.",
  },
};

export { siteConfiguration, siteMessages };