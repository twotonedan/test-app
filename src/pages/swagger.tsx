import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import ErrorComponent from 'next/error';
import 'swagger-ui-react/swagger-ui.css';

const isProd = (process.env.PUBLIC_VERCEL_ENV || process.env.PUBLIC_NODE_ENV) === 'production';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (isProd) return <ErrorComponent statusCode={404} />;
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/pages/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Stellar API docs',
        version: '1.0',
      },
    },
  });

  return {
    notFound: isProd,
    props: {
      spec,
    },
  };
};

export default ApiDoc;
