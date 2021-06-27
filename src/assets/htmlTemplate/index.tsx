import styled from 'styled-components';
import { NewsletterContent } from '../../core/entities';

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
          TO BE IMPLEMENTED!
          {props.data?.episode?.title}
        </Title>
      </body>
    </html>
  );
};

export default M;
