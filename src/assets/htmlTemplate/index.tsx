const C = (): JSX.Element => {
  return <div>miao</div>;
};

const M = (props: { pippo: string }): JSX.Element => {
  return (
    <html>
      <head>
        <title>dfsdfs</title>
      </head>
      <body>
        <div>
          {props.pippo} <C></C>
        </div>
      </body>
    </html>
  );
};

export default M;
