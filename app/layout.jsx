import "@styles/globals.css";
import Nav from '@components/Nav';
import Provider from "@components/Provider";

export const metadata = {
  title: "TechTango",
  description: "Discover & Share Tech",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* Place your head elements here (e.g., meta tags, title, styles, scripts) */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add any other head elements as needed */}
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
