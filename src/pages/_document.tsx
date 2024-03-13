import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";
import deviceDetector from "@/helpers/deviceDetector";

class MyDocument extends Document {
  static isMobile: boolean;

  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    this.isMobile = deviceDetector(
      ctx.req?.headers["user-agent"] || ""
    ).isMobile;
    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head />
        <body data-desktop={MyDocument.isMobile ? undefined : true}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
