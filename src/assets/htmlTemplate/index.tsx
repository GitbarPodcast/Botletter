import styled from 'styled-components';
import { NewsletterContent } from '../../core/entities';

const C = (): JSX.Element => {
  return <div>miao</div>;
};

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const M = (props: { data: NewsletterContent }): JSX.Element => {
  return (
    <html>
      <body>
        <Title>
          {props.data?.episode?.title} <C></C>
        </Title>
      </body>
    </html>
  );
};

export default M;
