export default function GAnalytics() {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-74950564-6"></script>
      <script defer>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag(\`js\`, new Date());
          gtag(\`config\`, \`UA-74950564-6\`);
        `}
      </script>
    </>
  )
}